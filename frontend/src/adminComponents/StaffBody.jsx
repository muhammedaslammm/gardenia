import { Spinner } from "phosphor-react";

const StaffBody = ({ users }) => {
  return (
    <section className="w-4/6 space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          Total Users :{" "}
          {!users ? (
            <Spinner className="w-[1.1rem] h-[1.1rem] animate-spin" />
          ) : (
            <span className="font-medium">{users.length}</span>
          )}
        </div>
        <select className="w-[10rem] bg-white border border-neutral-400 cursor-pointer outline-0 p-1 ml-auto">
          <option value="all">All</option>
          <option value="supervisor">Supervisor</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <div className="bg-white border border-neutral-400">
        <div className="grid grid-cols-4 border-b border-neutral-400">
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
          {users &&
            users.length >= 1 &&
            users.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-4 text-center py-2 odd:bg-neutral-200/60"
              >
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div className="capitalize">{user.role}</div>
                <div
                  className={`font-medium ${user.blocked ? "text-red-800" : "text-green-800"}`}
                >
                  {user.blocked ? "Blocked" : "Active"}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default StaffBody;
