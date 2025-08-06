import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useLayoutEffect } from "react";
import LeftCard from "./LeftCard";
import convention_spaces from "../data/spaces";
import useIsMobile from "../customhooks/useIsMobile";
import { Link } from "react-router-dom";

const Spaces = () => {
  const containerRef = useRef();
  const isMobile = useIsMobile();

  // useLayoutEffect(() => {
  //   if (isMobile) return;
  //   const context = gsap.context(() => {
  //     const onLoad = () => {
  //       const elements = gsap.utils.toArray(".space-fade");
  //       gsap.from(elements, {
  //         opacity: 0,
  //         y: 100,
  //         duration: 1.5,
  //         stagger: { amount: 0.7 },
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "top 55%",
  //           toggleActions: "play none none reverse",
  //         },
  //       });
  //     };

  //     if (document.readyState === "complete") onLoad();
  //     else {
  //       window.addEventListener("load", onLoad);
  //       return () => window.removeEventListener("load", onLoad);
  //     }
  //   }, containerRef);

  //   // ScrollTrigger.refresh();
  //   return () => context.revert();
  // }, []);
  return (
    <section
      id="spaces"
      className="py-10 lg:py-12 border-t border-[#0f592e] space-y-4 sm:space-y-8 xl:space-y-4"
      ref={containerRef}
    >
      <div className="space-y-1">
        <h2
          className="heading--section"
          style={{ fontFamily: "Inter Tight,sans-serif" }}
        >
          our event spaces
        </h2>
        {/* <p className="hidden sm:block paragraph--section">
          Explore our event spaces, where comfort meets functionality. Both the
          Main Hall and Mini Hall are equipped to accommodate a range of
          gatherings — from grand celebrations to focused meetings — with modern
          amenities, elegant interiors, and a settings to meet your every
          occasion.
        </p> */}
      </div>

      <div className="grid  md:grid-cols-2 gap-10">
        {" "}
        {/*space-y-10 md:flex md:flex-col md:gap-0 lg:gap-4 xl:gap-6 */}
        {convention_spaces.map((space) => (
          <Link to={`/spaces/${space.id}`}>
            <LeftCard data={space} />
          </Link>
        ))}
      </div>
    </section>
  );
};
//md:space-y-6 lg:space-y-10 xl:space-y-20

export default Spaces;
