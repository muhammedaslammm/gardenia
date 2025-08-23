import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/EventController.js";
import { adminAccess, authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/", authenticate, adminAccess, createEvent);
router.put("/:eventid", authenticate, adminAccess, updateEvent);
router.get("/", getEvents);
router.delete("/:id", authenticate, adminAccess, deleteEvent);

export default router;
