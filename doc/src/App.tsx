import { useState } from "react";
import IconShowcase from "./icons-showcase";

function App() {
  const [filePath, setFilePath] = useState("src/App.tsx");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Omni File Icon Viewer
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
            placeholder="src/App.tsx"
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <IconShowcase pathname={filePath} />
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://github.com/codyadam/omni-file"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition duration-300"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
