import express from "express";
import { getDates } from "../controllers/dateController.js";
const router = express.Router();

router.get("/", getDates);

export default router;
