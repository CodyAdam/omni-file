import { getIcon } from "omni-file";
import React from "react";
import { cn } from "./lib/utils";

interface IconShowcaseProps {
  pathname: string;
  isFolder: boolean;
  brightness: number;
  opacity: number;
}

const IconShowcase: React.FC<IconShowcaseProps> = ({
  pathname,
  isFolder,
  brightness,
  opacity,
}) => {
  const iconVariations: {
    isLight: boolean;
    isExpanded?: boolean;
  }[] = isFolder
    ? [
        { isLight: false, isExpanded: false },
        { isLight: false, isExpanded: true },
        { isLight: true, isExpanded: false },
        { isLight: true, isExpanded: true },
      ]
    : [{ isLight: false }, { isLight: true }];
  return (
    <div className="p-4">
      <div className={`grid ${isFolder ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        {iconVariations.map((opts, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className={cn(
                "w-16 h-16 shrink-0 p-2 flex items-center justify-center rounded-xl overflow-hidden",
                opts.isLight ? "bg-white" : "bg-background"
              )}
            >
              <img
                src={`/omni-file/icons/${getIcon(pathname, {
                  ...opts,
                  isFolder,
                })}.svg`}
                alt={`Icon: ${getIcon(pathname, { ...opts, isFolder })}`}
                title={getIcon(pathname, { ...opts, isFolder })}
                className="w-full h-full shrink-0"
                style={{
                  filter: `brightness(${brightness}) opacity(${opacity}%)`,
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {isFolder
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
