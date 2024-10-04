import { expect, describe, it } from 'vitest';
import { getBaseFilenameFromRelativePath, getExtensionsFromRelativePath } from './filePath';

describe('getBaseFilenameFromRelativePath', () => {
  it('should return empty string for empty input', () => {
    expect(getBaseFilenameFromRelativePath('')).toBe('');
  });

  it('should return the filename for a simple path', () => {
    expect(getBaseFilenameFromRelativePath('folder/file.txt')).toBe('file.txt');
  });

  it('should handle paths with multiple separators', () => {
    expect(getBaseFilenameFromRelativePath('folder1/folder2/file.txt')).toBe('file.txt');
  });

  it('should handle paths with trailing separators', () => {
    expect(getBaseFilenameFromRelativePath('folder/file.txt/')).toBe('file.txt');
  });

  it('should handle paths with no separators', () => {
    expect(getBaseFilenameFromRelativePath('file.txt')).toBe('file.txt');
  });

  it('should handle paths with backslashes', () => {
    expect(getBaseFilenameFromRelativePath('folder\\file.txt')).toBe('file.txt');
  });

  it('should preserve case in filenames', () => {
    expect(getBaseFilenameFromRelativePath('folder/FileName.TXT')).toBe('FileName.TXT');
  });

  it('should handle mixed case in path separators', () => {
    expect(getBaseFilenameFromRelativePath('Folder/SubFolder\\FileName.txt')).toBe('FileName.txt');
  });
});

describe('getExtensionsFromRelativePath', () => {
  it('should return an empty array for files without extensions', () => {
    expect(getExtensionsFromRelativePath('folder/file')).toEqual([]);
  });

  it('should return a single extension for simple filenames', () => {
    expect(getExtensionsFromRelativePath('folder/file.txt')).toEqual(['txt']);
  });

  it('should return multiple extensions for complex filenames', () => {
    expect(getExtensionsFromRelativePath('folder/file.conf.d.ts')).toEqual(['conf.d.ts', 'd.ts', 'ts']);
  });

  it('should handle filenames with leading dots', () => {
    expect(getExtensionsFromRelativePath('folder/.gitignore')).toEqual(['gitignore']);
  });

  it('should handle filenames with multiple dots', () => {
    expect(getExtensionsFromRelativePath('folder/file.min.js.map')).toEqual(['min.js.map', 'js.map', 'map']);
  });

  it('should return an empty array for empty input', () => {
    expect(getExtensionsFromRelativePath('')).toEqual([]);
  });

  it('should preserve case in extensions', () => {
    expect(getExtensionsFromRelativePath('folder/file.TXT')).toEqual(['TXT']);
  });

  it('should handle mixed case in complex extensions', () => {
    expect(getExtensionsFromRelativePath('folder/file.Conf.D.Ts')).toEqual(['Conf.D.Ts', 'D.Ts', 'Ts']);
  });

  it('should be case-sensitive for extensions', () => {
    const lowerCase = getExtensionsFromRelativePath('folder/file.js');
    const upperCase = getExtensionsFromRelativePath('folder/file.JS');
    expect(lowerCase).not.toEqual(upperCase);
    expect(lowerCase).toEqual(['js']);
    expect(upperCase).toEqual(['JS']);
  });

  it('should handle filenames with mixed case and multiple dots', () => {
    expect(getExtensionsFromRelativePath('folder/File.Min.Js.Map')).toEqual(['Min.Js.Map', 'Js.Map', 'Map']);
  });
});
