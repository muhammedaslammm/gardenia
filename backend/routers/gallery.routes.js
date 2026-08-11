import express from "express";
import multer from "multer";
import {
  addImages,
  createFolder,
  deleteFolder,
  deleteImages,
  getFolderDetails,
  getFolders,
} from "../controllers/gallery.controller.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Only image files are allowed"));
  },
});

router.post("/gallery-folders", createFolder);
router.patch("/gallery-folders/:id/images", upload.array("file"), addImages);
router.get("/gallery-folders", getFolders);
router.get("/gallery-folders/:id", getFolderDetails);
router.delete("/gallery-folders/:id", deleteFolder);
router.delete("/gallery-folders/:folderId/images/:imageId", deleteImages);

export default router;
