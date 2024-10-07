import { generateManifest, Manifest } from "material-icon-theme";
import path from "path";
import fs from "fs";
import type { IconsJSON } from "../src/json-types";

/**
 * Icon Mapping Configuration
 *
 * We use the material-icon-theme package for icon mapping in our project.
 * This package provides a comprehensive set of icons for various file types
 * and extensions, enhancing the visual representation of files in the IDE
 * or file explorer.
 *
 * The generateManifest function creates a manifest object containing
 * all the icon mappings and configurations.
 *
 * Extension of Material Icon Theme:
 * We extend the material-icon-theme with VSCode's default icon mappings.
 * This is necessary because VSCode has its own set of default file
 * associations that may not be covered by the material-icon-theme.
 *
 * By combining both sets of mappings, we ensure:
 * 1. A more complete icon set
 * 2. Consistent visual representation across different file types
 * 3. Enhanced user experience
 *
 * The fileExtensionToIconMap object defined below supplements
 * the material-icon-theme mappings with VSCode's default associations.
 */

const manifest = generateManifest();

/**
 * Default File Association Map for Icons
 *
 * This data is sourced from VSCode's source code:
 * https://github.com/microsoft/vscode/blob/main/build/lib/electron.js
 *
 * Note: The 'default' icon name should not be overridden.
 */
const fileExtensionToIconMap = {
  h: "c",
  c: "c",
  gitattributes: "git",
  gitconfig: "git",
  gitignore: "git",
  asp: "html",
  aspx: "html",
  cshtml: "html",
  jshtm: "html",
  jsp: "html",
  phtml: "html",
  shtml: "html",
  bat: "console",
  cmd: "console",
  bowerrc: "bower",
  config: "settings",
  editorconfig: "settings",
  ini: "settings",
  cfg: "settings",
  hh: "cpp",
  hpp: "cpp",
  hxx: "cpp",
  "h++": "cpp",
  cc: "cpp",
  cpp: "cpp",
  cxx: "cpp",
  "c++": "cpp",
  m: "objective-c",
  mm: "cpp",
  cs: "csharp",
  csx: "csharp",
  css: "css",
  go: "go",
  htm: "html",
  html: "html",
  xhtml: "html",
  jade: "pug",
  jav: "java",
  java: "java",
  js: "javascript",
  jscsrc: "javascript",
  jshintrc: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  json: "json",
  less: "less",
  markdown: "markdown",
  md: "markdown",
  mdoc: "markdown",
  mdown: "markdown",
  mdtext: "markdown",
  mdtxt: "markdown",
  mdwn: "markdown",
  mkd: "markdown",
  mkdn: "markdown",
  php: "php",
  ps1: "powershell",
  psd1: "powershell",
  psm1: "powershell",
  py: "python",
  pyi: "python",
  gemspec: "ruby",
  rb: "ruby",
  erb: "ruby",
  scss: "sass",
  sass: "sass",
  sql: "database",
  ts: "typescript",
  tsx: "react",
  jsx: "react",
  vue: "vue",
  ascx: "xml",
  csproj: "xml",
  dtd: "xml",
  plist: "xml",
  wxi: "xml",
  wxl: "xml",
  wxs: "xml",
  xml: "xml",
  xaml: "xml",
  eyaml: "yaml",
  eyml: "yaml",
  yaml: "yaml",
  yml: "yaml",
  bash: "console",
  bash_login: "console",
  bash_logout: "console",
  bash_profile: "console",
  bashrc: "console",
  profile: "console",
  rhistory: "console",
  rprofile: "console",
  sh: "console",
  zlogin: "console",
  zlogout: "console",
  zprofile: "console",
  zsh: "console",
  zshenv: "console",
  zshrc: "console",
  clj: "clojure",
  cljs: "clojure",
  cljx: "clojure",
  clojure: "clojure",
  "code-workspace": "vscode",
  coffee: "coffee",
  csv: "table",
  cmake: "cmake",
  dart: "dart",
  diff: "diff",
  dockerfile: "docker",
  gradle: "gradle",
  groovy: "groovy",
  makefile: "makefile",
  mk: "makefile",
  lua: "lua",
  pug: "pug",
  ipynb: "jupyter",
  lock: "lock",
  log: "log",
  txt: "document",
  vb: "visualstudio",
  r: "r",
  rs: "rust",
  rst: "document",
  tex: "tex",
  cls: "tex",
  fs: "fsharp",
  fsi: "fsharp",
  fsx: "fsharp",
  fsscript: "fsharp",
  svg: "svg",
  svgz: "svg",
  toml: "settings",
  swift: "swift",
  containerfile: "docker",
  ctp: "php",
  dot: "dotjs",
  edn: "clojure",
  handlebars: "handlebars",
  hbs: "handlebars",
  ml: "ocaml",
  mli: "ocaml",
  pl: "perl",
  pl6: "perl",
  pm: "perl",
  pm6: "perl",
  pod: "perl",
  pp: "puppet",
  properties: "settings",
  psgi: "perl",
  rt: "react",
  t: "perl",
};

/**
 * Language ID to Icon Map
 * 
 * This object maps language IDs to their corresponding icon names.
 * It's used to provide icons for languages that may not have a specific file extension.
 * 
 * Note: Add more language IDs and their corresponding icons as needed.
 */
const languageIdToIconMap = {
  "text": "document",
};

/**
 * This function generates an icon mapping based on the provided manifest and writes it to a file.
 * It extends the manifest with additional file extensions and creates a comprehensive icon mapper.
 *
 * @param manifest The manifest object containing initial icon mappings
 * @param targetDir The directory path where the icon mapping file will be written
 */
function generateIconMapping(manifest: Manifest, targetDir: string) {
  /**
   * This object maps file extensions to their corresponding icon names.
   * It serves as a fallback for file types not explicitly defined in the material-icon-theme manifest.
   * The 'default' icon is used for file types that don't have a specific icon assigned.
   */

  if (manifest?.fileExtensions) {
    for (const [extension, icon] of Object.entries(fileExtensionToIconMap)) {
      if (
        manifest.fileExtensions.hasOwnProperty(extension) ||
        icon === "default"
      ) {
        continue;
      }
      manifest.fileExtensions[extension] = icon;
    }
  }

  // Extend languageIds with additional mappings
  if (manifest.languageIds) {
    for (const [langId, icon] of Object.entries(languageIdToIconMap)) {
      if (!manifest.languageIds.hasOwnProperty(langId)) {
        manifest.languageIds[langId] = icon;
      }
    }
  }

  const iconMapper = {
    file: manifest.file ?? "file",
    folder: manifest.folder ?? "folder",
    folderExpanded: manifest.folderExpanded ?? "folder-open",
    fileExtensions: manifest.fileExtensions ?? {},
    fileNames: manifest.fileNames ?? {},
    folderNames: manifest.folderNames ?? {},
    languageIds: manifest.languageIds ?? {},
    folderNamesExpanded: manifest.folderNamesExpanded ?? {},
  } satisfies IconsJSON;

  try {
    fs.writeFileSync(targetDir, JSON.stringify(iconMapper, null, 2));
    console.log("Icons mapping generated successfully to", targetDir);
  } catch (error) {
    console.error("Error writing icons mapping to file:", error);
  }
}



export default async function generateIconsMapping() {
  const targetDir = path.join(process.cwd(), "src", "data", "icons.json");
  const targetDirLight = path.join(
    process.cwd(),
    "src",
    "data",
    "icons-light.json"
  );

  generateIconMapping(manifest, targetDir);
  if (manifest.light) {
    generateIconMapping(manifest.light, targetDirLight);
  }
}
