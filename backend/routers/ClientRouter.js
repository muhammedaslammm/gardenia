import express from "express";
import {
  getDateDetails,
  getMonthEvents,
} from "../controllers/ClientEventsController.js";

const router = express.Router();

router.get("/events", getMonthEvents);
router.get("/events/:date", getDateDetails);

export default router;
