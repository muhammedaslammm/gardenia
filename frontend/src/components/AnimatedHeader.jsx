import toSection from "../utils/toSection";
import { Link } from "react-router-dom";
import getHeaderContent from "../utils/getHeaderContent";
import { Phone } from "phosphor-react";

const AnimatedHeader = ({ stat }) => {
  const { headerContent } = getHeaderContent();
  return (
    <header
      className={`fixed left-0 top-0 w-full bg-[#fefefe] border-b border-neutral-400  z-500 -translate-y-full pb-1 ${stat ? "translate-y-0" : "-translate-y-full"} transition-transform duration-900`}
    >
      <nav className="relative lg:static h-auto text-white flex justify-between items-center w-[95%] sm:w-[90%] xl:w-[85%] px-1 md:px-2 mx-auto">
        <div className="absolute left-2 top-3 lg:hidden text-[#0f592e]">
          <i
            className="fa-solid fa-bars text-[1.1rem]"
            // onClick={props.func}
          ></i>
        </div>
        <div className="absolute lg:static -top-1 lg:top-0 left-[50%] -translate-x-[50%] w-[7rem] sm:w-[10rem] h-[5rem] lg:h-[5rem] lg:w-[10rem] -translate-y-[1rem] lg:-translate-x-[2.5rem]  lg:translate-y-0 bg-green-900 rounded-b-[1.5rem]">
          <img
            className="w-full h-full object-cover"
            src="/logo/gardenia-logo-2.png"
            alt="gardenia logo"
          />
        </div>

        <a href="tel:+918891813555">
          <Phone
            className="absolute top-3 right-2 text-[#0f592e] w-5 h-6 lg:hidden"
            weight="bold"
          />
        </a>

        <ul
          className="hidden lg:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[.8rem] md:text-[.85rem] xl:text-[.9rem] text-[#0f592e] uppercase py-[1.5rem]"
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
};

export default AnimatedHeader;
