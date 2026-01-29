import toSection from "../utils/toSection";
import { Link } from "react-router-dom";
import getHeaderContent from "../utils/getHeaderContent";
import { Phone } from "phosphor-react";

const Header = ({ func }) => {
  const { currentPath, headerContent } = getHeaderContent();

  return (
    <header
      className={`${
        currentPath === "home"
          ? "absolute text-white/70 lg:text-white"
          : "fixed h-[3rem] lg:h-auto bg-[#fefefe] text-[#0f592e] border-b border-neutral-400 "
      } left-0 w-full top-0 z-500`}
    >
      <nav
        className={`relative lg:static flex justify-center sm:justify-between sm:items-center md:items-center xl:items-center w-[95%] sm:w-[90%] lg:h-[4rem] xl:w-[85%] px-1 mx-auto`}
      >
        <div
          className={`absolute ${
            currentPath === "home" ? "top-4" : "top-3"
          } left-4 md:left-10 lg:hidden`}
          onClick={func}
        >
          <i className="fa-solid fa-bars text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem]"></i>
        </div>
        <Link
          className={`absolute lg:static top-4 lg:top-0 left-[50%] -translate-x-[50%] w-[7rem] sm:w-[10rem] h-[4rem] lg:h-[7rem] lg:w-[10rem] -translate-y-[1rem] lg:-translate-x-[1rem]  lg:translate-y-0 bg-green-900 rounded-b-[1.5rem] `}
          style={{ fontFamily: "Playfair Display, serif" }}
          to="/"
        >
          {currentPath === "home" ? (
            <img
              src="/logo/gardenia-logo-2.png"
              alt="gardenia logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src="/logo/gardenia-logo-2.png"
              alt="gardenia logo"
              className="w-full h-full object-contain"
            />
          )}
        </Link>

        <a href="tel:+918891813555">
          <Phone
            className={`absolute lg:hidden ${
              currentPath === "home" ? "top-4" : "top-3"
            } right-4 md:right-10  w-5 md:w-6 h-6`}
            weight="bold"
          />
        </a>

        <ul
          className="hidden lg:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[.8rem] md:text-[.8rem]  xl:text-[.9rem] font-medium uppercase"
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
