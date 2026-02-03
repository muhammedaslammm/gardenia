import express from "express";
import {
  getDateDetails,
  getGallery,
  getMonthEvents,
} from "../controllers/ClientEventsController.js";

const router = express.Router();

router.get("/client/events", getMonthEvents);
router.get("/client/events/:date", getDateDetails);
router.get("/client/gallery", getGallery);

export default router;
