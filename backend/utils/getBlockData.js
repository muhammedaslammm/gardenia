const getBlockData = (data) => {
  return {
    ...data,
    start_time: new Date(data.start_time),
    end_time: new Date(data.end_time),
  };
};

export default getBlockData;
