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
