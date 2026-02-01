const getData = (client_data, staff) => {
  let {
    date,
    booking_number,
    stage,
    event,
    event_name,
    start_time,
    end_time,
    booker_name,
    address,
    phone_number_1,
    phone_number_2,
    total_amount,
    payment_type,
    payment_mode,
    paid_amount,
  } = client_data;

  let event_data = {
    booking_number,
    date,
    stage,
    event,
    start_time: new Date(start_time),
    end_time: new Date(end_time),
    event_name,
    contact_details: {
      booker_name,
      address,
      phone_number_1,
      phone_number_2,
    },
    payment: {
      total_amount,
      payment_timeline: [
        {
          payment_type,
          paid_amount,
          payment_mode,
          timeline: [{ username: staff.username }],
        },
      ],
      payment_settled: payment_type === "full",
      remaining_amount: total_amount - paid_amount,
      timeline: [{ username: staff.username }],
    },
    timeline: [{ username: staff.username, date: new Date() }],
  };

  return event_data;
};

export default getData;
