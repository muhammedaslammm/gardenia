import { Spinner, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import getBlockModalMessage from "../../utils/getBlockModalMessage";
import dayjs from "dayjs";
import ModalLabel from "./ModalLabel";
import { toast } from "sonner";
import { useState } from "react";
import ButtonLoading from "./ButtonLoading";

const BlockModal = ({ setModal, dateDetails, refetchData }) => {
  const [loading, setLoading] = useState(false);
  let { block_stat = 1, events = [], date } = dateDetails;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let element = getBlockModalMessage(block_stat, events);
  date = dayjs(date).format("YYYY-MM-DD");
  let start_time = watch("start_time");

  const formSubmit = async (values) => {
    try {
      setLoading(true);
      values.start_time = dayjs(
        `${date} ${values.start_time}`,
        "YYYY-MM-DD HH:mm",
      ).format();
      values.end_time = dayjs(`${date} ${values.end_time}`, "YYYY-MM-DD HH:mm");
      let response = await fetch(`${BACKEND_URL}/api/admin/block`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...values, date }),
      });
      let result = await response.json();
      setLoading(false);
      if (!response.ok) throw new Error(result.message);
      // setModal(false);
      toast.success(result.message);
      // refetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative w-[40rem] bg-white space-y-4 mb-[2rem] p-4 font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="font--dm-serif-display font-medium text-[1.6rem]">
          Block day for an Event
        </div>
        <div onClick={() => setModal(false)} className="cursor-pointer">
          <X className="w-[1.3rem] h-[1.3rem] text-red-700" weight="bold" />
        </div>
      </div>
      <div className="space-y-2">
        {element}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex items-center gap-4">
            <div className="w-full space-y-1">
              <ModalLabel title="Stage" error={errors.stage} />
              <select
                className="a--input cursor-pointer"
                {...register("stage", { required: true })}
              >
                <option value="" disabled selected>
                  Select Stage
                </option>
                <option value="main_hall">Main Hall</option>
                <option value="mini_hall">Mini Hall</option>
              </select>
            </div>
            <div className="w-full space-y-1">
              <ModalLabel
                title="Requester Name"
                error={errors.requester_name}
              />
              <input
                type="text"
                className="a--input"
                {...register("requester_name", { required: true })}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full space-y-1">
              <ModalLabel title="Start Time" error={errors.start_time} />
              <input
                type="time"
                className="a--input"
                {...register("start_time", { required: true })}
              />
            </div>
            <div className="w-full space-y-1">
              <ModalLabel title="End Time" error={errors.end_time} />
              <input
                type="time"
                className="a--input"
                {...register("end_time", {
                  required: true,
                  validate: (v) => !start_time || v > start_time,
                })}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full space-y-1">
              <ModalLabel
                title="Phone Number 1"
                error={errors.phone_number_1}
              />
              <input
                type="number"
                className="a--input"
                {...register("phone_number_1", {
                  required: true,
                  pattern: { value: /^[0-9]{10}$/ },
                })}
              />
            </div>
            <div className="w-full space-y-1">
              <ModalLabel
                title="Phone Number 2"
                error={errors.phone_number_2}
              />
              <input
                type="number"
                className="a--input"
                {...register("phone_number_2", {
                  required: true,
                  pattern: { value: /^[0-9]{10}$/ },
                })}
              />
            </div>
          </div>

          <button
            className={`a--input bg-black text-white mt-4 ${
              loading ? "cursor-not-allowed hover:opacity-80" : "cursor-pointer"
            } transition-colors`}
            type="submit"
          >
            {loading ? <ButtonLoading /> : "Add Block"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlockModal;
