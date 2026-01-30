import dayjs from "dayjs";
import { weekDays } from "../data/days";
import {
  CalendarCheck,
  CaretLeft,
  CaretRight,
  Spinner,
  Star,
} from "phosphor-react";
import CalendarFilter from "./CalendarFilter";

const CalendarGrid = ({ util, loading }) => {
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
    <div className="w-full md:w-4/6 space-y-4 lg:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <div className="flex items-center justify-between md:justify-start font--inter-tight font-medium text-[.9rem] lg:text-[1.3rem]">
          <div className="md:hidden">
            <CaretLeft
              className="w-[1rem] h-[1rem] cursor-pointer"
              weight="bold"
              onClick={decrementMonth}
            />
          </div>
          <div>{selectedDate.format("dddd, Do MMMM, YYYY")}</div>
          <div className="md:hidden">
            <CaretRight
              className="w-[1rem] h-[1rem] cursor-pointer"
              weight="bold"
              onClick={incrementMonth}
            />
          </div>
        </div>
        <div className="flex justify-between items-end font--inter-tight">
          <CalendarFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className="hidden md:flex gap-4">
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

      <div className="space-y-1.5 md:space-y-2">
        <div className="grid grid-cols-7 gap-[2px] md:gap-1">
          {weekDays.map((d) => (
            <div className="border-0 text-center font--inter-tight font-medium tracking-[.1rem] text-[.5rem] md:text-[.9rem] uppercase">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px] md:gap-1">
          {dates.map((d) => {
            let isToday = d.date.isSame(dayjs(), "day");
            let isSelected = d.date.isSame(selectedDate, "day");
            let isCurrentMonth = d.date.month() === selectedDate.month();
            return (
              <div
                className={`font--inter-tight h-[3.5rem] md:h-[5rem] p-1 border border-neutral-400/80 md:border-neutral-500 cursor-pointer ${
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
                    <div className="text-[.6rem] md:text-[.9rem] font-medium">
                      {d.date.date()}
                    </div>
                    {isToday && (
                      <CalendarCheck className="text-green-800" weight="fill" />
                    )}
                  </div>
                  {loading ? (
                    <Spinner className="self-end animate-spin" />
                  ) : (
                    <div>
                      {d.blocks !== 0 && (
                        <div className="text-[.4rem] md:text-[.75rem] text-blue-800 bg-blue-100 px-[2px] md:px-1 leading-[.5rem] font-medium self-end">
                          {`${d.blocks} Event Holded`}
                        </div>
                      )}
                      {d.events !== 0 && (
                        <div className="text-[.4rem] md:text-[.75rem] text-green-800 bg-green-100 px-[2px] md:px-1 leading-[.5rem] font-medium self-end">
                          {`${d.events} Function`}
                        </div>
                      )}
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
