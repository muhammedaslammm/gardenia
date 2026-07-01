import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/gallery.controller.js";

const router = express.Router();

router.post("/gallery-folders", createFolder);
router.get("/gallery-folders", getFolders);
router.delete("/gallery-folders/:id", deleteFolder);

export default router;
