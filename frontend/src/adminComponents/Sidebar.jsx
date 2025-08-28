import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useUser } from "../hooks/useUser";
import { Fingerprint } from "phosphor-react";

const Sidebar = ({ content, page_slug, stat }) => {
  const [selectedSlug, setSelectedSlug] = useState(page_slug);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useUser();
  return (
    <aside className="fixed left-0 bottom-0 w-full sm:top-0 sm:h-screen sm:w-[12rem] py-1.5 px-2 bg-[#081e10] flex flex-col justify-between font--inter-tight z-1000">
      <div>
        <div className="hidden sm:block pb-2 px-2 border-b border-neutral-600">
          <img
            src="/logo/gardenia-logo-2.png"
            alt="gardenia logo"
            className="w-[10rem] h-[3rem] object-cover -translate-x-[.4rem]"
          />
        </div>
        <div className="flex flex-col gap-1 pt-2">
          {content.map(({ icon: Icon, ...d }) => (
            <Link
              to={d?.path}
              className={`py-1 px-2 text-white font-medium hover:bg-[#0f592e]/60 transition rounded-[.1rem] ${
                selectedSlug === d?.slug ? "bg-[#0f592e]/70" : ""
              } flex items-center gap-2`}
              onClick={() => setSelectedSlug(d.slug)}
            >
              <Icon className="w-4 h-4" />
              {d?.sidebar_title}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden pt-4 border-t pl-0 border-neutral-600 sm:flex flex-col gap-2">
        <div className="text-[.9rem] text-neutral-300 font-semibold flex items-center gap-2">
          <Fingerprint weight="bold" className="w-4 h-4" />
          <span>{user.userName}</span>
        </div>
        <button
          className={`text-white font-semibold text-[.9rem] p-1.5 rounded-[.2rem] bg-[#081e10] ${
            stat === "loading"
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          } hover:bg-[#081e10]/80 transition hover:text-red-400`}
          onClick={handleLogout}
          title="Click button to logout"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
