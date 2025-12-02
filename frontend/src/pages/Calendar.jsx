import { Toaster } from "sonner";
import useCalendar from "../hooks/useCalendar";
import CalendarForm from "../components/CalendarForm";
import CalendarGrid from "../components/CalendarGrid";

const Calendar = () => {
  let {
    dates,
    selectedDate,
    dateDetails,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
    form,
  } = useCalendar();
  let grid_util = {
    dates,
    selectedDate,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
  };
  let form_util = { dateDetails, form };
  return (
    <main className="min-h-[50vh] w-[80rem] mx-auto pt-[7rem] flex gap-8">
      <Toaster position="top-center" richColors />
      <CalendarGrid util={grid_util} />
      <CalendarForm util={form_util} />
    </main>
  );
};

export default Calendar;
