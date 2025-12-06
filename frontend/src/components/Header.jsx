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
          : "fixed h-[3rem] lg:h-auto bg-[#fefefe] text-[#0f592e] border-b border-[#e2ece5] "
      } shadow-md left-0 w-full top-0 z-500`}
    >
      <nav
        className={`relative lg:static flex justify-center sm:justify-between sm:items-center md:items-center xl:items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 mx-auto ${
          currentPath === "home" ? "py-[.0rem]" : "py-[0rem]"
        }`}
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
          className={`absolute left-[50%] -translate-x-[50%] lg:-translate-x-[4px] xl:-translate-x-[15px] ${
            currentPath === "home" ? "sm:top-0" : "sm:top-2"
          } lg:static`}
          style={{ fontFamily: "Playfair Display, serif" }}
          to="/"
        >
          {currentPath === "home" ? (
            <div className="bg-green-900 pt-4 pb-4 rounded-b-[1.5rem]">
              <img
                src="/logo/gardenia-logo-2.png"
                alt="gardenia logo"
                className="w-[7.5rem] sm:w-[10rem] h-[2rem] lg:h-[3rem] lg:w-[11rem] xl:h-[3rem] xl:w-[10rem]  object-cover"
              />
            </div>
          ) : (
            <div className="bg-green-900 rounded-b-[1rem]">
              <img
                src="/logo/gardenia-logo-2.png"
                alt="gardenia logo"
                className="w-[5rem] lg:h-auto lg:w-[6rem] xl:w-[8rem] h-full  object-contain -translate-y-[.2rem]"
              />
            </div>
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
