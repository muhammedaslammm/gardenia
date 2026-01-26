import Gallery from "../models/GalleryModal.js";
import cloudinary from "../config/cloudinary.js";

export const getImages = async (req, res) => {
  try {
    let images = await Gallery.find().select("url _id");
    let count = await Gallery.countDocuments();
    return res.json({ images, count });
  } catch (error) {
    console.log("failed to fetch gallery images.", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res
        .status(400)
        .json({ message: "Image upload failed : cannot upload empty file" });

    let cloud_obj = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "gallery" },
              (err, result) => {
                if (err) reject(err);
                else
                  resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });
              },
            );
            stream.end(file.buffer);
          }),
      ),
    );
    await Promise.all(cloud_obj.map((obj) => Gallery.create(obj)));
    console.log("Images uploaded!");
    return res.json({ message: "Successfull : Gallery images uploaded" });
  } catch (error) {
    console.log("failed to upload gallery images.", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    let doc = await Gallery.findOneAndDelete({ _id: req.params.id });
    await cloudinary.uploader.destroy(doc.public_id);
    return res.json({ message: "Image Deleted" });
  } catch (error) {
    console.log("failed to delete image.", error.message);
    return res.status(500).json({ message: error.message });
  }
};
