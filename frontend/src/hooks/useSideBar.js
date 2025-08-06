import { useLocation } from "react-router-dom";
import sidebar from "../data/sidebar";

const useSideBar = () => {
  const getSideBarContents = () => {
    return sidebar.filter((data) => data.sidebar);
  };

  const getPageInfo = () => {
    const { pathname } = useLocation();
    return sidebar.find((data) => data.path === pathname);
  };

  return { getSideBarContents, getPageInfo };
};
export default useSideBar;
