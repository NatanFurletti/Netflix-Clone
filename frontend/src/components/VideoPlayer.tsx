import React from "react";

type Props = { src: string; title?: string };

const getMimeType = (url: string): string => {
  const clean = url.split("?")[0].split("#")[0];
  const ext = clean.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "mp4":
      return "video/mp4";
    case "mkv":
      // Nem todos os navegadores suportam MKV; quando suportam, geralmente é este MIME
      return "video/x-matroska";
    case "webm":
      return "video/webm";
    case "ogv":
      return "video/ogg";
    default:
      // fallback comum
      return "video/mp4";
  }
};

const VideoPlayer: React.FC<Props> = ({ src, title }) => {
  const type = getMimeType(src);

  return (
    <video
      controls
      title={title}
      aria-label={title}
      style={{ width: "100%", maxHeight: "70vh" }}
      playsInline
      preload="metadata"
    >
      <source src={src} type={type} />
      Seu navegador não suporta vídeo.
    </video>
  );
};

export default VideoPlayer;
