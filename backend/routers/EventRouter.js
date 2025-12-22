import express from "express";
import {
  addPayment,
  cancelEvent,
  createCharges,
  createEvent,
  deleteEvent,
  getCharges,
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

router.post("/events/:id/add-ons", authenticate, createCharges);
router.get("/events/:id/add-ons", authenticate, getCharges);

router.patch("/events/:id/cancel", authenticate, cancelEvent);

export default router;
