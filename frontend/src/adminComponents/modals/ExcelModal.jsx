import { X } from "phosphor-react";
import ModalLabel from "./ModalLabel";
import { useForm } from "react-hook-form";

const ExcelModal = ({ open }) => {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let start_date = watch("start_date");

  const submitForm = async ({ start_date, end_date }) => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/events-dates/export?start_date=${start_date}&end_date=${end_date}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[40rem] bg-white py-4 px-6 mb-[2rem] font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="text-[1.6rem] font-medium font--dm-serif-display">
          Download Event Data
        </div>
        <X
          className="w-[1.3rem] h-[1.3rem] text-red-700 cursor-pointer"
          onClick={() => open(false)}
        />
      </div>
      <div className="space-y-4">
        <div>
          Select a date range below to generate an Excel report of the event
          details.
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex gap-4">
            <div className="w-full">
              <ModalLabel title="Start Date" error={errors.start_date} />
              <input
                type="date"
                className="modal--input w-full"
                {...register("start_date", {
                  required: "Start Date Required",
                })}
              />
            </div>
            <div className="w-full">
              <ModalLabel title="End Date" error={errors.end_date} />
              <input
                type="date"
                className="modal--input w-full"
                {...register("end_date", {
                  required: "End Date Required",
                  validate: (end_date) =>
                    !start_date ||
                    new Date(end_date) >= new Date(start_date) ||
                    "Invalid Date",
                })}
              />
            </div>
          </div>
          <button
            className="bg-green-900 text-white font-semibold py-2 cursor-pointer hover:bg-green-800 transition-colors"
            type="submit"
          >
            Generate Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExcelModal;
