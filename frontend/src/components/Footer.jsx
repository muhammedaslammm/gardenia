import footer from "../data/footer";

const Footer = () => {
  return (
    <footer className="mt-6 xl:mt-10 mx-auto pt-4 xl:pt-4 space-y-8 xl:space-y-8 bg-[#081e10] text-white">
      <div className="w-[90%] xl:w-[80%] mx-auto space-y-4">
        <div
          className="top flex justify-between items-center"
          style={{ fontFamily: "DM Serif Display, serif" }}
        >
          <div className="top__left w-[55%] text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] xl:text-[1.8rem] leading-[1.3rem] xl:leading-[1.5rem] capitalize">
            {footer.title}
          </div>
          <div className="top__right text-[1.5rem] md:text-[1.8rem] xl:text-[2.5rem]">
            <img
              src="/logo/gardenia-logo-2.png"
              alt="Gardenia Convention Center Logo"
              className="w-[10rem] sm:w-[11rem] md:w-[14rem] xl:w-[16rem] h-[5rem] object-cover translate-x-6 sm:translate-x-6 md:translate-x-7 xl:translate-x-19"
            />
          </div>
        </div>
        <div
          className="middle space-y-8 xl:space-y-10"
          style={{ fontFamily: "Inter Tight,serif" }}
        >
          <div className="middle__top text-[.8rem] md:text-[.9rem] xl:text-[1rem] flex flex-col xl:flex-row gap-2 md:gap-4 xl:gap-8 uppercase  ">
            <p className="text-neutral-400 ">{footer.links.label}</p>
            <ul className="flex flex-col xl:flex-row gap-2 md:gap-3 xl:gap-4">
              {footer.links.links.map((link, index) => {
                return (
                  <li className="cursor-pointer" key={index}>
                    {link}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="middle__bottom text-[.8rem] md:text-[.9rem] xl:text-[1rem] xl:uppercase text-neutral-300 space-y-2 xl:space-y-4">
            <p className="w-[15rem]">{footer.address.address}</p>
            <p>{footer.address.email}</p>
          </div>
        </div>
        <div
          className="bottom py-2 xl:py-2"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          <div className="bottom__left text-[.7rem] md:text-[.8rem] text-neutral-400">
            Copyright &#169; 2025, Gardenina Convention Center, All Right
            Reserved
          </div>
          <div className="bottom__right"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
