import express from "express";
import {
  blockDate,
  exportReport,
  getDateBookings,
  getDates,
} from "../controllers/EventDateController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/event-dates", getDates);
router.get("/events-dates/export", exportReport);
router.get("/events-dates/:date", getDateBookings);
router.post("/event-dates/block", authenticate, blockDate);

export default router;
