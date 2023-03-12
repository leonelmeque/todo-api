import "colors";
import express from "express";
import {
  deleteTimeline,
  deleteTimelineEvents,
  generateTimeline,
  getTimelineEvents,
  saveTimelineEvents,
  updateTimelineEvents,
} from "../services/timeline.service";

const router = express.Router();

router.post("/create/:id", generateTimeline);

router.get("/find/:id", getTimelineEvents);

router.post("/save/:id", saveTimelineEvents);

router.put("/update/:id", updateTimelineEvents);

router.delete("/remove/:id", deleteTimelineEvents);

router.delete("/remove/all/:id", deleteTimeline);

export default router;
