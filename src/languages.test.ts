import { describe, it, expect } from 'vitest';
import { getLanguage, languages } from './languages';

describe('Language detection functions', () => {
  describe('getLanguage', () => {
    it('should return correct language data for .js extension', () => {
      const result = getLanguage('file.js');
      expect(result).toBeDefined();
      expect(result?.name).toBe('JavaScript');
    });

    it('should return correct language data for .py extension', () => {
      const result = getLanguage('script.py');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Python');
    });

    it('should return undefined for unknown extension', () => {
      const result = getLanguage('file.unknown');
      expect(result).toBeUndefined();
    });

    it('should handle uppercase extensions', () => {
      const result = getLanguage('file.JS');
      expect(result).toBeDefined();
      expect(result?.name).toBe('JavaScript');
    });

    it('should handle extensions with multiple dots', () => {
      const result = getLanguage('.env.dev');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Dotenv');
    });

    it('should return correct language data for known filename', () => {
      const result = getLanguage('Dockerfile');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Dockerfile');
    });

    it('should return undefined for unknown filename without extension', () => {
      const result = getLanguage('unknownfile');
      expect(result).toBeUndefined();
    });

    it('should handle filenames with multiple dots', () => {
      const result = getLanguage('test.spec.ts');
      expect(result).toBeDefined();
      expect(result?.name).toBe('TypeScript');
    });

    it('should handle filenames with path', () => {
      const result = getLanguage('folder/subfolder/file.ts');
      expect(result).toBeDefined();
      expect(result?.name).toBe('TypeScript');
    });

    it('should handle filenames with spaces', () => {
      const result = getLanguage('my file.py');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Python');
    });

    it('should handle filenames with special characters', () => {
      const result = getLanguage('file-name_with.special@chars.rb');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Ruby');
    });

    it('should handle filenames starting with a dot', () => {
      const result = getLanguage('.gitignore');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Ignore List');
    });

    it('should handle empty string', () => {
      const result = getLanguage('');
      expect(result).toBeUndefined();
    });

    it('should handle paths with only separators', () => {
      const result = getLanguage('///');
      expect(result).toBeUndefined();
    });
  });

  describe('languages object', () => {
    it('should contain language data', () => {
      expect(Object.keys(languages).length).toBeGreaterThan(0);
    });

    it('should have correct structure for a sample language', () => {
      const jsLang = languages['JavaScript'];
      expect(jsLang).toBeDefined();
      expect(jsLang.language_id).toBe(183);
      expect(jsLang.type).toBe('programming');
      expect(jsLang.color).toBe('#f1e05a');
      expect(jsLang.extensions).toContain('.js');
    });
  });

  describe('Case sensitivity', () => {
    it('should be case insensitive for extensions', () => {
      const lowerCase = getLanguage('file.js');
      const upperCase = getLanguage('file.JS');
      expect(lowerCase).toEqual(upperCase);
    });

    it('should be case sensitive for filenames', () => {
      const lowerCase = getLanguage('dockerfile');
      const upperCase = getLanguage('Dockerfile');
      expect(lowerCase).toBeUndefined();
      expect(upperCase).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should handle a large number of lookups efficiently', () => {
      const start = performance.now();
      for (let i = 0; i < 10000; i++) {
        getLanguage('file.js');
        getLanguage('test.py');
      }
      const end = performance.now();
      expect(end - start).toBeLessThan(1000); // Adjust the threshold as needed
    });
  });
});