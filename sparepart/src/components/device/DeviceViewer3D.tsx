"use client";

import dynamic from "next/dynamic";

const ModelScene = dynamic(() => import("./ModelScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: "#E4EEF7" }}>
      <div className="text-center">
        <div className="text-4xl mb-2">🔧</div>
        <div className="text-sm" style={{ color: "#5A5A5A" }}>Loading 3D model...</div>
      </div>
    </div>
  ),
});

interface Props {
  modelFile: string | null;
  deviceName: string;
  thumbnailUrl: string | null;
}

export function DeviceViewer3D({ modelFile, deviceName, thumbnailUrl }: Props) {
  if (modelFile?.startsWith("sketchfab:")) {
    const sketchfabId = modelFile.replace("sketchfab:", "");
    return (
      <div
        className="w-full rounded-2xl overflow-hidden border"
        style={{ borderColor: "#C8DDEF", background: "white", height: "380px" }}
      >
        <iframe
          title={deviceName}
          src={`https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&ui_hint=0&ui_infos=0&ui_watermark=0`}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  if (!modelFile) {
    return (
      <div
        className="w-full h-80 rounded-2xl flex items-center justify-center border-2 border-dashed"
        style={{
          background: "linear-gradient(135deg, #E4EEF7 0%, #FDE8CF 100%)",
          borderColor: "#C8DDEF",
        }}
      >
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={deviceName}
            className="max-h-64 object-contain drop-shadow-xl"
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
        ) : (
          <div className="text-center px-8">
            <div className="text-6xl mb-4">🔧</div>
            <p className="font-medium text-charcoal">{deviceName}</p>
            <p className="text-xs mt-1" style={{ color: "#5A5A5A" }}>
              3D model coming soon
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full h-80 rounded-2xl overflow-hidden border"
      style={{ borderColor: "#C8DDEF", background: "white" }}
    >
      <ModelScene modelUrl={`/models/${modelFile}`} />
    </div>
  );
}
