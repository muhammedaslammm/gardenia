import { Link, useSearchParams } from "react-router-dom";
import { CaretRight, Spinner } from "phosphor-react";
import GeneralData from "./form/GeneralData";
import ContactInfo from "./form/ContactInfo";
import PaymentInfo from "./form/PaymentInfo";

import useEvents2 from "../hooks/useEvents2";
import dayjs from "dayjs";
import getEventMessage from "../utils/getEventMessage.js";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddCancelModal from "./modals/AddCancelModal.jsx";

const EventManagement = () => {
  const [searchParams] = useSearchParams();
  let eventId = searchParams.get("event");
  let [modal, setModal] = useState(false);

  let {
    dateInfo,
    reSchedule,
    register,
    watch,
    handleSubmit,
    submitEvent,
    errors,
    stat,
  } = useEvents2(eventId);

  let date_string = dayjs(searchParams.get("date")).format("Do MMMM, YYYY");
  let message = getEventMessage(
    dateInfo?.mainhall_stat,
    dateInfo?.minihall_stat,
    dateInfo?.events || []
  );

  let stage_stat = {
    main_hall: dateInfo?.mainhall_stat,
    mini_hall: dateInfo?.minihall_stat,
  };

  return (
    <main>
      <div className="text-[.9rem]">
        <Link to="/admin/events">Events</Link>
        <CaretRight className="inline-block w-4 h-4 mb-1 mx-1" />
        <span>Event Management</span>
      </div>
      <div className="mt-6 flex justify-between items-start">
        {/* title */}
        <div className="text-[1.4rem] font-medium">Create New Event</div>
        <div className="text-[1.2rem] font-medium">{date_string}</div>
      </div>
      {!eventId && (
        <div className="flex flex-col items-start gap-2 pt-4 pb-6 border-b border-neutral-400">
          {!dateInfo ? (
            <div className="animation--container w-[25rem] h-[2rem] !rounded-[0rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
          ) : (
            <div
              className="p-2 font-medium"
              style={{ color: message.color, backgroundColor: message.bg }}
            >
              {message.text}
            </div>
          )}

          {!reSchedule.cancelledEvents ? (
            <div className="animation--container w-[35rem] h-[3rem] !rounded-[0rem]">
              <div className="animation--mask animation--loading__effect"></div>
            </div>
          ) : reSchedule.cancelledEvents &&
            reSchedule.cancelledEvents.length > 0 &&
            !reSchedule.selected ? (
            <div className="w-[40rem] border border-neutral-300 p-2 ">
              Cancelled events with reschedule options are found. You may{" "}
              <span className="font-medium">
                link this event to one of the cancelled event if this event is a
                rescheduled one.
              </span>{" "}
              <button
                className="underline text-purple-700 cursor-pointer hover:text-purple-900 transition-colors"
                onClick={() => setModal(true)}
              >
                Link now
              </button>
            </div>
          ) : (
            <div className="p-2 bg-green-100 border border-neutral-400 w-full">
              <div className="font-medium mb-2">
                Selected Cancelled Event for Re-Scheduling
              </div>
              <div>
                Event's Booking Number :{" "}
                <span className="font-medium">
                  {reSchedule?.selected?.event.booking_number}
                </span>
              </div>
              <div>
                Event type :{" "}
                <span className="font-medium">
                  {reSchedule?.selected?.event.event}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  className="py-1 px-2 text-[.9rem] font-medium text-red-700 hover:underline cursor-pointer"
                  onClick={() => reSchedule.setSelected(null)}
                >
                  Cancel Selection
                </button>
                <button
                  className="py-1 px-2 text-[.9rem] font-medium hover:underline cursor-pointer"
                  onClick={() => setModal(true)}
                >
                  Change Selection
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <form
        className="flex flex-col gap-12 my-6"
        onSubmit={handleSubmit(submitEvent)}
      >
        <GeneralData
          stage_stat={stage_stat}
          register={register}
          errors={errors}
          watch={watch}
        />
        <ContactInfo register={register} errors={errors} />
        {!eventId && (
          <PaymentInfo
            register={register}
            errors={errors}
            id={eventId}
            watch={watch}
          />
        )}

        <button
          className="w-1/6 self-end py-2 px-2 bg-green-800 text-white font-medium cursor-pointer "
          type="submit"
        >
          {stat === "loading" ? (
            <div className="flex items-center justify-center gap-2">
              <div>{eventId ? "Updating" : "Creating"}</div>
              <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
            </div>
          ) : (
            <div>{eventId ? "Update Event" : "Create Event"}</div>
          )}
        </button>
      </form>
      {modal &&
        reSchedule.cancelledEvents &&
        reSchedule.cancelledEvents.length &&
        createPortal(
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <AddCancelModal open={setModal} reSchedule={reSchedule} />
          </div>,
          document.getElementById("modal--event")
        )}
    </main>
  );
};

export default EventManagement;
