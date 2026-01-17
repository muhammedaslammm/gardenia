import getBlockData from "../utils/getBlockData.js";
import getBlockStat from "../utils/getBlockStat.js";

export const createBlock = async (req, res) => {
  try {
    let { date, stage } = req.body;
    let { start_time, end_time, ...rest } = getBlockData(req.body);
    let stat = await getBlockStat(date, stage, start_time, end_time);

    console.log("stat result:", stat);

    return res.json({ message: "cooking" });
  } catch (error) {
    console.log("block creation failed:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
