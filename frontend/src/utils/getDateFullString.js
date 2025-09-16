const getFullDateString = (date) => {
  let newDate = new Date(date);
  return `${String(newDate.getDate()).padStart(2, "0")}/${String(
    newDate.getMonth() + 1
  ).padStart(2, "0")}/${newDate.getFullYear()}`;
};

export default getFullDateString;
