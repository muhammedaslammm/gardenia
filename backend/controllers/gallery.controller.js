import { PassThrough } from "stream";
import mongoose from "mongoose";
import Gallery from "../models/gallery.model.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (file, folder_name) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `gardenia/${folder_name}`,
        transformation: [
          { width: 1400, height: 1400, crop: "limit" },
          { quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      },
    );

    const bufferStream = new PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(stream);
  });
};

export const createFolder = async (req, res) => {
  let { folder_name } = req.body;
  if (!folder_name?.trim())
    return res
      .status(400)
      .json({ message: "Folder creation failed. Missing group name" });

  try {
    let group = await Gallery.findOne({ folder_name }).select("_id");
    if (group)
      return res
        .status(409)
        .json({ message: "Folder creation failed due to duplicate name" });

    await Gallery.create({ folder_name });
    return res.json({ message: "Folder successfully created" });
  } catch (error) {
    console.log("Folder creation failed :", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addImages = async (req, res) => {
  const folderId = req.params.id;
  const uploadedFiles = req.files || [];

  if (!folderId) {
    return res
      .status(400)
      .json({ message: "Image upload failed. Missing folder id" });
  }

  if (!uploadedFiles.length) {
    return res
      .status(400)
      .json({ message: "Image upload failed. No files provided" });
  }

  try {
    const folder = await Gallery.findById(folderId).select("_id folder_name");
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const uploadedImages = await Promise.all(
      uploadedFiles.map((file) => uploadToCloudinary(file, folder.folder_name)),
    );

    await Gallery.findByIdAndUpdate(folderId, {
      $push: { images: { $each: uploadedImages } },
    });

    return res
      .status(200)
      .json({ message: "Images uploaded successfully ----" });
  } catch (error) {
    console.log("Image upload failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImages = async (req, res) => {
  const { folderId, imageId } = req.params;

  if (!folderId || !imageId) {
    return res.status(400).json({
      message: "Image deletion failed. Missing folder or image id",
    });
  }

  try {
    const folder = await Gallery.findById(folderId).select("_id images");
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const imageToDelete = folder.images?.find(
      (image) => image._id.toString() === imageId,
    );

    if (!imageToDelete) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (imageToDelete.public_id) {
      const cloudinaryResult = await cloudinary.uploader.destroy(
        imageToDelete.public_id,
      );

      if (
        cloudinaryResult.result !== "ok" &&
        cloudinaryResult.result !== "not_found"
      ) {
        throw new Error("Cloudinary image deletion failed");
      }
    }

    const imageObjectId = mongoose.Types.ObjectId.isValid(imageId)
      ? new mongoose.Types.ObjectId(imageId)
      : imageId;

    await Gallery.findByIdAndUpdate(folderId, {
      $pull: { images: { _id: imageObjectId } },
    });

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log("failed to delete image(s):", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    let folders = await Gallery.aggregate([
      { $project: { folder_name: 1, count: { $size: "$images" } } },
    ]);
    return res.json({ folders });
  } catch (error) {
    console.log("Folder fetch failed :", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getFolderDetails = async (req, res) => {
  try {
    let folder = await Gallery.findOne({ _id: req.params.id }).select(
      "-updatedAt -__v -images.url",
    );
    return res.status(200).json(folder);
  } catch (error) {
    console.log("failed to fetch folder details:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  let id = req.body?._id || req.params?.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Folder deletion failed. Missing folder id" });
  }

  try {
    let folder = await Gallery.findById(id).select("_id folder_name images");
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const publicIds = folder.images
      ?.filter((image) => image.public_id)
      .map((image) => image.public_id);

    if (publicIds?.length) {
      const deleteResults = await Promise.all(
        publicIds.map((public_id) => cloudinary.uploader.destroy(public_id)),
      );

      const failedDeletes = deleteResults.filter(
        ({ result }) => result !== "ok" && result !== "not_found",
      );

      if (failedDeletes.length) {
        console.log("Cloudinary cleanup failed for folder:", id, failedDeletes);
        throw new Error("Failed to remove one or more images from Cloudinary");
      }
    }

    if (folder.folder_name) {
      const folderPath = `gardenia/${folder.folder_name}`;
      try {
        const folderDeleteResult =
          await cloudinary.api.delete_folder(folderPath);
        if (
          folderDeleteResult.result !== "ok" &&
          folderDeleteResult.result !== "not_found"
        ) {
          console.log(
            "Cloudinary folder deletion failed:",
            folderPath,
            folderDeleteResult,
          );
        }
      } catch (err) {
        console.log("Cloudinary folder delete error:", err.message || err);
      }
    }

    await Gallery.findByIdAndDelete(id);
    return res.status(200).json({ message: "Folder Successfully Deleted" });
  } catch (error) {
    console.log("Folder deletion error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
