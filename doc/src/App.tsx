import { useState } from "react";
import { getIcon } from "omni-file";

function App() {
  const [filePath, setFilePath] = useState("src/App.tsx");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          File Icon Viewer
        </h1>
        <div className="mb-6">
          <label
            htmlFor="filePath"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter File Path:
          </label>
          <input
            id="filePath"
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            Icon: {getIcon(filePath)}
          </p>
          <div className="bg-gray-200 p-4 rounded-lg">
            <img
              className="w-24 h-24 object-contain"
              src={`omni-file/icons/${getIcon(filePath)}.svg`}
              alt={`Icon for ${filePath}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
