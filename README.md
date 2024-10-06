# omni-file

[![npm package](https://img.shields.io/npm/v/omni-file.svg)](https://www.npmjs.com/package/omni-file)
[![Last Update](https://img.shields.io/github/last-commit/CodyAdam/omni-file.svg)](https://github.com/CodyAdam/omni-file/commits/main)
[![License](https://img.shields.io/github/license/CodyAdam/omni-file.svg)](https://github.com/CodyAdam/omni-file/blob/main/LICENSE)

Omni-file is a comprehensive file information extractor that provides language, icon, type, and MIME information for any file based on its name or extension. With **over 1000 icons**, support for **more than 700 programming languages**, and only **79.4 kB gzipped**, it's both **powerful and lightweight**!

> It leverages [GitHub Linguist](https://github.com/github/linguist) data and [Material Icon Theme](https://github.com/PKief/vscode-material-icon-theme) for up-to-date and accurate file type detection and icons. The data is regularly updated to ensure the latest language and icon information.

**[Try out the demo](https://codyadam.github.io/omni-file/)**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [API](#api)
- [Icon Themes](#icon-themes)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Lightweight: only 79.4 kB gzipped**
- **Over 1000 icons** covering a wide range of file types, extensions, and folder names, using [Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme)
- **Accurate language detection** for over 700 programming languages, using [GitHub Linguist](https://github.com/github/linguist)
- **Comprehensive file information** including type, color, aliases, and more
- **Smart extraction** of filename or extension
- **Always up-to-date** through automated processes to ensure the latest data

## Installation

Install omni-file from npm:

```bash
npm install omni-file
pnpm add omni-file
yarn add omni-file
```

## Examples

**[Try out the demo](https://codyadam.github.io/omni-file/)**

### Examples of `getIcon`

```typescript
import { getIcon } from "omni-file";

console.log(getIcon("example.js")); // Output: 'javascript'
console.log(getIcon("styles.css")); // Output: 'css'
console.log(getIcon("data.json")); // Output: 'json'
console.log(getIcon("package.json")); // Output: 'nodejs'
console.log(getIcon("Dockerfile")); // Output: 'docker'
console.log(getIcon(".gitignore")); // Output: 'git'
console.log(getIcon("src", { isFolder: true })); // Output: 'folder-src'
console.log(getIcon("node_modules", { isFolder: true })); // Output: 'folder-node'
console.log(getIcon("tests", { isFolder: true, isExpanded: true })); // Output: 'folder-test-open'
console.log(getIcon("vercel.json", { isLight: true })); // Output: 'vercel_light'
console.log(getIcon("example.test.js")); // Output: 'test-js'
console.log(getIcon("component.spec.ts")); // Output: 'test-ts'
console.log(getIcon(path.join("src", "components", "Button.tsx"))); // Output: 'react_ts'
console.log(getIcon(path.join("tests", "unit", "utils.test.js"))); // Output: 'test-js'
console.log(getIcon(".eslintrc.json")); // Output: 'eslint'
console.log(getIcon(".prettierrc")); // Output: 'prettier'
console.log(getIcon("tsconfig.json")); // Output: 'tsconfig'
console.log(getIcon("README.md")); // Output: 'readme'
console.log(getIcon("readme.md")); // Output: 'readme'
console.log(getIcon("DockerFile")); // Output: 'docker'
console.log(getIcon("dockerfile")); // Output: 'docker'
```

### Example with language

```typescript
import { getLanguage } from "omni-file";

console.log(getLanguage("folder/example.ts"));
```

**Output:**

```json
{
  "type": "programming",
  "color": "#3178c6",
  "aliases": ["ts"],
  "interpreters": ["deno", "ts-node", "tsx"],
  "extensions": [".ts", ".cts", ".mts"],
  "tm_scope": "source.ts",
  "ace_mode": "typescript",
  "codemirror_mode": "javascript",
  "codemirror_mime_type": "application/typescript",
  "language_id": 378,
  "name": "TypeScript",
  "icons": ["typescript", "javascript"]
}
```

> Note that you can also get icons from `getLanguage` by using `getLanguage(filename)?.icons` but the answer may be less accurate. (folder icons are not included this way)

### Example implementation of `getIcon`

```tsx
import { getIcon } from "omni-file";

const icon = getIcon("folder/example.ts"); // "typescript"
const svgUrl = `node_modules/omni-file/icons/${icon}.svg`;

<img src={svgUrl} alt={icon} />;
```

**Output:**

![TypeScript](https://github.com/CodyAdam/omni-file/raw/main/public/icons/typescript.svg)

### Example using raw data

```tsx
import { languages, icons } from "omni-file";

console.log(languages["JavaScript"].extensions); // -> [ ".js",".cjs",".es",".jsm", ... ]
console.log(icons.fileExtensions["js"]); // -> "javascript"
```

## API

**Core functions:**

- `getLanguage(filename: string): Language`
- `getIcon(filename: string, options?: IconOptions): string`

**Utility functions:**

- `getBaseFilenameFromRelativePath(filePath: string): string`
- `getExtensionsFromRelativePath(filePath: string): string[]`

**Type definitions:**

- `LanguageData`: Detailed information about a programming language
- `LanguageWithIconsData`: Extends `LanguageData` with icon information
- `IconOptions`: Options for icon retrieval (isFolder, isExpanded, isLight)

- `LanguagesJSON`: A record of language names to `LanguageData` objects
- `LanguagesWithIconsJSON`: A record of language names to `LanguageWithIconsData` objects
- `ExtensionMapJSON`: Maps file extensions to language names
- `FileNamesMapJSON`: Maps specific filenames to language names
- `IconsJSON`: Defines icon associations for files and folders

**Raw data:**

- [`languages`](https://github.com/CodyAdam/omni-file/tree/main/src/data/languages-with-icons.json): A map of all languages with icons
- [`extensionMap`](https://github.com/CodyAdam/omni-file/tree/main/src/data/extension-map.json): Maps file extensions to language names
- [`fileNamesMap`](https://github.com/CodyAdam/omni-file/tree/main/src/data/file-names-map.json): Maps specific filenames to language names
- [`icons`](https://github.com/CodyAdam/omni-file/tree/main/src/data/icons.json): Default icon set (dark theme)
- [`iconsLight`](https://github.com/CodyAdam/omni-file/tree/main/src/data/icons-light.json): Light theme icon set (has less icons then dark theme)

## Icon Themes

Omni-file provides two icon sets:

1. **Dark Theme**: Default icon set for dark-themed environments.
2. **Light Theme**: Optimized icon set for light-themed environments. Note that this set has fewer icons then the dark theme but the function will fallback to the dark theme if the light themed icon is not found.

You can switch between these themes based on your application's needs:

```typescript
import { getIcon, IconTheme } from "omni-file";

const darkIcon = getIcon("example.ts", { isLight: false });
const lightIcon = getIcon("example.ts", { isLight: true });
```

## Development

To set up the project for development:

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the data update script:
   ```bash
   pnpm run update-data
   ```
4. Build the project:
   ```bash
   pnpm run build
   ```
5. Run tests:
   ```bash
   pnpm test
   ```

### package.json scripts

- `build`: Builds the project using tsup
- `build:watch`: Watches for changes and rebuilds
- `test`: Runs the test suite
- `test:coverage`: Runs tests with coverage reporting
- `update-data`: Updates the Linguist data
- `postinstall`: Automatically updates data after installation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project uses languages data from [GitHub Linguist](https://github.com/github/linguist)
- Icon data is based on [Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme)
