import fs from "fs/promises";
import https from "https";
import jsYaml from "js-yaml";
import path from "path";
import {
  ExtensionMapJSON,
  LanguageData,
  LanguagesJSON,
  FileNamesMapJSON,
} from "../src/json-types";

const URL_SOURCE =
  "https://raw.githubusercontent.com/github-linguist/linguist/refs/heads/main/lib/linguist/languages.yml";

const LANGUAGES_TARGET = path.join(
  process.cwd(),
  "src",
  "data",
  "languages.json"
);
const EXTENSION_MAP_TARGET = path.join(
  process.cwd(),
  "src",
  "data",
  "extension-map.json"
);
const FILE_NAMES_TARGET = path.join(
  process.cwd(),
  "src",
  "data",
  "file-names-map.json"
);

function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download file. Status Code: ${response.statusCode}`
            )
          );
          return;
        }

        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function yamlToJson(yaml: string): any {
  try {
    return jsYaml.load(yaml);
  } catch (error) {
    console.error("Error parsing YAML:", error);
    return null;
  }
}

function createExtensionMap(languages: LanguagesJSON): ExtensionMapJSON {
  const extensionMap: Record<string, { name: string; index: number }> = {};

  for (const [languageName, data] of Object.entries(languages)) {
    if (data.extensions) {
      for (const [index, ext] of data.extensions.entries()) {
        const cleanExt = ext.toLowerCase().replace(/^\./, "");
        if (
          !extensionMap.hasOwnProperty(cleanExt) ||
          index < extensionMap[cleanExt].index
        ) {
          extensionMap[cleanExt] = { name: languageName, index };
        }
      }
    }
  }

  // Convert the extensionMap to only include the language name
  return Object.fromEntries(
    Object.entries(extensionMap).map(([ext, { name }]) => [ext, name])
  );
}

function createFileNamesMap(languages: LanguagesJSON): FileNamesMapJSON {
  const fileNamesMap: FileNamesMapJSON = {};

  for (const [languageName, data] of Object.entries(languages)) {
    if (data.filenames) {
      for (const fileName of data.filenames) {
        fileNamesMap[fileName] = languageName;
      }
    }
  }

  return fileNamesMap;
}

export default async function extractLinguist() {
  try {
    const yamlData = await downloadFile(URL_SOURCE);
    const jsonData = yamlToJson(yamlData) as Record<
      string,
      Record<string, unknown>
    >;
    if (jsonData) {
      const transformedData: Record<string, LanguageData> = {};

      // Transform the data and add the 'name' field
      for (const [languageName, languageData] of Object.entries(jsonData)) {
        transformedData[languageName] = {
          ...(languageData as LanguageData),
          name: languageName,
        };
      }

      // Create the extension map
      const extensionMap = createExtensionMap(transformedData);

      // Create the file names map
      const fileNamesMap = createFileNamesMap(transformedData);

      // Save the language data as JSON
      await fs.writeFile(
        LANGUAGES_TARGET,
        JSON.stringify(transformedData, null, 2)
      );
      console.log(`Language data saved to ${LANGUAGES_TARGET}`);

      // Save the extension map as JSON
      await fs.writeFile(
        EXTENSION_MAP_TARGET,
        JSON.stringify(extensionMap, null, 2)
      );
      console.log(`Extension map saved to ${EXTENSION_MAP_TARGET}`);

      // Save the file names map as JSON
      await fs.writeFile(
        FILE_NAMES_TARGET,
        JSON.stringify(fileNamesMap, null, 2)
      );
      console.log(`File names map saved to ${FILE_NAMES_TARGET}`);
    }
  } catch (error) {
    console.error("Error downloading or transforming file:", error);
  }
}
