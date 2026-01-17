import getBlockStat from "../utils/getBlockStat.js";

export const createBlock = async (req, res) => {
  try {
    console.log("block data:", req.body);
    let stat = getBlockStat();
    return res.json({ message: "cooking" });
  } catch (error) {
    console.log("block creation failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
