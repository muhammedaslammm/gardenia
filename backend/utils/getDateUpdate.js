const getDateUpdate = (stage, start_time, end_time, date) => {
  let obj = { mainhall_stat: 1, minihall_stat: 1 };

  let noon = new Date(`${date}T12:00:00+05:30`);
  let forteen = new Date(`${date}T14:00:00+05:30`);
  let sixteen = new Date(`${date}T16:00:00+05:30`);

  if (stage === "main_hall") {
    if (start_time <= noon && end_time <= sixteen) {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 3;
    } else if (start_time >= noon) {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 2;
    } else {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 0;
    }
  } else if (stage === "mini_hall") {
    if (start_time <= noon && end_time <= forteen) {
      obj.mainhall_stat = 3;
      obj.minihall_stat = 3;
    } else if (start_time > noon) {
      obj.mainhall_stat = 2;
      obj.minihall_stat = 2;
    } else {
      obj.mainhall_stat = 0;
      obj.minihall_stat = 0;
    }
  }
  return obj;
};

export default getDateUpdate;
