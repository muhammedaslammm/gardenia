import Gallery from "../models/gallery.model.js";

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

export const deleteFolder = async (req, res) => {
  let id = req.body?._id || req.params?.id;

  if (!id) {
    return res.status(400).json({ message: "Folder deletion failed. Missing folder id" });
  }

  try {
    let folder = await Gallery.findById(id).select("_id");
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    await Gallery.findByIdAndDelete(id);
    return res.status(200).json({ message: "Folder Successfully Deleted" });
  } catch (error) {
    console.log("Folder deletion error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
