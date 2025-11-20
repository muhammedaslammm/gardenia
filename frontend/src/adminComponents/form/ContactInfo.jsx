import InputLabel from "../InputLabel";

const ContactInfo = ({ register, errors }) => {
  return (
    <section className="space-y-2">
      <div className="font-medium text-start">Contact Information</div>
      <div className="flex gap-4"></div>
      <div className="flex gap-4">
        <div className="w-[20rem]">
          <InputLabel title="Booker Name" error={errors.booker_name} />
          <input
            type="text"
            className={`a--input`}
            placeholder="Person booked the event"
            name="booker_name"
            {...register("booker_name", { required: true })}
          />
        </div>
        <div className="flex-1">
          <InputLabel title="Address" error={errors.address} />
          <input
            type="text"
            className={`a--input`}
            placeholder="Address of Booker"
            name="address"
            {...register("address", { required: true })}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <InputLabel title="Phone Number 1" error={errors.phone_number_1} />
          <input
            type="tel"
            className={`a--input`}
            placeholder="+91 "
            name="phone_number_1"
            {...register("phone_number_1", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/,
              },
            })}
          />
        </div>
        <div className="w-1/2">
          <InputLabel title="Phone Number 2" error={errors.phone_number_2} />
          <input
            type="tel"
            className={`a--input`}
            placeholder="+91"
            name="phone_number_2"
            {...register("phone_number_2", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/,
              },
            })}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
