import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/EventController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", authenticate, createEvent);
router.patch("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
