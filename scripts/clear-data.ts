import fs from "fs/promises";
import path from "path";

export default async function clearData() {
  console.log("Starting data clearing process...");

  const dataFolderPath = path.join(process.cwd(), "src", "data");
  const iconsFolderPath = path.join(process.cwd(), "public", "icons");

  async function clearFolder(folderPath: string, folderName: string) {
    try {
      console.log(`Deleting ${folderName} folder...`);
      await fs.rm(folderPath, { recursive: true, force: true });
      console.log(`${folderName} folder deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting ${folderName} folder:`, error);
    }

    try {
      console.log(`Recreating empty ${folderName} folder...`);
      await fs.mkdir(folderPath, { recursive: true });
      console.log(`Empty ${folderName} folder recreated.`);
    } catch (error) {
      console.error(`Error recreating ${folderName} folder:`, error);
    }
  }

  await clearFolder(dataFolderPath, "data");
  await clearFolder(iconsFolderPath, "icons");
}
