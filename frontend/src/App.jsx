import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import AnimatedHeader from "./components/AnimatedHeader.jsx";
import FullNavBar from "./components/FullNavBar.jsx";
import { useLocation } from "react-router-dom";
import { ShimmerBanner } from "./components/ShimmerBanner.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [fullNavState, setFullNavState] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hideLoader, setHideLoader] = useState(false);
  const containerRef = useRef();
  const animatedHeaderRef = useRef();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // const context = gsap.context(() => {
    //   requestAnimationFrame(() => {
    //     ScrollSmoother.create({
    //       wrapper: "#smooth-wrapper",
    //       content: "#smooth-content",
    //       smooth: 2.5,
    //       smoothTouch: false,
    //     });
    //   });
    // }, containerRef);
    gsap.set(animatedHeaderRef.current, {
      y: -150,
    });
    // return () => context.revert();
  }, [isContentReady]);

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
      y: -150,
      duration: 1,
    });
  };

  return (
    <main
      id="smooth-wrapper"
      className="relative website__content"
      ref={containerRef}
    >
      <div id="smooth-content">
        <Header func={handleButtonClick} />
        {navigation.state === "loading" ? (
          <ShimmerBanner />
        ) : (
          <Outlet
            context={{
              onAboutEnter,
              onAboutLeaveBack,
            }}
          />
        )}

        <Footer />
      </div>
      <AnimatedHeader ref={animatedHeaderRef} func={handleButtonClick} />
      <FullNavBar state={fullNavState} func={handleButtonClick} />
    </main>
  );
};

export default App;
