/**
 * Represents a collection of language data, where each key is the LanguageData["name"] property
 * (e.g., "JavaScript", "Python", "HTML") and the value is the corresponding LanguageData object.
 *
 * This structure allows for easy lookup and access to language-specific information
 * based on the language name. The key is case-sensitive and matches the "name" field
 * in the LanguageData object.
 *
 * @example
 * const languagesJSON: LanguagesJSON = {
 *   "JavaScript": {
 *     language_id: 183,
 *     name: "JavaScript",
 *     type: "programming",
 *     tm_scope: "source.js",
 *     ace_mode: "javascript",
 *     color: "#f1e05a",
 *     extensions: [".js", ".mjs"],
 *     // ... other properties
 *   },
 *   "Python": {
 *     language_id: 303,
 *     name: "Python",
 *     type: "programming",
 *     tm_scope: "source.python",
 *     ace_mode: "python",
 *     color: "#3572A5",
 *     extensions: [".py", ".pyi"],
 *     // ... other properties
 *   },
 *   // ... other languages
 * };
 */
export type LanguagesJSON = Record<string, LanguageData>;

export type LanguageData = {
  /** A unique identifier for the language */
  language_id: number;

  /** The name of the language (e.g. "JavaScript", "Python", "HTML") */
  name: string;

  /** The classification of the language (e.g., "programming", "markup", "data") */
  type: string;

  /** The TextMate scope used for syntax highlighting */
  tm_scope: string;

  /** The mode used by the Ace editor for syntax highlighting (e.g. "text", "html", "javascript") */
  ace_mode: string;

  /** The color associated with the language (usually a hex code example: '#000000') */
  color?: string;

  /** File extensions associated with the language (always starts with a dot, e.g. ".js") */
  extensions?: string[];

  /** Specific filenames associated with the language */
  filenames?: string[];

  /** Interpreters used for the language */
  interpreters?: string[];

  /** Alternative names for the language */
  aliases?: string[];

  /** The mode used by CodeMirror for syntax highlighting */
  codemirror_mode?: string;

  /** The MIME type used by CodeMirror */
  codemirror_mime_type?: string;

  /** The group the language belongs to (if any) */
  group?: string;

  /** Whether the language should be wrapped (usually for prose languages) */
  wrap?: boolean;

  /** Whether the language is searchable */
  searchable?: boolean;
};

export type LanguageWithIconsData = LanguageData & {
  icons?: string[];
};

export type LanguagesWithIconsJSON = Record<string, LanguageWithIconsData>;

/**
 * Represents a mapping of file extensions to language names (LanguageData["name"])
 * The key has no leading dot.
 *
 * @example
 * {
 *   "js": "JavaScript",
 *   "py": "Python"
 * }
 */
export type ExtensionMapJSON = Record<string, string>;

/**
 * Represents a mapping of specific filenames to language names (LanguageData["name"])
 *
 * @example
 * {
 *   "makefile": "Makefile",
 *   "Dockerfile": "Dockerfile"
 * }
 */
export type FileNamesMapJSON = Record<string, string>;


export type IconsJSON = {
  /** Default icon name for files */
  file: string;

  /** Default icon name for folders */
  folder: string;

  /** Default icon name for expanded folders */
  folderExpanded: string;

  /**
   * Mapping of file extensions to icon names (no leading dot)
   * @example { "js": "javascript", "py": "python" }
   */
  fileExtensions: Record<string, string>;

  /**
   * Mapping of specific file names to icon names
   * @example { "package.json": "nodejs", "dockerfile": "docker" }
   */
  fileNames: Record<string, string>;

  /**
   * Mapping of folder names to icon names
   * @example { "src": "folder-src", "test": "folder-test" }
   */
  folderNames: Record<string, string>;

  /**
   * Mapping of expanded folder names to icon names
   * @example { "node_modules": "folder-node-open", "dist": "folder-dist-open" }
   */
  folderNamesExpanded: Record<string, string>;

  /**
   * Mapping of language IDs to icon names
   * @example { "sql": "database", "plaintext": "document" }
   */
  languageIds: Record<string, string>;
};
