import { Fingerprint } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useUser } from "../hooks/useUser";

const AdminHeader = ({ stat }) => {
  const { user } = useContext(AuthContext);
  const { handleLogout } = useUser();
  return (
    <header className="sm:hidden fixed left-0 top-0 w-full flex justify-between items-center z-1000 bg-[#081e10]">
      <div className="block pb-2 px-2 sm:border-b border-neutral-600">
        <img
          src="/logo/gardenia-logo-2.png"
          alt="gardenia logo"
          className="w-[7rem] h-[2rem] sm:w-[10rem] sm:h-[3rem] object-cover -translate-x-[1rem] sm:-translate-x-[.4rem]"
        />
      </div>
      <div className="sm:pt-4 sm:border-t pl-0 border-neutral-600 flex flex-col gap-2">
        <div className="hidden text-[.9rem] text-neutral-300 font-semibold sm:flex items-center gap-2">
          <Fingerprint weight="bold" className="w-4 h-4" />
          <span>{user.userName}</span>
        </div>
        <button
          className={`text-white font-medium sm:font-semibold text-[.8rem] sm:text-[.9rem] p-1.5 rounded-[.2rem] bg-[#081e10] ${
            stat === "loading"
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          } hover:bg-[#081e10]/80 px-2 active:text-white/50 sm:px-0 transition hover:text-red-400`}
          onClick={handleLogout}
          title="Click button to logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
