const convertTo12hour = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const time_format = hours >= 12 ? "pm" : "am";
  let new_hour = String(hours % 12 || 12).padStart(2, "0");
  let new_minutes = String(minutes).padStart(2, "0");

  return `${new_hour}:${new_minutes} ${time_format}`;
};

export default convertTo12hour;
