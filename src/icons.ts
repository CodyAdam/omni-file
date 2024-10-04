import { getBaseFilenameFromRelativePath } from "./utils/filePath";
import iconsRaw from "./data/icons.json";
import iconsLightRaw from "./data/icons-light.json";


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
export function getIcon(filePath: string, isFolder = false): string {
  const fileName = getBaseFilenameFromRelativePath(filePath);
  if (isFolder) {
    return "folder";
  }
  return "file";
}
