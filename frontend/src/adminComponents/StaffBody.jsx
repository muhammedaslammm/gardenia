import { Spinner } from "phosphor-react";

const StaffBody = ({ users }) => {
  return (
    <section className="w-4/6 space-y-2">
      <div className="flex justify-between items-center">
        <select className="w-[20rem] bg-white border border-neutral-400 cursor-pointer outline-0 p-1">
          <option value="all">All</option>
          <option value="supervisor">Supervisor</option>
          <option value="staff">Staff</option>
        </select>
        <button className="bg-black text-white font-medium py-1 px-4">
          Create Staff
        </button>
      </div>
      <div className="bg-white border border-neutral-300">
        <div className="grid grid-cols-4 border-b border-neutral-300">
          {["User", "Email", "Role", "Active"].map((item, i) => (
            <div key={i} className="text-center py-1">
              {item}
            </div>
          ))}
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
        </div>
      </div>
    </section>
  );
};

export default StaffBody;
