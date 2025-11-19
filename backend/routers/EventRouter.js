import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", authenticate, createEvent);
router.put("/:eventid", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
