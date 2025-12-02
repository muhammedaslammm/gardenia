import express from "express";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../controllers/EnquiryController.js";

const router = express.Router();

router.post("/enquiries", createEnquiry);
router.get("/enquiries", getEnquiries);
router.patch("/enquiries/:id", updateEnquiry);

export default router;
