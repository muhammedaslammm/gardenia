import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../controllers/AdminController.js";
import { authenticate, adminAccess } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/jobs", authenticate, adminAccess, createJob);
router.get("/jobs", getJobs);
router.put("/jobs/:id", authenticate, adminAccess, updateJob);
router.delete("/jobs/:id", authenticate, adminAccess, deleteJob);

export default router;
