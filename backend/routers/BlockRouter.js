import express from "express";
import { createBlock } from "../controllers/BlockController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/admin/block", authenticate, createBlock);

export default router;
