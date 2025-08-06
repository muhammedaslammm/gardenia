import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useLayoutEffect, useRef } from "react";
import toSection from "../utils/toSection";
import navigation from "../data/navigation";
import { Link, useLocation } from "react-router-dom";
import getHeaderContent from "../utils/getHeaderContent";

const Header = ({ func }) => {
  const containerRef = useRef();
  const { currentPath, headerContent } = getHeaderContent();

  return (
    <header
      className={`${
        currentPath === "home"
          ? "absolute text-white"
          : "fixed bg-[#e7ede4] text-[#0f592e] border-b border-[#e2ece5] "
      } left-0 w-full top-0 z-20`}
      ref={containerRef}
    >
      <nav
        className={`flex justify-between items-center md:items-baseline xl:items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 mx-auto ${
          currentPath === "home" ? "py-[1rem]" : "py-[.3rem]"
        }`}
      >
        <Link
          className="logo font-bold text-[1.3rem] sm:text-[1.4rem] xl:text-[1.8rem]"
          style={{ fontFamily: "Playfair Display, serif" }}
          to={"/home"}
        >
          Gardenia
        </Link>
        <div className="md:hidden" onClick={func}>
          <i className="fa-solid fa-bars text-[1.1rem] sm:text-[1.2rem]"></i>
        </div>

        <ul
          className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-12 text-[.8rem] md:text-[.85rem]  xl:text-[.9rem] font-semibold uppercase"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          {headerContent.map((n) => {
            if (n.path.startsWith("/")) {
              return (
                <Link to={`${n.path}`} className="">
                  {n.title}
                </Link>
              );
            } else {
              return (
                <li
                  className="cursor-pointer"
                  onClick={() => toSection(n.path)}
                >
                  {n.title}
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
