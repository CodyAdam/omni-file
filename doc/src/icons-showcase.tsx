import React from "react";
import { getIcon } from "omni-file"; // Assuming you have this utility function

interface IconShowcaseProps {
  pathname: string;
}

const IconShowcase: React.FC<IconShowcaseProps> = ({ pathname }) => {
  const iconVariations: {
    isLight: boolean;
    isFolder: boolean;
    isExpanded: boolean;
  }[] = [
    { isLight: false, isFolder: false, isExpanded: false },
    { isLight: false, isFolder: true, isExpanded: false },
    { isLight: false, isFolder: true, isExpanded: true },
    { isLight: true, isFolder: false, isExpanded: false },
    { isLight: true, isFolder: true, isExpanded: false },
    { isLight: true, isFolder: true, isExpanded: true },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Icons for: <code className="font-mono">{pathname}</code>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {iconVariations.map((opts, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
              <img
                src={`/omni-file/icons/${getIcon(pathname, opts)}.svg`}
                alt={`Icon: ${getIcon(pathname, opts)}`}
                title={getIcon(pathname, opts)}
                className="w-12 h-12"
              />
            </div>
            <span className="mt-2 text-sm text-center">
              {opts.isFolder
                ? opts.isExpanded
                  ? "Expanded Folder"
                  : "Folder"
                : "File"}
              {opts.isLight ? " (light)" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconShowcase;
