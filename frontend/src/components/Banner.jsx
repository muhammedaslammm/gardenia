import { bannerImage, mobileBanner } from "../utils/images";
import { useEffect, useRef, useState } from "react";
import toSection from "../utils/toSection";
import { Link } from "react-router-dom";
import AnimatedHeader from "./AnimatedHeader";

const Banner = ({ func }) => {
  const [animateHeaderStat, setAnimateHeaderStat] = useState(false);
  const bannerContainer = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([element]) => {
        setAnimateHeaderStat(!element.isIntersecting);
      },
      { threshold: 0.1 },
    );
    if (bannerContainer.current) observer.observe(bannerContainer.current);
    return () => {
      if (bannerContainer.current) {
        observer.unobserve(bannerContainer.current);
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      <section
        className="relative w-full h-[80svh] md:h-[100svh] overflow-hidden"
        ref={bannerContainer}
      >
        <picture>
          <source srcSet={mobileBanner} media="(max-width:500px)" />
          <img
            ref={imageRef}
            src={bannerImage}
            alt="gardenia banner image"
            className="banner banner-image w-full h-full object-cover z-0 object-bottom"
          />
        </picture>

        <div className="absolute bottom-[5rem] sm:bottom-[15rem] md:bottom-[20rem] lg:bottom-[20rem] xl:bottom-[30%] left-[50%] w-full max-w-[90rem] -translate-x-[50%] text-white sm:flex flex-col gap-3 xl:gap-5 z-20 items-center justify-center ">
          <h1 className="text-[2rem] leading-[2.8rem] font--dm-serif-display text-center sm:hidden">
            Space & Memories
          </h1>
          <h1
            className="hidden sm:block sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[6rem] xl:max-w-[90rem] font-semibold uppercase leading-[2.4rem] sm:leading-[2.7rem] md:leading-[3.7rem] lg:leading-[4.2rem] xl:leading-[5.5rem] sm:text-center"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            the <span className="text-[#22a85a]">space</span> that speaks your{" "}
            <span className="text-[#22a85a]">memories</span>
          </h1>
          <h2
            className="mx-auto w-[80%] sm:w-[85%] xl:w-full text-[1rem] sm:text-[1.2rem] xl:text-[1.35rem] text-neutral-400 leading-[1.3rem] sm:text-neutral-200 xl:uppercase text-center"
            style={{ fontFamily: "Inter Tight, serif" }}
          >
            Weddings, expos, summits—we shape the space to fit your story.
          </h2>
          <div className="mt-[1rem] flex justify-center gap-2 sm:gap-4">
            <div
              className="banner-button bg-white/80 text-green-800 hover:bg-white transition-colors font--inter-tight"
              onClick={() => toSection("contact")}
            >
              Contact Now
            </div>
            <Link
              className="banner-button bg-green-900 hover:bg-green-800 transition-colors text-white font--inter-tight"
              to="/calendar"
            >
              View Our Calendar
            </Link>
          </div>
        </div>
        <div className="space-x-8 absolute bottom-[1rem] xl:bottom-[3rem] left-[50%] -translate-x-[50%] z-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <AnimatedHeader stat={animateHeaderStat} menuClick={func} />
      </section>
    </>
  );
};

export default Banner;
