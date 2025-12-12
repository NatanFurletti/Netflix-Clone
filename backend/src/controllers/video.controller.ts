import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export const streamVideo = (
  req: Request<{ fileName: string }>,
  res: Response
) => {
  const filePath = path.join(__dirname, "../../videos", req.params.fileName!); //app.get("/video/:fileName", streamVideo);
  //ao adicionar a rota que pega o video, tirar o ! do filename
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Video not found" });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".mp4": "video/mp4",
    ".mkv": "video/x-matroska",
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0] || "0", 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": contentType,
    });
    stream.pipe(res);
  }
};

export const listVideos = (req: Request, res: Response) => {
  // By default, return a small sample set of remote video URLs so we don't depend on
  // any local files on the user's machine. If you want to use local videos, set
  // the env var USE_LOCAL_VIDEOS=true and put files in the backend/videos folder.

  const useLocal = process.env.USE_LOCAL_VIDEOS === "true";
  if (useLocal) {
    const videosFolder = path.join(__dirname, "../../videos");
    if (!fs.existsSync(videosFolder)) {
      return res.json([]);
    }

    const files = fs.readdirSync(videosFolder).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return [".mp4", ".webm", ".mkv", ".ogv"].includes(ext);
    });

    const result = files.map((f) => ({
      fileName: f,
      title: path.parse(f).name,
      // The frontend will use this streaming endpoint to request the video if local
      source: `${req.protocol}://${req.get("host")}/api/videos/${encodeURIComponent(f)}/stream`,
    }));

    return res.json(result);
  }

  // Otherwise return a curated set of sample videos from remote hosts (public demo files)
  const samples = [
    {
      fileName: "big_buck_bunny_720p_1mb.mp4",
      title: "Big Buck Bunny",
      poster:
        "https://images.unsplash.com/photo-1562547411-1a5d7e7a5d43?auto=format&fit=crop&w=800&q=80",
      source:
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    },
    {
      fileName: "small.mp4",
      title: "Ocean Waves",
      poster:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      source: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    },
    {
      fileName: "sample_640x360.mp4",
      title: "Forest Timelapse",
      poster:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      source: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    },
  ];

  return res.json(samples);
};
