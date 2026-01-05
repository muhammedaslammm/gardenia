import express from "express";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../controllers/AdminController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/", authenticate, createJob);
router.get("/", getJobs);
router.put("/:id", authenticate, updateJob);
router.delete("/:id", authenticate, deleteJob);

export default router;
