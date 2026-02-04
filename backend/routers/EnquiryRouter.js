import express from "express";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../controllers/EnquiryController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/enquiries", createEnquiry);
router.get("/enquiries", authenticate, getEnquiries);
router.patch("/enquiries/:id", authenticate, updateEnquiry);

export default router;
