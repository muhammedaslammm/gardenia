import useEvents from "../hooks/useEvents";
import { weekDays } from "../data/days.js";
import { CalendarCheck, CaretRight, CaretLeft, Spinner } from "phosphor-react";
import EventDetails from "./EventDetails.jsx";
import CustomModal from "./CustomModal.jsx";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import ExcelDownload from "./eventUtils/ExcelDownload.jsx";
import Filter from "./eventUtils/Filter.jsx";
import EventSearch from "./eventUtils/EventSearch.jsx";

dayjs.extend(localeData);

const Events = () => {
  const {
    dates,
    datesLoading,
    detailsLoading,
    date,
    selectedDate,
    setselectedDate,
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
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-start gap-2">
              <Filter
                selectedDate={selectedDate}
                setselectedDate={setselectedDate}
              />
              <EventSearch />
            </div>
            <div className="flex gap-4">
              <CaretLeft
                className="w-4.5 sm:w-[1rem] h-4.5 sm:h-[1rem] cursor-pointer"
                weight="bold"
                onClick={month.decrementMonth}
              />
              <CaretRight
                className="w-[1rem] h-[1rem] cursor-pointer"
                weight="bold"
                onClick={month.incrementMonth}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-[.1rem]">
            {weekDays.map((day) => (
              <div className="text-[.65rem] sm:text-[.8rem] text-neutral-600 font-medium text-center py-[.2rem] bg-white border border-neutral-400">
                {day}
              </div>
            ))}
            {dates.map((d) => {
              let isToday = d.date.isSame(dayjs(), "day");
              let isSelected = selectedDate.isSame(d.date, "day");
              let isCurrentMonth = d.date.month() === selectedDate.month();
              let isPast = d.date.isBefore(dayjs(), "day");
              return (
                <div
                  className={`h-[3.5rem] sm:h-[5rem] border border-[#0f592e]/10  flex flex-col justify-between transition cursor-pointer p-1 ${
                    !isCurrentMonth
                      ? "opacity-80 bg-neutral-300"
                      : isSelected
                      ? "border border-gray-900 bg-green-900/20"
                      : "bg-white border-neutral-400"
                  }   hover:border-green-900 hover:bg-green-900/20`}
                  onClick={() => handleDate(d)}
                >
                  <div className="text-[.7rem] sm:text-[.8rem] font-medium flex gap-2 items-center justify-between">
                    <div>{d.date.date()}</div>

                    {isToday && (
                      <CalendarCheck weight="fill" className="text-green-900" />
                    )}
                  </div>

                  {datesLoading ? (
                    <Spinner className="self-end animate-spin" />
                  ) : (
                    <div>
                      {d.events !== 0 && (
                        <div className="text-[.75rem] text-green-800 bg-green-100 px-1 font-medium self-end">{`${d.events} Booking`}</div>
                      )}
                      {d.block && (
                        <div className="text-[.75rem] text-blue-800 bg-blue-100 px-1 font-medium self-end">
                          Event Holded
                        </div>
                      )}
                      {d.cancelled !== 0 && (
                        <div className="text-[.75rem] text-red-800 bg-red-100 px-1 font-medium self-end">
                          {`${d.cancelled} Cancellation`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <EventDetails
          dateDetails={dateDetails}
          refetchData={refetchData}
          loading={detailsLoading}
        />
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
