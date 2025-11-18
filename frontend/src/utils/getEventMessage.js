const getEventMessage = (mainhall_stat, minihall_stat) => {
  console.log(
    "mainhall_stat:",
    mainhall_stat,
    " minihall_stat:",
    minihall_stat
  );
  let message = { text: "", color: "#C79A00", bg: "#fef9c2" };
  if (!mainhall_stat && !minihall_stat) {
    message.text = "Stage Unavailable : No Stage is available for booking";
    message.color = "#9f0712";
    message.bg = "#ffe2e2";
  } else if (mainhall_stat === 1 && minihall_stat === 1) {
    message.text = "Main Hall and Mini Hall are available for booking";
    message.color = "#016630";
    message.bg = "#dcfce7";
  } else if (!mainhall_stat && minihall_stat === 3) {
    message.text = "Mini Hall available only after {}";
  } else if (!mainhall_stat && minihall_stat === 2) {
    message.text = "Mini Hall available only before {}";
  } else if (mainhall_stat === 2 && minihall_stat === 2) {
    message.text = "Main Hall and Mini Hall available only before {}";
  } else if (mainhall_stat === 3 && minihall_stat === 3) {
    message.text = "Main Hall and Mini Hall available only after {}";
  }

  return message;
};

export default getEventMessage;
