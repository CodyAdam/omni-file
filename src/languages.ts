import extensionMapRaw from "./data/extension-map.json";
import fileNamesMapRaw from "./data/file-names-map.json";
import languagesRaw from "./data/languages-with-icons.json";
import {
  ExtensionMapJSON,
  FileNamesMapJSON,
  LanguageData,
  LanguagesWithIconsJSON,
} from "./json-types";
import { getBaseFilenameFromRelativePath, getExtensionsFromRelativePath } from "./utils/filePath";

export const languages = languagesRaw as LanguagesWithIconsJSON;
export const extensionMap = extensionMapRaw as ExtensionMapJSON;
export const fileNamesMap = fileNamesMapRaw as FileNamesMapJSON;

/**
 * Retrieves the language data associated with a given filename.
 *
 * This function first attempts to match the filename directly against known filenames
 * in the language data. If no match is found, it falls back to matching by file extension,
 * trying longer extensions before shorter ones.
 *
 * @param filename - The name of the file to look up (can be a relative path).
 * @returns The LanguageData object if a match is found, undefined otherwise.
 */
export function getLanguage(filePath: string): LanguageData | undefined {
  const fileName = getBaseFilenameFromRelativePath(filePath);

  // 1. find by filename
  const languageByFilename = fileNamesMap[fileName];
  if (languageByFilename) {
    return languages[languageByFilename];
  }

  // 2. find by extension
  const extensions = getExtensionsFromRelativePath(filePath);
  for (const extension of extensions) {
    const languageByExtension = extensionMap[extension.toLowerCase()];
    if (languageByExtension) {
      return languages[languageByExtension];
    }
  }

  return undefined;
}
