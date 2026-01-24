import EventDate from "../models/DateModel.js";

const handleDayEvent = async (date, stage, start_time, end_time) => {
  let ERROR_MESSAGE = (message = null) => {
    if (message)
      return `Event Creation Failed : ${message} is not available on this date`;
    return "Event Creation Failed : Given event time is overlapping an existing event time";
  };
  try {
    let event_date = (
      await EventDate.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(`${date}T00:00:00.000Z`),
              $lte: new Date(`${date}T23:59:59.000Z`),
            },
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "events",
            foreignField: "_id",
            as: "events",
          },
        },
        {
          $lookup: {
            from: "blocks",
            localField: "blocks",
            foreignField: "_id",
            as: "blocks",
          },
        },
      ])
    )[0];

    let day_stat = {
      mainhall_stat: event_date?.mainhall_stat ?? 1,
      minihall_stat: event_date?.minihall_stat ?? 1,
      mainhall_block_stat: event_date?.mainhall_block_stat ?? 1,
      minihall_block_stat: event_date?.minihall_block_stat ?? 1,
      events: event_date?.events.length ? event_date?.events : [],
      blocks: event_date?.blocks.length ? event_date?.blocks : [],
    };
    console.log("day stat:", day_stat);

    let intersecting_blocks = day_stat.blocks.filter(
      (item) =>
        start_time <= new Date(item.end_time).getTime() + 2 * 1000 * 60 * 60 &&
        end_time >= new Date(item.start_time).getTime() - 2 * 1000 * 60 * 60,
    );

    const setBlockStat = (main, mini) => {
      if (
        intersecting_blocks.length > 1 ||
        (intersecting_blocks.length && day_stat.blocks.length === 1) ||
        !day_stat.blocks.length
      ) {
        day_stat.mainhall_block_stat = main;
        day_stat.minihall_block_stat = mini;
      } else if (
        (intersecting_blocks.length && day_stat.blocks.length > 1) ||
        (!intersecting_blocks.length && day_stat.blocks.length)
      ) {
        day_stat.mainhall_block_stat = 0;
        day_stat.minihall_block_stat = 0;
      }
    };

    if (stage === "main_hall") {
      switch (day_stat.mainhall_stat) {
        case 0:
          return {
            message: ERROR_MESSAGE("Main Hall"),
          };
        case 1:
          if (
            start_time <= new Date(`${date}T12:00:00+05:30`) &&
            end_time <= new Date(`${date}T16:00:00+05:30`)
          ) {
            day_stat.mainhall_stat = 0;
            day_stat.minihall_stat = 3;
            setBlockStat(0, 3);
          } else if (start_time >= new Date(`${date}T12:00:00+05:30`)) {
            day_stat.mainhall_stat = 0;
            day_stat.minihall_stat = 2;
            setBlockStat(0, 2);
          } else {
            day_stat.mainhall_stat = 0;
            day_stat.minihall_stat = 0;
            day_stat.mainhall_block_stat = 0;
            day_stat.minihall_block_stat = 0;
          }
          return day_stat;
        case 2:
          let intersecting_events_1 = event_date?.events.find(
            (ev) =>
              end_time >=
              new Date(ev.start_time).getTime() - 2 * 60 * 60 * 1000,
          );
          if (intersecting_events_1)
            return {
              message: ERROR_MESSAGE(),
            };
          day_stat.mainhall_stat = 0;
          day_stat.minihall_stat = 0;
          day_stat.mainhall_block_stat = 0;
          day_stat.minihall_block_stat = 0;
          return day_stat;
        case 3:
          let intersecting_events_2 = event_date.events.find(
            (ev) =>
              start_time <=
              new Date(ev.end_time).getTime() + 2 * 60 * 60 * 1000,
          );
          if (intersecting_events_2) return { message: ERROR_MESSAGE() };
          day_stat.mainhall_stat = 0;
          day_stat.minihall_stat = 0;
          day_stat.mainhall_block_stat = 0;
          day_stat.minihall_block_stat = 0;
          return day_stat;
        default:
          return {
            message: "Event Creation Failed : Something went wrong",
          };
      }
    } else if (stage === "mini_hall") {
      switch (day_stat.minihall_stat) {
        case 0:
          return { message: ERROR_MESSAGE("Mini Hall") };
        case 1:
          if (
            start_time < new Date(`${date}T12:00:00+05:30`) &&
            end_time <= new Date(`${date}T16:00:00+05:30`)
          ) {
            day_stat.mainhall_stat = 3;
            day_stat.minihall_stat = 3;
            setBlockStat(3, 3);
          } else if (start_time >= new Date(`${date}T12:00:00+05:30`)) {
            day_stat.minihall_stat = 2;
            day_stat.mainhall_stat = 2;
            setBlockStat(2, 2);
          } else {
            day_stat.minihall_stat = 0;
            day_stat.mainhall_stat = 0;
            day_stat.mainhall_block_stat = 0;
            day_stat.minihall_block_stat = 0;
          }
          return day_stat;
        case 2:
          let intersecting_time_1 = day_stat.events.find(
            (ev) =>
              end_time >=
              new Date(ev.start_time).getTime() - 2 * 60 * 60 * 1000,
          );
          if (intersecting_time_1) return { message: ERROR_MESSAGE() };
          day_stat.minihall_stat = 0;
          day_stat.mainhall_stat = 0;
          day_stat.mainhall_block_stat = 0;
          day_stat.minihall_block_stat = 0;
          return day_stat;
        case 3:
          let intersecting_time_2 = day_stat.events.find(
            (ev) =>
              start_time <=
              new Date(ev.end_time).getTime() + 2 * 60 * 60 * 1000,
          );
          if (intersecting_time_2) return { message: ERROR_MESSAGE() };
          day_stat.minihall_stat = 0;
          day_stat.mainhall_stat = 0;
          day_stat.mainhall_block_stat = 0;
          day_stat.minihall_block_stat = 0;
          return day_stat;
        default:
          return { message: "Event Creation Failed : Something went wrong" };
      }
    } else
      return {
        message:
          "Event Creation Failed : The given event space is not available",
      };
  } catch (error) {
    console.log("event handling error:", error.message);
    return { message: "Event Creation Failed : Something went wrong" };
  }
};
export default handleDayEvent;
