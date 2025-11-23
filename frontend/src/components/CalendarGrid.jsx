import dayjs from "dayjs";
import { weekDays } from "../data/days";
import { CaretLeft, CaretRight, Star } from "phosphor-react";

const CalendarGrid = ({ util }) => {
  let { dates, selectedDate, incrementMonth, decrementMonth, selectDate } =
    util;
  return (
    <div className="w-full space-y-4">
      <div>
        <div className="flex justify-between items-center">
          <div className="font--dm-serif-display text-[1.5rem]">
            {dayjs(selectedDate).format("MMMM YYYY")}
          </div>
          <div className="flex gap-2">
            <CaretLeft
              className="w-[1.2rem] h-[1.2rem] cursor-pointer"
              onClick={decrementMonth}
            />
            <CaretRight
              className="w-[1.2rem] h-[1.2rem] cursor-pointer"
              onClick={incrementMonth}
            />
          </div>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((d) => (
          <div className="border-b text-center font--inter-tight text-[.9rem]">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dates.map((d) => {
          let isToday = d.date.isSame(dayjs(), "day");
          let isSelected = d.date.isSame(selectedDate, "day");
          let isCurrentMonth = d.date.month() === selectedDate.month();
          let isFunction = d.events.length > 0;
          return (
            <div
              className={`font--inter-tight h-[5rem]  p-1 border border-neutral-500 cursor-pointer ${
                !isCurrentMonth && "opacity-25"
              } ${isSelected && "border-2 border-orange-700"} ${
                isFunction && "bg-yellow-400/20"
              }  `}
            >
              <div
                className="flex flex-col justify-between h-full"
                onClick={() => selectDate(d)}
              >
                <div className="flex items-center justify-between">
                  {d.date.date()}{" "}
                  {isToday && <Star className="text-green-800" weight="fill" />}
                </div>

                <div className="self-end text-[.8rem] text-green-900 font-medium">
                  {isFunction && "Function Day"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
