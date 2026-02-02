import { Spinner, X } from "phosphor-react";
import ModalLabel from "./ModalLabel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

const ExcelModal = ({ open }) => {
  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let start_date = watch("start_date");

  const submitForm = async ({ start_date, end_date, data_type }) => {
    try {
      setLoading(true);
      let response = await fetch(
        `${BACKEND_URL}/api/events/report/excel-${data_type}?start_date=${start_date}&end_date=${end_date}`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      setLoading(false);
      if (response.status === 404) {
        let result = await response.json();
        toast.warning(result.message);
        return;
      }
      if (!response.ok) throw new Error("Failed to download Excel");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        data_type === "events" ? "events-report.xlsx" : "payments-report.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[40rem] bg-white py-4 px-6 mb-[2rem] font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="text-[1.6rem] font-medium font--dm-serif-display">
          Generate and Download Excel Report
        </div>
        <X
          className="w-[1.3rem] h-[1.3rem] text-red-700 cursor-pointer"
          onClick={() => open(false)}
        />
      </div>
      <div className="space-y-6">
        <div>Select a date range and excel type below.</div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-1">
            <ModalLabel title="Report Type" error={errors.data_type} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="data_type"
                  id="events"
                  value="events"
                  {...register("data_type", { required: true })}
                />
                <label htmlFor="events">Events Details</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="data_type"
                  id="payments"
                  value="payments"
                  {...register("data_type", { required: true })}
                />
                <label htmlFor="payments">Payment Details</label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full space-y-1">
              <ModalLabel title="Start Date" error={errors.start_date} />
              <input
                type="date"
                className="modal--input w-full"
                {...register("start_date", {
                  required: "Start Date Required",
                })}
              />
            </div>
            <div className="w-full space-y-1">
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
            className={`bg-green-900 text-white font-semibold py-2 hover:bg-green-800 transition-colors ${
              loading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
            } mt-8`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                Generating Report{" "}
                <Spinner className="animate-spin w-[1.5rem] h-[1.5rem]" />
              </div>
            ) : (
              "Generate Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExcelModal;
