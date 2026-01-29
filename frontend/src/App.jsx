import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import FullNavBar from "./components/FullNavBar.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [fullNavState, setFullNavState] = useState(false);
  const containerRef = useRef();

  const handleButtonClick = () => {
    setFullNavState(!fullNavState);
  };

  return (
    <main className="relative website__content" ref={containerRef}>
      <div id="smooth-content">
        <Header func={handleButtonClick} />
        <Outlet />
        <Footer />
      </div>
      <FullNavBar state={fullNavState} func={handleButtonClick} />
    </main>
  );
};

export default App;
