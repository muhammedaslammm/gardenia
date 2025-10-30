import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/", authenticate, createEvent);
router.put("/:eventid", authenticate, updateEvent);
router.get("/", getEvents);
router.delete("/:id", authenticate, deleteEvent);

export default router;
