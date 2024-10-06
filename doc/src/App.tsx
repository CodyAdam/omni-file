import { useState } from "react";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { IconList } from "./icon-list";
import IconShowcase from "./icons-showcase";
import { LangShowcase } from "./lang-showcase";

function App() {
  const [filePath, setFilePath] = useState("project/lib/demo.ts");
  const [isFolder, setIsFolder] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [opacity, setOpacity] = useState(100);

  return (
    <div className="flex flex-col max-w-screen-lg mx-auto w-full gap-24 p-8">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="border rounded-3xl border-black/10">
          <div className="pl-6 pr-4 py-4 flex items-center gap-x-20 gap-y-2 border border-gray-200/10 rounded-3xl bg-card flex-wrap">
            <h1 className="text-2xl text-foreground font-bold font-display">
              Omni File
            </h1>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/codyadam/omni-file"
                target="_blank"
                rel="noopener noreferrer"
                title="View on GitHub"
                className="opacity-40 hover:opacity-100 transition duration-300 shrink-0"
              >
                <img
                  src="https://api.iconify.design/ri:github-fill.svg"
                  alt="GitHub"
                  className="invert w-10 h-10"
                />
              </a>
              <a
                href="https://www.npmjs.com/package/omni-file"
                target="_blank"
                rel="noopener noreferrer"
                title="View on NPM"
                className="opacity-40 hover:opacity-100 transition duration-300 shrink-0"
              >
                <img
                  src="https://api.iconify.design/ri:npmjs-fill.svg"
                  alt="npm icon"
                  className="invert w-10 h-10"
                />
              </a>
              <a
                href="https://github.com/codyadam/omni-file"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary/80 transition px-4 py-2 rounded-xl flex items-center gap-2 ml-1 shrink-0"
              >
                <img
                  src="https://api.iconify.design/ri:book-marked-fill.svg"
                  alt="book icon"
                  className="w-6 h-6 invert"
                />
                Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col h-full">
          <h1 className="text-[3.5rem] leading-[4rem] mb-12 font-display">
            From filename to{" "}
            <span className="text-accent-foreground font-semibold">
              full file info
            </span>
          </h1>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="filePathInput"
              className="text-lg font-semibold text-foreground"
            >
              {isFolder ? "Folder path" : "File path"}
            </label>
            <div className="flex items-center">
              <Switch
                id="folderSwitch"
                checked={isFolder}
                onCheckedChange={setIsFolder}
              />
              <label htmlFor="folderSwitch" className="text-foreground ml-2">
                Path is a folder
              </label>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="filePathInput"
              type="text"
              placeholder="project/lib/demo.ts"
              className="py-4 px-6 text-lg rounded-2xl border border-foreground/10 bg-input text-foreground flex-grow font-mono"
              onChange={(e) => setFilePath(e.target.value)}
              value={filePath}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="brightnessSlider" className="text-foreground">
                  Brightness <span className="opacity-40">({brightness})</span>
                </label>
                <button
                  onClick={() => setBrightness(1)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Reset
                </button>
              </div>
              <Slider
                id="brightnessSlider"
                min={0}
                max={4}
                step={0.01}
                value={[brightness]}
                onValueChange={(value) =>
                  setBrightness(value[0] === 4 ? 100 : value[0])
                }
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="opacitySlider" className="text-foreground">
                  Opacity <span className="opacity-40">({opacity})</span>
                </label>
                <button
                  onClick={() => setOpacity(100)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Reset
                </button>
              </div>
              <Slider
                id="opacitySlider"
                min={0}
                max={100}
                step={1}
                value={[opacity]}
                onValueChange={(value) => setOpacity(value[0])}
              />
            </div>
          </div>
        </div>
        <div className="border rounded-3xl overflow-hidden p-4 bg-card">
          <IconShowcase
            pathname={filePath}
            isFolder={isFolder}
            brightness={brightness}
            opacity={opacity}
          />
          <LangShowcase pathName={filePath} />
        </div>
      </div>
      <IconList brightness={brightness} opacity={opacity} />
    </div>
  );
}

export default App;
