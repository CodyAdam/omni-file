import fs from "fs";
import path from "path";

const sourceDir = path.join(
  process.cwd(),
  "node_modules",
  "material-icon-theme",
  "icons"
);
const targetDir = path.join(process.cwd(), "public", "icons");
const iconListPath = path.join(process.cwd(), "src", "data", "icon-list.json");

/**
 * Function to copy files recursively to the target directory and save icon list
 * @param {string} source - The source directory path
 * @param {string} target - The target directory path
 */
function copyFilesAndSaveList(source: string, target: string): void {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read source directory
  const files = fs.readdirSync(source);

  // Array to store icon names
  const iconList: string[] = [];

  // Copy each SVG file and collect icon names
  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === ".svg") {
      const sourcePath = path.join(source, file);
      let targetFileName = file;
      
      // Remove .clone from the file name if it exists
      if (file.endsWith('.clone.svg')) {
        targetFileName = file.replace('.clone.svg', '.svg');
      }
      
      const targetPath = path.join(target, targetFileName);
      fs.copyFileSync(sourcePath, targetPath);

      // Add icon name (without extension) to the list
      iconList.push(path.parse(targetFileName).name);
    }
  });

  // Save icon list to JSON file
  fs.writeFileSync(iconListPath, JSON.stringify(iconList, null, 2));
}

export default async function updateSvg() {
  try {
    copyFilesAndSaveList(sourceDir, targetDir);
    console.log(`Icons successfully copied to ${targetDir}`);
    console.log(`Icon list saved to ${iconListPath}`);
  } catch (error) {
    console.error("Error copying icons or saving icon list:", error);
  }
}
