import extractLinguist from "./extract-linguist";
import generateIconsMapping from "./generate-icons-mapping";
import updateSvg from "./update-svg";
import clearData from "./clear-data";
import addIconsToLang from './add-icons-to-lang';

async function updateData() {
  console.log("Starting data update process...");

  await clearData();
  await updateSvg();
  await extractLinguist();
  await generateIconsMapping();
  await addIconsToLang();
}

updateData().catch(console.error);
