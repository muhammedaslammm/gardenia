import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    folder_name: String,
    images: [{ public_id: String, url: String }],
    order: Number,
  },
  { timestamps: true },
);

const Gallery = mongoose.model("gallery", Schema);

export default Gallery;
