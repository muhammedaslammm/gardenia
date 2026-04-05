import express from "express";
import { createBlock, deleteBlock } from "../controllers/BlockController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/admin/block", authenticate, createBlock);
router.delete("/admin/block/:id", authenticate, deleteBlock);

export default router;
