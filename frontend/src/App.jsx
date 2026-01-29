import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import FullNavBar from "./components/FullNavBar.jsx";

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
        <Outlet context={{ func: handleButtonClick }} />
        <Footer />
      </div>
      <FullNavBar state={fullNavState} func={handleButtonClick} />
    </main>
  );
};

export default App;
