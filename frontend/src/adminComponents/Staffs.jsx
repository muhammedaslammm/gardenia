import { Spinner } from "phosphor-react";
import useUsers from "../hooks/useUsers.js";
import StaffBody from "./StaffBody.jsx";
import StaffForm from "./StaffForm.jsx";

const Staffs = () => {
  const { users } = useUsers();
  return (
    <main className="space-y-4">
      <h1>Staffs</h1>
      <div className="flex gap-4 text-[.9rem]">
        <StaffBody users={users} />
        <StaffForm />
      </div>
    </main>
  );
};

export default Staffs;
