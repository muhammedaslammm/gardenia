const getDateString = (date) => {
  return Object.entries(date).reduce((date_obj, [key, obj]) => {
    let new_date = new Date(obj.date);
    let iso_date = `${new_date.getFullYear()}-${String(
      new_date.getMonth() + 1
    ).padStart(2, "0")}-${String(new_date.getDate()).padStart(2, "0")}`;
    date_obj[key] = { date: new_date, iso_date, time: obj.time };
    return date_obj;
  }, {});
};

export default getDateString;
