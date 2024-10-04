/**
 * Extracts the base filename from a relative path.
 * 
 * This function takes a relative file path and returns only the filename
 * without any preceding directory structure. It handles various edge cases
 * such as empty strings, paths with no separators, and paths with trailing separators.
 *
 * @param filePath - The relative file path to process.
 * @returns The base filename extracted from the path, or an empty string if the input is invalid.
 */
export function getBaseFilenameFromRelativePath(filePath: string): string {
  if (!filePath) return '';
  
  // Normalize the path separator to forward slash
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  
  // Remove trailing slashes
  const trimmedFilePath = normalizedFilePath.replace(/\/+$/, '');
  
  const parts = trimmedFilePath.split('/');
  return parts[parts.length - 1] || '';
}


/**
 * Extracts all possible extensions from a relative file path.
 * 
 * This function takes a relative file path and returns an array of all possible
 * extensions, starting from the longest to the shortest. It considers everything
 * after the first dot in the filename as part of the extension.
 *
 * @param filePath - The relative file path to process.
 * @returns An array of strings representing all possible extensions, or an empty array if there are no extensions.
 *
 * @example
 * getExtensionsFromRelativePath("folder/file.conf.d.ts")
 * // returns ["conf.d.ts", "d.ts", "ts"]
 */
export function getExtensionsFromRelativePath(filePath: string): string[] {
  const baseFilename = getBaseFilenameFromRelativePath(filePath);
  const dotIndex = baseFilename.indexOf('.');
  
  if (dotIndex === -1) {
    return [];
  }

  const fullExtension = baseFilename.slice(dotIndex + 1);
  const parts = fullExtension.split('.');
  
  return parts.reduce((extensions, _, index) => {
    extensions.push(parts.slice(index).join('.'));
    return extensions;
  }, [] as string[]);
}