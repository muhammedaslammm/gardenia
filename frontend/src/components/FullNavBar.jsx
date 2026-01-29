import { Link } from "react-router-dom";
import toSection from "../utils/toSection";
import getHeaderContent from "../utils/getHeaderContent";

const FullNavBar = ({ state, func }) => {
  const { headerContent } = getHeaderContent();
  return (
    <div
      className={`fixed left-0 top-0 w-full h-screen z-1000 ${
        state ? "translate-x-0" : "translate-x-full"
      } transition-all text-black bg-white backdrop-blur-[20px] `}
    >
      <nav className="w-[90%] mx-auto my-2 space-y-4">
        <div className="relative w-full">
          <Link href="/" onClick={func}>
            <img
              src="/logo/gardenia-logo.png"
              alt="gardenia logo"
              className="absolute left-0 top-0 w-[5rem] object-cover -translate-y-1"
            />
          </Link>

          <i
            className="absolute right-2 top-1 fa-solid fa-xmark text-[1.1rem]"
            onClick={func}
          ></i>
        </div>
        <ul
          style={{ fontFamily: "Inter Tight, serif" }}
          className="pt-13 text-[#0f592e]"
        >
          {headerContent.map((n) => {
            if (n.path.startsWith("/"))
              return (
                <li className="py-[.6rem] border-b border-neutral-300 last:border-b-0">
                  <Link
                    to={n.path}
                    className="text-[.9rem] font-medium uppercase tracking-[.1rem]"
                    onClick={() => func()}
                  >
                    {n.title}
                  </Link>
                </li>
              );
            return (
              <li
                className="text-[.9rem] font-medium py-[.6rem] uppercase tracking-[.1rem] border-b border-neutral-300"
                onClick={() => {
                  toSection(n.path);
                  func();
                }}
              >
                {n.title}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default FullNavBar;
