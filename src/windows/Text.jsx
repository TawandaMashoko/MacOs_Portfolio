import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import useWindowStore from "#store/window";

const TextFile = () => {
  const { windows } = useWindowStore();
  const data = windows?.txtfile?.data;

  if (!data) return null;

  const { name, image, imageUrl, subtitle, description = [] } = data;
  const src = image || imageUrl || null;

  return (
    <>
      <div id="window-header" className="flex items-center gap-2 px-3 py-2">
        <WindowControls target="txtfile" />
        <div>
          <h2 className="font-medium text-sm">{name}</h2>
          {subtitle && <p className="text-xs opacity-70">{subtitle}</p>}
        </div>
      </div>

      <div className="p-4 overflow-auto h-full">
        {src && (
          <div className="mb-4">
            <img src={src} alt={name} className="w-full max-w-md" />
          </div>
        )}

        <div className="prose max-w-none">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(TextFile, "txtfile");
export default TextWindow;
