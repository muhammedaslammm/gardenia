import express from "express";
import {
  addImages,
  deleteImage,
  getImages,
} from "../controllers/GalleryController.js";
import { authenticate } from "../middlewares/authentication.js";
import multer from "multer";

const router = express.Router();

router.get("/admin/gallery", authenticate, getImages);
router.post(
  "/admin/gallery",
  multer({ storage: multer.memoryStorage() }).array("image"),
  authenticate,
  addImages,
);

router.delete("/admin/gallery/:id", authenticate, deleteImage);
export default router;
