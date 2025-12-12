import express from "express";
import { streamVideo, listVideos } from "../controllers/video.controller";

const router = express.Router();

// GET /api/videos -> list available video files
router.get("/", listVideos);

// GET /api/videos/:fileName/stream -> stream the video (range requests)
router.get("/:fileName/stream", streamVideo);

export default router;
