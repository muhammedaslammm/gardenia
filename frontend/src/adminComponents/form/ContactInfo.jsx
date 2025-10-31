const ContactInfo = () => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Contact Information</div>
      <div className="flex gap-4">
        
      </div>
      <div className="flex gap-4">
        <div className="w-[20rem]">
          <label htmlFor="">Booker Name</label>
          <input
            type="text"
            className="a--input"
            placeholder="Person booked the event"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="">Address</label>
          <input
            type="text"
            className="a--input"
            placeholder="Address of Booker"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="">Phone Number 1</label>
          <input
            type="tel"
            className="a--input"
            placeholder="Eg: Zami and Laya"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="">Phone Number 2</label>
          <input
            type="tel"
            className="a--input"
            placeholder="Person booked the event"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
