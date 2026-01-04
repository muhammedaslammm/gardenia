import dayjs from "dayjs";

const Filter = ({ selectedDate, setselectedDate }) => {
  let months = dayjs.months();
  let currentYear = selectedDate.year();
  let years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  console.log("current yeareeeeeee:", currentYear);
  return (
    <div className="flex gap-2">
      <select
        value={selectedDate.month()}
        onChange={(e) =>
          setselectedDate((p) => p.month(Number(e.target.value)))
        }
        className="py-1 px-2 bg-white outline-none border border-neutral-400"
      >
        {months.map((m, i) => (
          <option value={i} key={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={selectedDate.year()}
        className="py-1 px-2 bg-white outline-none border border-neutral-400"
        onChange={(e) => setselectedDate((p) => p.year(Number(e.target.value)))}
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

export default Filter;
