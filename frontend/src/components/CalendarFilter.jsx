import dayjs from "dayjs";

const CalendarFilter = ({ selectedDate, setSelectedDate }) => {
  let months = dayjs.months();
  let years = Array.from({ length: 10 }, (_, i) => selectedDate.year() - 5 + i);
  return (
    <div className="flex gap-2 w-[30rem]">
      <select
        value={selectedDate.month()}
        onChange={(e) =>
          setSelectedDate((p) => p.month(Number(e.target.value)))
        }
        className="w-full bg-white text-[.6rem] md:text-[1rem] p-1 md:p-1.5 border border-neutral-400/80 md:border-neutral-500 outline-none cursor-pointer"
      >
        {months.map((m, i) => (
          <option value={i}>{m}</option>
        ))}
      </select>
      <select
        value={selectedDate.year()}
        onChange={(e) => setSelectedDate((p) => p.year(e.target.value))}
        className="w-full bg-white text-[.6rem] md:text-[1rem] p-1 md:p-1.5 border border-neutral-400/80 md:border-neutral-500 outline-none cursor-pointer"
      >
        {years.map((y) => (
          <option value={y} key={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarFilter;
