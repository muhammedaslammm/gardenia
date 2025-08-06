const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB").format(date);
};

export default formatDate;
