import express from "express";
import {
  addPayment,
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/EventController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/events", getEvents);
router.get("/events/:id", getEvent);
router.post("/events", authenticate, createEvent);
router.patch("/events/:id", authenticate, updateEvent);
router.delete("/events/:id", authenticate, deleteEvent);

router.post("/events/:id/payments", authenticate, addPayment);

export default router;
