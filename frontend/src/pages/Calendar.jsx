import { Toaster } from "sonner";
import useCalendar from "../hooks/useCalendar";
import CalendarForm from "../components/CalendarForm";
import CalendarGrid from "../components/CalendarGrid";
import { useState } from "react";
import { createPortal } from "react-dom";

const Calendar = () => {
  const [box, setBox] = useState(false);
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
  } = useCalendar(setBox);
  let grid_util = {
    dates,
    selectedDate,
    setSelectedDate,
    incrementMonth,
    decrementMonth,
    selectDate,
    daysInMonth,
  };
  let form_util = { dateDetails, selectedDate, form };

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="min-h-[50vh] w-[93%] lg:w-[80rem] mx-auto pt-[4.5rem] lg:pt-[6.2rem] flex flex-col md:flex-row gap-8">
        <CalendarGrid util={grid_util} loading={dateLoading} />
        <div className="hidden lg:block w-2/6 pattern--calendar"></div>

        {box &&
          createPortal(
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-600">
              <CalendarForm
                util={form_util}
                details_loading={dateDetailsLoding}
                open={setBox}
              />
            </div>,
            document.getElementById("modal--calendar"),
          )}
      </main>
    </>
  );
};

export default Calendar;
