import express from "express";
import {
  getDateDetails,
  getGallery,
  getMonthEvents,
} from "../controllers/ClientEventsController.js";

const router = express.Router();

router.get("/events", getMonthEvents);
router.get("/events/:date", getDateDetails);
router.get("/gallery", getGallery);

export default router;
