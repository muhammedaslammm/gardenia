import useEvents from "../hooks/useEvents";
import { weekDays } from "../data/days.js";
import {
  ArrowSquareRight,
  ArrowSquareLeft,
  Circle,
  Star,
  Clock,
  Bookmark,
  Calendar,
  Download,
} from "phosphor-react";
import EventDetails from "./EventDetails.jsx";
import CustomModal from "./CustomModal.jsx";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import ExcelDownload from "./eventUtils/ExcelDownload.jsx";

dayjs.extend(localeData);

const Events = () => {
  const {
    dates,
    date,
    selectedDate,
    month,
    handleDate,
    dateDetails,
    eventDelete,
    refetchData,
  } = useEvents();

  return (
    <section className="">
      <div className="flex flex-col lg:flex-row sm:gap-4">
        <div className="w-full pb-6 sm:pb-0 lg:w-8/12 space-y-2 sm:space-y-2">
          <div className="text-[.9rem]">Events</div>
          <div className="text-[1rem] font-medium flex justify-between items-end">
            <div className="text-[.9rem] sm:text-[1.2rem] font-semibold">
              {selectedDate.format("MMMM YYYY")}
            </div>
            <div className="flex gap-1">
              <ArrowSquareLeft
                className="w-4.5 sm:w-5 h-4.5 sm:h-5 cursor-pointer"
                weight="light"
                onClick={month.decrementMonth}
              />
              <ArrowSquareRight
                className="w-4.5 h-4.5 cursor-pointer"
                weight="light"
                onClick={month.incrementMonth}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div></div>
            <ExcelDownload />
          </div>
          <div className="grid grid-cols-7 gap-[.05rem]">
            {weekDays.map((day) => (
              <div className="text-[.65rem] sm:text-[.8rem] text-neutral-600 font-medium text-center py-[.2rem] bg-white border border-neutral-400">
                {day}
              </div>
            ))}
            {dates.map((d) => {
              let isToday = d.date.isSame(dayjs(), "day");
              let isSelected = selectedDate.isSame(d.date, "day");
              let isCurrentMonth = d.date.month() === selectedDate.month();
              let isPast = d.date.isBefore(dayjs, "day");
              let events = d.events;
              return (
                <div
                  className={`h-[3.5rem] sm:h-[5rem] border border-[#0f592e]/10  flex flex-col justify-between transition cursor-pointer p-1 ${
                    !isCurrentMonth
                      ? "opacity-15 bg-neutral-300"
                      : "bg-white border-neutral-400"
                  } ${events ? "bg-yellow-400/20" : ""} ${
                    isSelected
                      ? "border border-green-900/50 bg-green-900/5 shadow-inner"
                      : ""
                  } hover:border-green-900 hover:bg-green-900/10`}
                  onClick={() => handleDate(d)}
                >
                  <div className="text-[.7rem] sm:text-[.8rem] font-medium flex gap-2 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>{d.date.date()}</div>
                      {d.block && (
                        <Bookmark
                          weight="fill"
                          className="text-blue-800 w-[1rem] h-[1rem]"
                        />
                      )}
                    </div>

                    {isToday && (
                      <Star weight="fill" className="text-green-900" />
                    )}
                  </div>
                  {d.events !== 0 && (
                    <div className="text-[.8rem] text-green-800 font-medium self-end">{`${d.events} Booking`}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <EventDetails dateDetails={dateDetails} refetchData={refetchData} />
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
