const getEventDate = (dateObject) => {
  let { date, start_time, end_time } = dateObject;
  const new_date = new Date(date);
  let iso_date = `${new_date.getFullYear()}-${String(
    new_date.getMonth() + 1
  ).padStart(2, "0")}-${String(new_date.getDate()).padStart(2, "0")}`;
  return {
    date,
    iso_date,
    start_time,
    end_time,
  };
};

export default getEventDate;
