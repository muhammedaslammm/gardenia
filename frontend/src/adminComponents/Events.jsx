import useEvents from "../hooks/useEvents";
import { weekDays } from "../data/days.js";
import { ArrowSquareRight, ArrowSquareLeft } from "phosphor-react";
import EventDetails from "./EventDetails.jsx";
import CustomModal from "./CustomModal.jsx";

const Events = () => {
  const {
    dates,
    currentDate,
    month,
    dateString,
    handleDate,
    dateDetails,
    eventFormData,
    eventDelete,
  } = useEvents();

  const eventUtils = { dateDetails, eventFormData, eventDelete };
  return (
    <section className="">
      <div className="flex gap-4">
        <div className="w-8/12 space-y-1">
          <div className="text-[1rem] font-medium flex justify-between items-end">
            <div>{dateString}</div>
            <div className="flex gap-1">
              <ArrowSquareLeft
                className="w-5 h-5 cursor-pointer"
                weight="light"
                onClick={month.decrementMonth}
              />
              <ArrowSquareRight
                className="w-5 h-5 cursor-pointer"
                weight="light"
                onClick={month.incrementMonth}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {weekDays.map((day) => (
              <div className="text-[.8rem] text-neutral-600 font-medium text-center py-[.2rem] border border-[#0f592e]/10">
                {day}
              </div>
            ))}
            {dates.map((d) => (
              <div
                className={`h-[5rem] border border-[#0f592e]/10 bg-[#0f592e]/15 flex flex-col justify-between ${
                  d.isToday
                    ? "bg-[#0f592e]/80 text-white"
                    : d.iso_date === dateDetails?.iso_date
                    ? "border-[#0f592e]/80 bg-[#0f592e]/25"
                    : d.isMonth
                    ? "border-[#0f592e]/25 hover:border-[#0f592e]/80"
                    : "opacity-55 border-[#0f592e]/10"
                } active:bg-[#0f592e]/30 transition cursor-pointer p-1`} //bg-[#0f592e]/10
                onClick={() => handleDate(d)}
              >
                <div className="text-[.8rem]">{d.day}</div>
                {d.events.length > 0 && (
                  <div
                    className={`text-[.8rem] ${
                      d.isToday ? "text-white" : "text-[#0f592e]"
                    } font-medium self-end`}
                  >{`${d.events.length} ${
                    d.events.length > 1 ? "bookings" : "booking"
                  }`}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <EventDetails utils={eventUtils} />
      </div>
      {eventDelete.modal && (
        <CustomModal
          stat={eventDelete.modalButtonStat}
          cancelModal={eventDelete.cancelModal}
          deleteEvent={eventDelete.deleteEvent}
          event={eventDelete.deleteData}
        />
      )}
    </section>
  );
};

export default Events;
