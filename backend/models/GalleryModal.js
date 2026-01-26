import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    url: { type: String },
    public_id: { type: String },
  },
  { timestamps: true },
);

const Gallery = mongoose.model("gallery", Schema);

export default Gallery;
