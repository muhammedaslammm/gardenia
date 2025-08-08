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
      } left-0 w-full top-0 z-500`}
      ref={containerRef}
    >
      <nav
        className={`flex justify-center sm:justify-between items-center md:items-baseline xl:items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 mx-auto ${
          currentPath === "home" ? "py-[1rem]" : "py-[.4rem]"
        }`}
      >
        <Link
          className="hidden sm:block logo font-bold text-[1.3rem] sm:text-[1.4rem] xl:text-[1.8rem]"
          style={{ fontFamily: "Playfair Display, serif" }}
          to={"/home"}
        >
          {currentPath === "home" ? (
            "gardenia"
          ) : (
            <img
              src="/logo/gardenia-logo.png"
              alt="gardenia logo"
              className="w-[5rem] lg:h-[2.5rem] lg:w-[7rem] h-auto  object-contain -translate-y-[.1rem]"
            />
          )}
        </Link>
        <div className="md:hidden" onClick={func}>
          <i className="fa-solid fa-bars text-[1.1rem] sm:text-[1.2rem]"></i>
        </div>

        <ul
          className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[.8rem] md:text-[.85rem]  xl:text-[.9rem] font-medium uppercase"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          {headerContent.map((n) => {
            if (n.path.startsWith("/")) {
              return (
                <Link to={`${n.path}`} className="tracking-[.1rem]">
                  {n.title}
                </Link>
              );
            } else {
              return (
                <li
                  className="cursor-pointer tracking-[.1rem]"
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
