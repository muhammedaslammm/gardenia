import { bannerImage } from "../utils/images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";
import toSection from "../utils/toSection";
import useIsMobile from "../customhooks/useIsMobile";

const Banner = () => {
  const bannerContainer = useRef();
  const imageRef = useRef();
  const isMobile = useIsMobile();

  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       ScrollTrigger.create({
  //         trigger: bannerContainer.current,
  //         start: "top top",
  //         pin: imageRef.current,
  //         pinSpacing: false,
  //       });
  //     };
  //     if (document.readyState === "complete") onLoad();
  //     else {
  //       window.addEventListener("load", onLoad);
  //       return () => window.removeEventListener("load", onLoad);
  //     }
  //   });
  //   return () => context.revert();
  // }, []);
  return (
    <section
      className="relative w-full h-[100svh] overflow-hidden"
      ref={bannerContainer}
    >
      <img
        ref={imageRef}
        src={bannerImage}
        alt=""
        className="banner banner-image w-full h-full object-cover z-0 object-bottom"
      />

      <div className="absolute hidden bottom-[22rem] sm:bottom-[18rem] xl:bottom-[22rem] left-[50%] w-full max-w-[90rem] -translate-x-[50%] text-white sm:flex flex-col gap-3 z-20 items-center justify-center">
        <h1
          className="text-[2.25rem] sm:text-[2.5rem] xl:text-[3.7rem] font-semibold uppercase leading-[2.4rem] xl:leading-[5rem] text-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          the <span className="text-[#8ba380]">space</span> that speaks your{" "}
          <span className="text-[#8ba380]">memories</span>
        </h1>
        <h2
          className="mx-auto w-[80%] sm:w-[85%] xl:w-full text-[1rem] sm:text-[1.2rem] xl:text-[1.35rem] text-neutral-200 xl:uppercase text-center"
          style={{ fontFamily: "Inter Tight, serif" }}
        >
          Weddings, expos, summits—we shape the space to fit your story.
        </h2>
      </div>
      <div className="space-x-8 absolute bottom-[1.5rem] xl:bottom-[3rem] left-[50%] -translate-x-[50%] z-20">
        <button
          className="text-whtie font-semibold text-[.6rem] text-white uppercase tracking-[.1rem] cursor-pointer" //#12522c
          onClick={() => toSection("contact")}
        >
          Contact Us Now
        </button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 z-10"></div>
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
};

export default Banner;
