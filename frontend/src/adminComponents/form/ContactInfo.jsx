const ContactInfo = ({ data, change }) => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Contact Information</div>
      <div className="flex gap-4"></div>
      <div className="flex gap-4">
        <div className="w-[20rem]">
          <label htmlFor="">Booker Name</label>
          <input
            type="text"
            className="a--input"
            placeholder="Person booked the event"
            name="booker_name"
            value={data.booker_name}
            onChange={change}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="">Address</label>
          <input
            type="text"
            className="a--input"
            placeholder="Address of Booker"
            name="address"
            value={data.address}
            onChange={change}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="">Phone Number 1</label>
          <input
            type="tel"
            className="a--input"
            placeholder="+91 "
            name="phone_number_1"
            value={data.phone_number_1}
            onChange={change}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="">Phone Number 2</label>
          <input
            type="tel"
            className="a--input"
            placeholder="+91"
            name="phone_number_2"
            value={data.phone_number_2}
            onChange={change}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
