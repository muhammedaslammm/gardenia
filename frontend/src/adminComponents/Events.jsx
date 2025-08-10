import useEvents from "../hooks/useEvents";
import { weekDays } from "../data/days.js";
import { ArrowSquareRight, ArrowSquareLeft } from "phosphor-react";

const Events = () => {
  const { dates, selectedDate, dateString } = useEvents();
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
              />
              <ArrowSquareRight
                className="w-5 h-5 cursor-pointer"
                weight="light"
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
                className={`h-[5rem] border border-[#0f592e]/10  ${
                  d.isoDate === selectedDate?.isoDate
                    ? "bg-[#0f592e]/20"
                    : d.isMonth
                    ? "bg-[#0f592e]/5 hover:border-[#0f592e]/60"
                    : "opacity-30 border-[#0f592e]/10"
                } transition cursor-pointer  p-1`} //bg-[#0f592e]/10
              >
                <div className="text-[.8rem]">{d.day}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-4/12 flex flex-col justify-end">
          <div className="font-medium">Handle Event</div>
          <div className="border border-neutral-300 h-full mt-1 p-2">
            <p className="text-[.9rem] text-neutral-600 ">
              There is no event added on this date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
