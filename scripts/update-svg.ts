import fs from "fs";
import path from "path";

const sourceDir = path.join(
  process.cwd(),
  "node_modules",
  "material-icon-theme",
  "icons"
);
const targetDir = path.join(process.cwd(), "public", "icons");

/**
 * Function to copy files recursively to the target directory
 * @param {string} source - The source directory path
 * @param {string} target - The target directory path
 */
function copyFiles(source: string, target: string): void {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read source directory
  const files = fs.readdirSync(source);

  // Copy each SVG file
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
    }
  });
}

export default async function updateSvg() {
  try {
    copyFiles(sourceDir, targetDir);
    console.log(`Icons successfully copied to ${targetDir}`);
  } catch (error) {
    console.error("Error copying icons:", error);
  }
}
