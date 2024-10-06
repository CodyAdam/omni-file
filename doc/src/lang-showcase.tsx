import { getLanguage } from "omni-file";

export function LangShowcase({ pathName }: { pathName: string }) {
  const lang = getLanguage(pathName);
  // @ts-expect-error: ignore
  const langWithNameFirst = lang ? { name: lang.name, ...lang } : null;

  if (!langWithNameFirst) {
    return (
      <div className="text-muted-foreground p-4">
        No language information available for this file.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Language Information</h2>
      <div className="flex flex-col divide-y">
        {Object.entries(langWithNameFirst).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between gap-x-4 gap-y-1 py-1 flex-wrap"
          >
            <span className="text-muted-foreground truncate" title={key}>
              {key}
            </span>
            {Array.isArray(value) ? (
              <span className="font-mono" title={value.join(", ")}>
                {value.join(", ")}
              </span>
            ) : typeof value === "boolean" ? (
              <span className="font-mono" title={value.toString()}>
                {value.toString()}
              </span>
            ) : (
              <span className="font-mono" title={value.toString()}>
                {value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
