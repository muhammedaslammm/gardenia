import { Link } from "react-router-dom";
import toSection from "../utils/toSection";
import getHeaderContent from "../utils/getHeaderContent";

const FullNavBar = ({ state, func }) => {
  const { headerContent } = getHeaderContent();
  return (
    <div
      className={`fixed left-0 top-0 w-full h-screen z-300 ${
        state ? "translate-x-0" : "translate-x-full"
      } transition-all text-black bg-white backdrop-blur-[20px] `}
    >
      <nav className="w-[90%] mx-auto my-2 space-y-4">
        <div className="flex justify-between items-center ">
          <div
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-[1.3rem] font-semibold"
          >
            Gardenia
          </div>
          <i className="fa-solid fa-xmark text-[1.1rem]" onClick={func}></i>
        </div>
        <ul style={{ fontFamily: "Inter Tight, serif" }}>
          {headerContent.map((n) => {
            if (n.path.startsWith("/"))
              return (
                <li className="py-[.5rem]">
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
                className="text-[.9rem] font-medium py-[.5rem] uppercase tracking-[.1rem]"
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
