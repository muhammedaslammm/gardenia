import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import AnimatedHeader from "./components/AnimatedHeader.jsx";
import FullNavBar from "./components/FullNavBar.jsx";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [fullNavState, setFullNavState] = useState(false);
  const containerRef = useRef();
  const animatedHeaderRef = useRef();
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        smoothTouch: false,
      });
    }, containerRef);
    return () => context.revert();
  }, []);

  const { pathname, id } = useLocation();

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
  }, [pathname, id]);

  const handleButtonClick = () => {
    setFullNavState(!fullNavState);
  };

  const onAboutEnter = () => {
    gsap.to(animatedHeaderRef.current, {
      y: 0,
      duration: 0.7,
    });
  };

  const onAboutLeaveBack = () => {
    gsap.to(animatedHeaderRef.current, {
      y: -100,
      duration: 1,
    });
  };

  return (
    <main id="smooth-wrapper" className="relative" ref={containerRef}>
      <div id="smooth-content">
        <Header func={handleButtonClick} />
        <Outlet
          context={{
            onAboutEnter,
            onAboutLeaveBack,
          }}
        />
        <Footer />
      </div>
      <AnimatedHeader ref={animatedHeaderRef} func={handleButtonClick} />
      <FullNavBar state={fullNavState} func={handleButtonClick} />
    </main>
  );
};

export default App;
