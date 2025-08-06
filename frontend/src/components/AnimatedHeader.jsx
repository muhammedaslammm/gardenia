import { forwardRef } from "react";
import toSection from "../utils/toSection";
import { Link } from "react-router-dom";
import headerConfig from "../data/headerConfig";
import getHeaderContent from "../utils/getHeaderContent";

const AnimatedHeader = forwardRef((props, ref) => {
  const { currentPath, headerContent } = getHeaderContent();
  return (
    <header
      className="fixed left-0 top-0 w-full bg-[#e7ede4] border-t-1 border-b-1 border-[#c5d8cd] z-200 -translate-y-full"
      ref={ref}
    >
      <nav className="text-white flex justify-between items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 md:px-2 mx-auto py-[.3rem]">
        <div
          className="logo text-[#0f592e] font-bold text-[1.3rem] xl:text-[1.8rem]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Gardenia
        </div>
        <div className="md:hidden text-[#0f592e]">
          <i
            className="fa-solid fa-bars text-[1.1rem]"
            onClick={props.func}
          ></i>
        </div>

        <ul
          className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-10 text-[.8rem] md:text-[.85rem] xl:text-[.9rem] text-[#0f592e] uppercase"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          {headerContent.map((n) => {
            if (n.path.startsWith("/"))
              return (
                <Link
                  className="cursor-pointer tracking-[.1rem] font-semibold"
                  to={`${n.path}`}
                >
                  {n.title}
                </Link>
              );
            return (
              <li
                className="cursor-pointer tracking-[.1rem] font-semibold"
                onClick={() => toSection(n.path)}
              >
                {n.title}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
});

export default AnimatedHeader;
