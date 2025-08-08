import { forwardRef } from "react";
import toSection from "../utils/toSection";
import { Link } from "react-router-dom";
import headerConfig from "../data/headerConfig";
import getHeaderContent from "../utils/getHeaderContent";

const AnimatedHeader = forwardRef((props, ref) => {
  const { currentPath, headerContent } = getHeaderContent();
  return (
    <header
      className="fixed left-0 top-0 w-full bg-[#e7ede4] border-t-1 border-b-1 border-[#c5d8cd] z-1000 -translate-y-full"
      ref={ref}
    >
      <nav className="text-white flex justify-between items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 md:px-2 mx-auto py-[.4rem]">
        <img
          className="w-[5rem] lg:h-[2.5rem] lg:w-[7rem] h-auto  object-contain -translate-y-[.1rem]"
          src="/logo/gardenia-logo.png"
          alt="gardenia logo"
        />
        <div className="md:hidden text-[#0f592e]">
          <i
            className="fa-solid fa-bars text-[1.1rem]"
            onClick={props.func}
          ></i>
        </div>

        <ul
          className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[.8rem] md:text-[.85rem] xl:text-[.9rem] text-[#0f592e] uppercase"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          {headerContent.map((n) => {
            if (n.path.startsWith("/"))
              return (
                <Link
                  className="cursor-pointer tracking-[.1rem] font-medium"
                  to={`${n.path}`}
                >
                  {n.title}
                </Link>
              );
            return (
              <li
                className="cursor-pointer tracking-[.1rem] font-medium"
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
