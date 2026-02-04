import express from "express";
import {
  addPayment,
  cancelEvent,
  createCharges,
  createEvent,
  deleteEvent,
  getCancelledEvents,
  getCharges,
  getEvent,
  getEventCancelData,
  getEvents,
  getEventsExcel,
  getPaymentsExcel,
  getSearch,
  getSourceDetail,
  updateEvent,
} from "../controllers/EventController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/events/report/excel-events", authenticate, getEventsExcel);
router.post("/events/report/excel-payments", authenticate, getPaymentsExcel);

router.get("/events", authenticate, getEvents);
router.get("/events/search", authenticate, getSearch);
router.get("/events/cancel", authenticate, getCancelledEvents);
router.get("/events/:id", authenticate, getEvent);
router.post("/events", authenticate, createEvent);
router.patch("/events/:id", authenticate, updateEvent);
router.delete("/events/:id", authenticate, deleteEvent);

router.post("/events/:id/payments", authenticate, addPayment);

router.post("/events/:id/add-ons", authenticate, createCharges);
router.get("/events/:id/add-ons", authenticate, getCharges);

router.patch("/events/:id/cancel", authenticate, cancelEvent);
router.get("/events/:id/cancel", getEventCancelData);
router.get(
  "/events/:reScheduledEventId/source-detail",
  authenticate,
  getSourceDetail,
);

export default router;
