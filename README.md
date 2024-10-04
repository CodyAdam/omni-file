# omni-file

Omni-file is a comprehensive file information extractor that provides language, icon, type, and MIME information for any file based on its name or extension.

**Example with language:**

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

**Example with icon:**

```tsx
import { getIcon } from "omni-file";

const icon = getIcon("folder/example.ts"); // "typescript"
const svgUrl = `node_modules/omni-file/icons/${icon}.svg`;

<img src={svgUrl} alt={icon} />;
```

**Output:**

![TypeScript](./public/icons/typescript.svg)

> It leverages GitHub Linguist data to ensure up-to-date and accurate file type detection and uses Material Icon Theme for icons.

## Features

- Extract filename or extension smartly
- Determine most appropriate icons for file types using [Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme)
- Icons also cover folder names
- Always up-to-date with the latest GitHub Linguist data and Material Icons through continuous integration

## Installation

Install omni-file using npm:

```bash
npm install omni-file
```

Or if you prefer using pnpm:

```bash
pnpm add omni-file
```

## Usage

Here's a basic example of how to use omni-file:

```javascript
import { getFileInfo } from "omni-file";

const fileInfo = getFileInfo("example.js");
console.log(fileInfo);
```

This will output an object containing comprehensive information about the file, including its language, icon, type, and MIME type.

## API

### `getFileInfo(filename: string): FileInfo`

Returns an object with the following properties:

- `language`: The programming language associated with the file
- `icon`: The icon name for the file type
- `type`: The general type of the file (e.g., 'programming', 'markup', 'data')
- `mime`: The MIME type of the file

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

## Scripts

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
