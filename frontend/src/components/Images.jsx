import { useState } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "../utils/images";
import { useOutletContext } from "react-router-dom";
import useIsMobile from "../customhooks/useIsMobile";

const Images = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef();
  const isMobile = useIsMobile();
  const { onImagesEnter, onImagesLeave, onImagesEnterBack, onImagesLeaveBack } =
    useOutletContext();
  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       const images = gsap.utils.toArray(".image");
  //       gsap.from(images, {
  //         opacity: 0,
  //         y: 50,
  //         duration: 1,
  //         stagger: { amount: 0.7 },
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "top 75%",
  //           toggleActions: "play none none reverse",
  //         },
  //       });
  //       ScrollTrigger.create({
  //         trigger: containerRef.current,
  //         start: "top 10%",
  //         onEnter: onImagesEnter,
  //         onLeave: onImagesLeave,
  //         onEnterBack: onImagesEnterBack,
  //         onLeaveBack: onImagesLeaveBack,
  //       });
  //     };
  //     if (document.readyState === "complete") onLoad();
  //     else {
  //       window.addEventListener("load", onLoad);
  //       return () => window.removeEventListener("load", onLoad);
  //     }
  //   }, containerRef);
  //   return () => context.revert();
  // }, []);

  return (
    <section
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-6 xl:space-y-12"
      ref={containerRef}
    >
      <div className="heading--section text-[#0f592e] uppercase !text-center">
        Images
      </div>
      <div className="space-y-3 md:space-y-6 lg:space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-4">
          <div className="relative w-full lg:w-3/6 h-[20rem] sm:h-[25rem]">
            <img
              src={image1}
              alt=""
              className="w-full h-full object-cover  rounded-[.0rem] lg:bg-bottom"
            />
          </div>
          <div className="w-full lg:w-3/6 h-[20rem] sm:h-[25rem] md:h-[23rem] lg:h-[25rem] flex gap-3 md:gap-6 lg:gap-4 md:px-30 lg:px-0 overflow-x-hidden">
            <img
              src={image2}
              alt=""
              className="w-[50%] h-full object-cover  rounded-[.0rem]"
            />
            <img
              src={image3}
              alt=""
              className="w-[50%] h-full object-cover  rounded-[.0rem]"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-4">
          <div className="w-full xl:w-3/6 h-[18rem] sm:h-[25rem] md:h-[23rem] lg:h-[25rem] flex gap-3 md:gap-6 lg:gap-4 md:px-30 lg:px-0 overflow-x-hidden">
            <img
              src={image4}
              alt=""
              className="w-1/2 h-full object-cover rounded-[.0rem]"
            />
            <img
              src={image5}
              alt=""
              className="w-1/2 h-full object-cover rounded-[.0rem]"
            />
          </div>
          <div className="w-full xl:w-3/6 h-[20rem] sm:h-[25rem]">
            <img
              src={image6}
              alt=""
              className="w-full h-full object-cover  rounded-[.0rem]"
            />
          </div>
        </div>
      </div>

      {/* <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 md:gap-8 lg:gap-6">
        {[image1, image2, image3, image6, image5, image4].map((image, i) => (
          <div className="">
            <img
              key={i}
              src={image}
              alt={`image${i}`}
              className="image w-full h-full mb-4 md:mb-8 lg:mb-6 rounded-[.4rem] xl:rounded-[.6rem] object-cover "
            />
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default Images;
