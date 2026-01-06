import { Toaster } from "sonner";
import useCalendar from "../hooks/useCalendar";
import CalendarForm from "../components/CalendarForm";
import CalendarGrid from "../components/CalendarGrid";

const Calendar = () => {
  let {
    dates,
    dateLoading,
    dateDetailsLoding,
    selectedDate,
    setSelectedDate,
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
    setSelectedDate,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
  };
  let form_util = { dateDetails, form };
  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="min-h-[50vh] w-[80rem] mx-auto pt-[6.2rem] flex gap-8">
        <CalendarGrid util={grid_util} loading={dateLoading} />
        <CalendarForm util={form_util} details_loading={dateDetailsLoding} />
      </main>
    </>
  );
};

export default Calendar;
