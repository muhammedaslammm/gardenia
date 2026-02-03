import { Spinner } from "phosphor-react";
import StaffCard from "./StaffCard";

const StaffBody = ({ users, open, refetch }) => {
  return (
    <section className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          Total Users :{" "}
          {!users ? (
            <Spinner className="w-[1.1rem] h-[1.1rem] animate-spin" />
          ) : (
            <span className="font-medium">{users.length}</span>
          )}
        </div>
        <button
          className="font-semibold text-green-700 cursor-pointer hover:underline"
          onClick={() => open(true)}
        >
          Add New Staff
        </button>
      </div>
      <div className="bg-white border border-neutral-400">
        <div className="grid grid-cols-6 border-b border-neutral-400">
          {["Created Date", "User", "Email", "Role", "Status", "Action"].map(
            (item, i) => (
              <div key={i} className="text-center py-1">
                {item}
              </div>
            ),
          )}
        </div>
        <div className="h-[30rem]">
          {users === null && (
            <div className="flex justify-center items-center h-full">
              <div className="flex items-center gap-2 mb-[10rem]">
                User data loading{" "}
                <Spinner className="w-[1.3rem] h-[1.3rem] animate-spin" />
              </div>
            </div>
          )}
          {users && users.length === 0 && (
            <div className="py-1 text-center pt-[8rem]">
              Couldn't find any staffs. Add a new staff now.
            </div>
          )}
          {users &&
            users.length >= 1 &&
            users.map((user, i) => (
              <StaffCard user={user} key={i} refetch={refetch} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default StaffBody;
