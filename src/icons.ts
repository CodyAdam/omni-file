import {
  getBaseFilenameFromRelativePath,
  getExtensionsFromRelativePath,
} from "./utils/filePath";
import iconsRaw from "./data/icons.json";
import iconsLightRaw from "./data/icons-light.json";
import { IconsJSON } from "./json-types";
import { getLanguage } from "./languages";

/**
 * The default icon set for dark themes.
 * This constant contains all the icon definitions for files, folders, and languages.
 */
export const icons = iconsRaw as IconsJSON;

/**
 * The icon set for light themes.
 * This constant contains all the icon definitions for files, folders, and languages optimized for light backgrounds.
 */
export const iconsLight = iconsLightRaw as IconsJSON;


/**
 * Retrieves a list of all icon names based on the provided options.
 *
 * @param opts - Optional configuration object
 * @param opts.isLight - If true, use light theme icons
 * @param opts.isExpanded - If true, include expanded folder icons
 * @param opts.isFolder - If true, include folder-related icons
 * @returns An array of unique icon names
 */
export function getIconList(opts?: {
  isLight?: boolean;
  isExpanded?: boolean;
  isFolder?: boolean;
}) {
  if (!opts) {
    const all = new Set<string>([
      icons.file,
      iconsLight.file,
      icons.folder,
      iconsLight.folder,
      icons.folderExpanded,
      iconsLight.folderExpanded,
      ...Object.values(icons.fileNames),
      ...Object.values(iconsLight.fileNames),
      ...Object.values(icons.fileExtensions),
      ...Object.values(iconsLight.fileExtensions),
      ...Object.values(icons.folderNames),
      ...Object.values(iconsLight.folderNames),
      ...Object.values(icons.folderNamesExpanded),
      ...Object.values(iconsLight.folderNamesExpanded),
      ...Object.values(icons.languageIds),
      ...Object.values(iconsLight.languageIds),
    ]);
    return Array.from(all);
  }

  const all = new Set<string>([
    ...(opts.isLight ? [iconsLight.file] : [icons.file]),
    ...(opts.isFolder
      ? [
          ...(opts.isLight ? [iconsLight.folder] : [icons.folder]),
          ...(opts.isExpanded
            ? opts.isLight
              ? [iconsLight.folderExpanded]
              : [icons.folderExpanded]
            : []),
        ]
      : []),
    ...Object.values(opts.isLight ? iconsLight.fileNames : icons.fileNames),
    ...Object.values(opts.isLight ? iconsLight.fileExtensions : icons.fileExtensions),
    ...(opts.isFolder
      ? [
          ...Object.values(opts.isLight ? iconsLight.folderNames : icons.folderNames),
          ...(opts.isExpanded
            ? Object.values(opts.isLight ? iconsLight.folderNamesExpanded : icons.folderNamesExpanded)
            : []),
        ]
      : []),
    ...Object.values(opts.isLight ? iconsLight.languageIds : icons.languageIds),
  ]);
  return Array.from(all);
}

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
  if (
    isFolder &&
    isExpanded &&
    iconsThemed.folderNamesExpanded[fileNameLower]
  ) {
    return iconsThemed.folderNamesExpanded[fileNameLower];
  }

  // 4. extension match
  const extensions = getExtensionsFromRelativePath(fileNameLower);
  for (const extension of extensions) {
    if (iconsThemed.fileExtensions[extension]) {
      return iconsThemed.fileExtensions[extension];
    }
    // fallback to dark theme if light theme is requested and not available
    if (isLight) {
      if (icons.fileExtensions[extension]) {
        return icons.fileExtensions[extension];
      }
    }
  }

  // 5. try with dark theme
  if (isLight) {
    const icon = getIcon(filePath, { isFolder, isLight: false, isExpanded });
    if (icon !== iconsThemed.folder && icon !== iconsThemed.file && icon !== iconsThemed.folderExpanded) {
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
    return isExpanded ? iconsThemed.folderExpanded : iconsThemed.folder;
  }

  // 6. fallback to default to file icon
  return iconsThemed.file;
}
