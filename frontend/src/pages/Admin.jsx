import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../adminComponents/Sidebar.jsx";
import useSideBar from "../hooks/useSideBar";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Toaster } from "sonner";
import { useUser } from "../hooks/useUser.js";

const Admin = () => {
  const { getPageInfo, getSideBarContents } = useSideBar();
  const content = getSideBarContents();
  const data = getPageInfo();
  const { user } = useContext(AuthContext);
  const { logoutStat } = useUser();

  if (user === null) return null;
  if (user)
    return (
      <>
        <Toaster position="top-center" richColors />
        <section className="admin flex relative font--inter-tight">
          <Sidebar content={content} page_slug={data?.slug} stat={logoutStat} />
          <div className="absolute left-[12rem] right-0 min-h-screen bg-[#0f592e]/1 px-5 py-3 space-y-4">
            <h1 className="text-[1.2rem] font-medium">{data?.page_title}</h1>
            <Outlet />
          </div>
        </section>
      </>
    );
  else return <Navigate to="/admin-login" />;
};

export default Admin;
