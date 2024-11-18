import { describe, it, expect, vi, test } from 'vitest';
import { getIcon, getIconList } from './icons';
import path from 'path';
import * as languages from './languages';
import fs from 'fs';

vi.mock('./languages');

describe('getIconList', () => {
  test.each(getIconList())('icon %s should exist', (iconName) => {
    const publicIconsPath = path.join(__dirname, '..', 'public', 'icons');
    const iconPath = path.join(publicIconsPath, `${iconName}.svg`);
    expect(fs.existsSync(iconPath), `Icon file not found: ${iconPath}`).toBe(true);
  });
});

describe('getIcon', () => {
  it('should return file name icon match', () => {
    expect(getIcon('package.json')).toBe('nodejs');
  });

  it('should return folder name icon match', () => {
    expect(getIcon('node_modules', { isFolder: true })).toBe('folder-node');
  });

  it('should return expanded folder name icon match', () => {
    expect(getIcon('node_modules', { isFolder: true, isExpanded: true })).toBe('folder-node-open');
  });

  it('should return file extension icon match', () => {
    expect(getIcon('example.js')).toBe('javascript');
  });

  it('should return light theme icon match', () => {
    expect(getIcon('vercel.json', { isLight: true })).toBe('vercel_light');
  });

  it('should fallback to dark theme if light theme doesn\'t have a match', () => {
    // Assuming there's an icon that exists in dark theme but not in light theme
    expect(getIcon('Dockerfile', { isLight: true })).toBe('docker');
  });

  it('should return language icon if no other matches are found', () => {
    expect(getIcon('example.py')).toBe('python');
  });

  it('should return default folder icon if no matches are found for a folder', () => {
    expect(getIcon('random-folder', { isFolder: true })).toBe('folder');
  });

  it('should return default file icon if no matches are found for a file', () => {
    expect(getIcon('random.unknown')).toBe('file');
  });

  it('should handle paths with multiple extensions correctly', () => {
    expect(getIcon('example.test.js')).toBe('test-js');
  });

  it('should handle paths with directories correctly', () => {
    expect(getIcon(path.join('src', 'components', 'Button.tsx'))).toBe('react_ts');
  });

  it('should handle hidden files correctly', () => {
    expect(getIcon('.gitignore')).toBe('git');
  });

  it('should handle case sensitivity correctly', () => {
    expect(getIcon('README.md')).toBe('readme');
    expect(getIcon('readme.md')).toBe('readme');
  });

  it('should handle config files correctly', () => {
    expect(getIcon('.eslintrc.json')).toBe('eslint');
  });

  it('should return expanded folder icon for expanded folders', () => {
    expect(getIcon('src', { isFolder: true, isExpanded: true })).toBe('folder-src-open');
  });

  it('should return icon based on file extension when filename doesn\'t match', () => {
    expect(getIcon('unknown.ts')).toBe('typescript');
  });
  it('should return language icon when no other matches are found', () => {
    vi.mocked(languages.getLanguage).mockReturnValue({
      language_id: 999,
      name: 'CustomLang',
      type: 'programming',
      tm_scope: 'source.customlang',
      ace_mode: 'text',
      icons: ['custom-lang-icon']
    });
    expect(getIcon('unknown.customlang')).toBe('custom-lang-icon');
  });

  it('should return default file icon when no matches are found and language has no icon', () => {
    vi.mocked(languages.getLanguage).mockReturnValue({
      language_id: 1000,
      name: 'NoIconLang',
      type: 'programming',
      tm_scope: 'source.noiconlang',
      ace_mode: 'text',
      icons: []
    });
    expect(getIcon('unknown.nolangicon')).toBe('file');
  });

  it('should handle case insensitivity for file names', () => {
    expect(getIcon('dockerfile')).toBe('docker');
    expect(getIcon('Dockerfile')).toBe('docker');
    expect(getIcon('DOCKERFILE')).toBe('docker');
  });

  it('should handle case insensitivity for folder names', () => {
    expect(getIcon('node_modules', { isFolder: true })).toBe('folder-node');
    expect(getIcon('Node_Modules', { isFolder: true })).toBe('folder-node');
    expect(getIcon('NODE_MODULES', { isFolder: true })).toBe('folder-node');
  });

  it('should fallback to dark theme icon when light theme icon is not available', () => {
    expect(getIcon('example.rs', { isLight: true })).toBe('rust');
  });

  it('should fallback to dark theme for test-ts icon when in light theme', () => {
    expect(getIcon('example.test.ts', { isLight: true })).toBe('test-ts');
  });

  it('should return expanded folder icon when folder is expanded and unknown', () => {
    expect(getIcon('unknown_folder_name', { isFolder: true, isExpanded: true })).toBe('folder-open');
  });

  it('should return expanded folder icon when folder is expanded and unknown in light theme', () => {
    expect(getIcon('unknown_folder_name', { isFolder: true, isExpanded: true, isLight: true })).toBe('folder-open');
  });
});


