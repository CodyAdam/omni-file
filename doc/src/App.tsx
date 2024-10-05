import { useState } from "react";
import { getIcon } from "omni-file";

function App() {
  const [filePath, setFilePath] = useState("src/App.tsx");
  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto p-8">
      <input
        type="text"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
      />
      <p>{getIcon(filePath)}</p>
      <img
        className="w-20 h-20"
        src={`/icons/${getIcon(filePath)}.svg`}
        alt={filePath}
      />
    </div>
  );
}

export default App;
