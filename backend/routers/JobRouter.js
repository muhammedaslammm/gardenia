import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../controllers/AdminController.js";
import { authenticate, adminAccess } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/", authenticate, adminAccess, createJob);
router.get("/", getJobs);
router.put("/:id", authenticate, adminAccess, updateJob);
router.delete("/:id", authenticate, adminAccess, deleteJob);

export default router;
