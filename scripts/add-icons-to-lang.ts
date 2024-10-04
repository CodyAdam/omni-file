import fs from "fs/promises";
import path from "path";
import {
  IconsJSON,
  LanguagesJSON,
  LanguagesWithIconsJSON,
} from "../src/json-types";

/**
 * Load the previously saved icons json and language data json,
 * then add the icon names to the language data
 */
export default async function addIconsToLang() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const iconsPath = path.join(dataDir, "icons.json");
  const languagesPath = path.join(dataDir, "languages.json");
  const outputPath = path.join(dataDir, "languages-with-icons.json");

  try {
    // Load icons data
    const iconsData: IconsJSON = JSON.parse(
      await fs.readFile(iconsPath, "utf-8")
    );

    // Load languages data
    const languagesData: LanguagesJSON = JSON.parse(
      await fs.readFile(languagesPath, "utf-8")
    );

    // Add icons to languages
    const newLanguagesData: LanguagesWithIconsJSON = {};

    for (const [langName, lang] of Object.entries(languagesData)) {
      const icons: string[] = [];

      // Helper function to add unique icons
      const addUniqueIcon = (icon: string | undefined) => {
        if (icon && !icons.includes(icon)) {
          icons.push(icon);
        }
      };

      // 1. find corresponding icon from lang name
      addUniqueIcon(iconsData.languageIds[lang.name.toLowerCase()]);

      // 2. find corresponding icon from lang filenames
      if (lang.filenames) {
        for (const filename of lang.filenames) {
          addUniqueIcon(iconsData.fileNames[filename]);
          addUniqueIcon(iconsData.folderNames[filename]);
        }
      }
      
      // 3. find corresponding icon from lang extensions
      if (lang.extensions) {
        for (const extension of lang.extensions) {
          const withoutDot = extension.slice(1);
          addUniqueIcon(iconsData.fileExtensions[withoutDot]);
        }
      }

      // 4. find corresponding icon from lang ace_mode
      addUniqueIcon(iconsData.languageIds[lang.ace_mode]);

      // 5. find corresponding icon from lang aliases (alias of the ace_mode)
      if (lang.aliases) {
        for (const alias of lang.aliases) {
          addUniqueIcon(iconsData.languageIds[alias]);
        }
      }

      // 6. find corresponding icon from lang codemirror_mode
      if (lang.codemirror_mode) {
        addUniqueIcon(iconsData.languageIds[lang.codemirror_mode]);
      }

      // 7. find corresponding icon from lang name as extension
      addUniqueIcon(iconsData.fileExtensions[lang.name.toLowerCase()]);

      newLanguagesData[langName] = {
        ...lang,
        icons: icons.length > 0 ? icons : undefined,
      };
    }

    // Save the updated language data
    await fs.writeFile(outputPath, JSON.stringify(newLanguagesData, null, 2));
    console.log(`Languages data with icons saved to ${outputPath}`);
  } catch (error) {
    console.error("Error processing language and icon data:", error);
  }
}
