import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../adminComponents/Sidebar.jsx";
import useSideBar from "../hooks/useSideBar";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { toast, Toaster } from "sonner";
import { useUser } from "../hooks/useUser.js";
import AdminHeader from "../adminComponents/AdminHeader.jsx";
import LoadingPage from "../adminComponents/shimmer/LoadingPage.jsx";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const { getPageInfo, getSideBarContents } = useSideBar(user?.role);
  const content = getSideBarContents();
  const data = getPageInfo();
  const { logoutStat } = useUser();

  if (user === null) return <LoadingPage />;
  else if (user && !user.blocked) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <section className="admin flex relative font--inter-tight">
          <Sidebar
            content={content}
            page_slug={data?.slug}
            username={user.username}
          />
          <AdminHeader stat={logoutStat} />
          <div className="absolute top-9 sm:top-0 left-0 sm:left-[12rem] right-0 min-h-screen bg-[#0f592e]/1 px-3 sm:px-5 py-3 space-y-3 sm:space-y-4 pb-[5rem]">
            <Outlet />
          </div>
        </section>
      </>
    );
  } else return <Navigate to="/admin-login" />;
};

export default Admin;
