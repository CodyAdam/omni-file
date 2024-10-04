import {
  getBaseFilenameFromRelativePath,
  getExtensionsFromRelativePath,
} from "./utils/filePath";
import iconsRaw from "./data/icons.json";
import iconsLightRaw from "./data/icons-light.json";
import { IconsJSON } from "./json-types";
import { getLanguage } from "./languages";

const icons = iconsRaw as IconsJSON;
const iconsLight = iconsLightRaw as IconsJSON;

/**
 * Retrieves the icon name associated with a given file path.
 *
 * This function takes a file path as input and returns a string
 * representing the icon name for that file or folder.
 *
 * @param filePath - The path of the file or folder for which to retrieve the icon.
 * @param isFolder - A boolean indicating whether the path represents a folder.
 * @returns A string representing the icon name for the given file path or folder.
 */
export function getIcon(
  filePath: string,
  opts?: { isFolder?: boolean; isLight?: boolean; isExpanded?: boolean }
): string {
  const fileName = getBaseFilenameFromRelativePath(filePath);
  const fileNameLower = fileName.toLowerCase();
  const { isFolder, isLight, isExpanded } = opts || {};
  const iconsThemed = isLight ? iconsLight : icons;

  // 1. filename match
  if (!isFolder && iconsThemed.fileNames[fileNameLower]) {
    return iconsThemed.fileNames[fileNameLower];
  }

  // 2. folder name match
  if (isFolder && !isExpanded && iconsThemed.folderNames[fileNameLower]) {
    return iconsThemed.folderNames[fileNameLower];
  }

  // 3. expanded folder name match
  if (isFolder && isExpanded && iconsThemed.folderNamesExpanded[fileNameLower]) {
    return iconsThemed.folderNamesExpanded[fileNameLower];
  }

  // 4. extension match
  const extensions = getExtensionsFromRelativePath(fileNameLower);
  for (const extension of extensions) {
    if (iconsThemed.fileExtensions[extension]) {
      return iconsThemed.fileExtensions[extension];
    }
  }

  // 5. try with dark theme
  if (isLight) {
    const icon = getIcon(filePath, { isFolder, isLight: false, isExpanded });
    if (icon !== iconsThemed.folder && icon !== iconsThemed.file) {
      return icon;
    }
  }

  // 6. language icon match (only if it's a file)
  if (!isFolder) {
    const language = getLanguage(filePath);
    if (language?.icons && language.icons.length > 0) {
      return language.icons[0];
    }
  }

  // 7. fallback to default folder icon
  if (isFolder) {
    return iconsThemed.folder;
  }

  // 6. fallback to default to file icon
  return iconsThemed.file;
}
