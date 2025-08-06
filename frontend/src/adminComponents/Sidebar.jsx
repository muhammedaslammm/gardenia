import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useUser } from "../hooks/useUser";

const Sidebar = ({ content, page_slug }) => {
  const [selectedSlug, setSelectedSlug] = useState(page_slug);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useUser();
  return (
    <aside className="fixed left-0 top-0 h-screen w-[12rem] py-4 px-2 bg-[#081e10]/95 flex flex-col justify-between font--inter-tight  ">
      <div>
        <div className="pb-2 px-2 border-b border-neutral-600">
          <div className="text-[1.2rem] text-white">Gardenia</div>
        </div>
        <div className="flex flex-col gap-1 pt-2">
          {content.map((d) => (
            <Link
              to={d?.path}
              className={`py-1 px-2 text-white font-medium hover:bg-[#0f592e]/60 transition rounded-[.1rem] ${
                selectedSlug === d?.slug ? "bg-[#0f592e]/70" : ""
              }`}
              onClick={() => setSelectedSlug(d.slug)}
            >
              {d?.sidebar_title}
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t pl-2 border-neutral-600 flex flex-col gap-2">
        <div className="text-[.9rem] text-center  text-neutral-300 font-semibold">
          {user.userName}
        </div>
        <button
          className="text-white font-semibold text-[.9rem] p-1.5 rounded-[.2rem] bg-[#081e10] cursor-pointer hover:bg-[#081e10]/80 transition"
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
