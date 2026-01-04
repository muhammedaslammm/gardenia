import dayjs from "dayjs";
import { weekDays } from "../data/days";
import { CalendarCheck, CaretLeft, CaretRight, Star } from "phosphor-react";
import CalendarFilter from "./CalendarFilter";

const CalendarGrid = ({ util }) => {
  let {
    dates,
    selectedDate,
    setSelectedDate,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
  } = util;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex gap-2 items-center font--inter-tight font-medium text-[1.3rem]">
          <div>{selectedDate.format("dddd,")}</div>
          <div>{selectedDate.format("Do MMMM, YYYY")}</div>
        </div>
        <div className="flex justify-between items-end font--inter-tight">
          <CalendarFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className="flex gap-4">
            <CaretLeft
              className="w-[1rem] h-[1rem] cursor-pointer"
              weight="bold"
              onClick={decrementMonth}
            />
            <CaretRight
              className="w-[1rem] h-[1rem] cursor-pointer"
              weight="bold"
              onClick={incrementMonth}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d) => (
            <div className="border-0 text-center font--inter-tight font-medium tracking-[.1rem] text-[.9rem] uppercase">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dates.map((d) => {
            let isToday = d.date.isSame(dayjs(), "day");
            let isSelected = d.date.isSame(selectedDate, "day");
            let isCurrentMonth = d.date.month() === selectedDate.month();
            let events = d.events;
            return (
              <div
                className={`font--inter-tight h-[5rem]  p-1 border border-neutral-500 cursor-pointer ${
                  !isCurrentMonth && "opacity-50 bg-neutral-300"
                } ${
                  isSelected && "border-2 border-green-700"
                } hover:border-2 border-green-600`}
              >
                <div
                  className="flex flex-col justify-between h-full"
                  onClick={() => selectDate(d)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[.9rem] font-medium">
                      {d.date.date()}
                    </div>
                    {isToday && (
                      <CalendarCheck className="text-green-800" weight="fill" />
                    )}
                  </div>
                  {d.block && (
                    <div className="text-[.75rem] text-blue-700 font-semibold self-end">
                      Event Holded
                    </div>
                  )}
                  {events !== 0 && (
                    <div className="text-[.75rem] text-green-900 font-semibold self-end">
                      Function Day
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
