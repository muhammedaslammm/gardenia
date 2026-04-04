import Block from "../models/BlockModal.js";

const getDateUpdate = async (
  stage,
  start_time,
  end_time,
  date,
  blocks,
  mainhall_block_stat,
  minihall_block_stat,
) => {
  let obj = {
    mainhall_stat: 1,
    minihall_stat: 1,
    mainhall_block_stat,
    minihall_block_stat,
  };

  let noon = new Date(`${date}T12:00:00+05:30`);
  let afternoon = new Date(`${date}T16:00:00+05:30`);

  const intersecting__block = blocks.find(
    (block) =>
      start_time < new Date(block.end_time).getTime() + 2 * 1000 * 60 * 60 &&
      end_time > new Date(block.start_time).getTime() - 2 * 1000 * 60 * 60,
  );

  const getBlockStat = (main, mini, main_hall = false) => {
    if (intersecting__block || !blocks.length) {
      obj.mainhall_block_stat = main;
      obj.minihall_block_stat = mini;
    } else if (blocks[0]?.stage === "main_hall" && main_hall) {
      obj.mainhall_block_stat = main;
      obj.minihall_block_stat = mini;
    }
  };

  if (stage === "main_hall") {
    if (start_time <= noon && end_time <= afternoon) {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 3;
      getBlockStat(0, 3, true);
    } else if (start_time >= noon) {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 2;
      getBlockStat(0, 2, true);
    } else {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 0;
      getBlockStat(0, 0);
    }
  } else if (stage === "mini_hall") {
    if (start_time <= noon && end_time <= afternoon) {
      obj.mainhall_stat = 3;
      obj.minihall_stat = 3;
      getBlockStat(3, 3);
    } else if (start_time > noon) {
      obj.mainhall_stat = 2;
      obj.minihall_stat = 2;
      getBlockStat(2, 2);
    } else {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 0;
      getBlockStat(0, 0);
    }
  }

  if (
    intersecting__block ||
    (blocks[0]?.stage === "main_hall" && stage === "main_hall")
  )
    await Block.updateOne(
      { _id: blocks[0]._id },
      { $set: { status: "freeze" } },
    );

  return obj;
};

export default getDateUpdate;
