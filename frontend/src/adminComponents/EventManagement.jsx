import { Link, useSearchParams } from "react-router-dom";
import { CaretRight } from "phosphor-react";
import GeneralData from "./form/GeneralData";
import ContactInfo from "./form/ContactInfo";
import PaymentInfo from "./form/PaymentInfo";

import useEvents2 from "../hooks/useEvents2";
import dayjs from "dayjs";

const EventManagement = () => {
  let { handleInputField, generalData, contactData, paymentData, submitEvent } =
    useEvents2();

  const [searchParams] = useSearchParams();
  let date = dayjs(searchParams.get("date"));
  let date_string = date.format("Do MMMM, YYYY");

  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Management</span>
      </div>
      <div className="mt-6 flex justify-between items-end">
        {/* title */}
        <div className="text-[1.4rem] font-medium">Create New Event</div>
        <div className="text-[1.2rem] font-medium">{date_string}</div>
      </div>
      <form action="" className="flex flex-col gap-12 my-8">
        <GeneralData data={generalData} change={handleInputField} />
        <ContactInfo data={contactData} change={handleInputField} />
        <PaymentInfo data={paymentData} change={handleInputField} />
        <button
          className="w-1/6 self-end py-2 px-2 bg-green-800 text-white font-medium"
          onClick={(event) => submitEvent(event, date)}
        >
          Create Event
        </button>
      </form>
    </main>
  );
};

export default EventManagement;
