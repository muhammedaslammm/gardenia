import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  let { pathname } = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
};

export default ScrollToTop;
