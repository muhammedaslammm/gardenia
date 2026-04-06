import dayjs from "dayjs";
import { Trash } from "phosphor-react";
import { toast } from "sonner";

const Block = ({
  id,
  name,
  stage,
  start,
  end,
  refetch,
  fetchEvents,
  close,
}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const deleteBlock = async () => {
    try {
      let res = await fetch(`${BACKEND_URL}/api/admin/block/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      fetchEvents();
      refetch();
      close();
    } catch (err) {
      toast.error("Something Went Wrong");
      console.log(err.message);
    }
  };
  return (
    <div className="bg-[#dbfeee] text-blue-900 flex justify-between items-center gap-1 p-4 italic">
      <div>
        Client <span className="font-medium">{name}</span> has blocked the{" "}
        <span className="font-medium capitalize">
          {stage.replace("_", " ")}
        </span>{" "}
        on this date from{" "}
        <span className="font-medium">{dayjs(start).format("hh:mm a")}</span> to{" "}
        <span className="font-medium">{dayjs(end).format("hh:mm a")}</span>.
        Proceed only after verification.
      </div>
      <Trash
        className="w-[2.5rem] h-[2.5rem] hover:text-red-700 cursor-pointer"
        weight="regular"
        onClick={deleteBlock}
      />
    </div>
  );
};

export default Block;
