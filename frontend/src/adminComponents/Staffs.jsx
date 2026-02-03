import { createPortal } from "react-dom";
import useUsers from "../hooks/useUsers.js";
import StaffBody from "./StaffBody.jsx";
import { useState } from "react";
import StaffModal from "./modals/StaffModal.jsx";

const Staffs = () => {
  const { users, refetch } = useUsers();
  const [box, setBox] = useState(false);

  return (
    <main className="space-y-2">
      <h1>Staffs</h1>
      <div className="flex gap-4 text-[.9rem]">
        <StaffBody users={users} open={setBox} refetch={refetch} />
      </div>
      {box &&
        createPortal(
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <StaffModal refetch={refetch} open={setBox} />
          </div>,
          document.getElementById("modal--staff"),
        )}
    </main>
  );
};

export default Staffs;
