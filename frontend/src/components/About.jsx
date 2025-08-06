import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect } from "react";
import useIsMobile from "../customhooks/useIsMobile";
import highlights from "../data/highlight";

const About = () => {
  const containerRef = useRef();
  const isMobile = useIsMobile();
  const { onAboutEnter, onAboutLeaveBack } = useOutletContext();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const onLoad = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          onEnter: onAboutEnter,
          onLeaveBack: onAboutLeaveBack,
        });
      };
      if (document.readyState === "complete") onLoad();
      else {
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    }, containerRef);
    return () => context.revert();
  }, []);

  return (
    <section
      id="about"
      className="pt-4 pb-10 md:py-6 lg:py-8 xl:pb-12 space-y-2 lg:space-y-2"
      ref={containerRef}
    >
      <h1 className="heading--section about-fade">who are we ?</h1>
      <div className="space-y-8 xl:space-y-10">
        <p className="about-para about-fade">
          Nestled in the heart of Kallambalam, Gardenia Convention Center was
          built on a vision: to offer more than just a venue — a place where
          moments are elevated, and gatherings become timeless. With a deep
          focus on comfort, hospitality, and thoughtful design, we created a
          space that welcomes every kind of celebration with warmth and
          elegance. Whether it's a wedding, a conference, or a cultural event,
          Gardenia is where your story finds its perfect stage. We've
          thoughtfully equipped the space with key features to support events of
          every kind.
        </p>
        <div className="w-[95%] sm:w-full md:w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 place-items-start gap-4">
          {highlights.map(({ icon: Icon, ...rest }) => (
            <div className="w-full py-8 flex flex-col items-center gap-1 bg-[#0f592e]/10 border border-[#09241750] rounded-[.3rem]">
              <Icon
                weight="light"
                color="#0f592e"
                className="w-8 lg:w-9 h-8 lg:h-9"
              />
              <p
                className="text-[#0f592e] text-[.8rem] lg:text-[.9rem]  font-semibold uppercase text-center"
                style={{ fontFamily: "Inter Tight, serif" }}
              >
                {rest.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
