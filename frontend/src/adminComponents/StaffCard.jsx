import dayjs from "dayjs";
import { DotsThree, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const StaffCard = ({ user, refetch }) => {
  let [option, setOption] = useState(false);
  let optionRef = useRef(null);
  let [blockLoading, setBlockLoading] = useState(false);
  let [deleteLoading, setDeleteLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleClickEvent = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickEvent);
  }, []);

  const updateBlock = async () => {
    try {
      setBlockLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: user.role }),
        credentials: "include",
      });
      setBlockLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setOption(false);
      refetch();
    } catch (error) {
      console.log("failed to handle user block:", error.message);
      toast.error("Failed : User block failed to handle");
    }
  };

  const deleteUser = async () => {
    try {
      if (deleteLoading) return;
      setDeleteLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: user.role }),
      });
      setDeleteLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setOption(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed : User deletion failed");
    }
  };

  const block_button_text = user.block ? "Unblock User" : "Block User";
  return (
    <div
      key={user._id}
      className="grid grid-cols-6 text-center py-2 odd:bg-neutral-200/60  transition-colors"
    >
      <div>{dayjs(user.createdAt).format("DD-MM-YYYY")}</div>
      <div className="">{user.username}</div>
      <div className="">{user.email}</div>
      <div className="capitalize">{user.role}</div>
      <div
        className={`font-medium ${user.blocked ? "text-red-800" : "text-green-800"}`}
      >
        {user.blocked ? "Blocked" : "Active"}
      </div>
      <div className="relative flex justify-center items-center">
        <DotsThree
          weight="bold"
          className="w-[1.3rem] h-[1.3rem] cursor-pointer"
          onClick={() => setOption(true)}
        />

        {option && (
          <div
            className="absolute top-full left-0 bg-white shadow-xl text-[.8rem] flex flex-col z-100"
            ref={optionRef}
          >
            <button
              className={` py-2 px-4 border-b border-neutral-200 hover:bg-neutral-100 transition-colors ${(deleteLoading || blockLoading) && "cursor-not-allowed opacity-70"}`}
              disabled={deleteLoading || blockLoading}
              onClick={updateBlock}
            >
              {blockLoading ? (
                <div className="flex items-center gap-1">
                  Updating{" "}
                  <Spinner className="w-[1rem] h-[1rem] animate-spin" />
                </div>
              ) : (
                block_button_text
              )}
            </button>
            <button
              className={` py-2 px-4 text-red-700 hover:bg-neutral-100 transition-colors ${deleteLoading && "cursor-not-allowed opacity-70"}`}
              onClick={deleteUser}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <div className="flex items-center gap-1">
                  Deleteing{" "}
                  <Spinner className="w-[1rem] h-[1rem] animate-spin" />
                </div>
              ) : (
                " Delete User"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffCard;
