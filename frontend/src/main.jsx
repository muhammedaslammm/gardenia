import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.jsx";
import Careers from "./pages/Careers.jsx";
import Space from "./pages/Space.jsx";
import Terms from "./components/Terms.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import Events from "./adminComponents/Events.jsx";
import Jobs from "./adminComponents/Jobs.jsx";
import EventManagement from "./adminComponents/EventManagement.jsx";
import EventData from "./adminComponents/EventData.jsx";
import Calendar from "./pages/Calendar.jsx";
import Enquiries from "./adminComponents/Enquiries.jsx";
import Gallery from "./adminComponents/Gallery.jsx";
import Staffs from "./adminComponents/Staffs.jsx";
import GalleryPage from "./pages/Gallery.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import NotFound from "./pages/NotFound.jsx";
import GalleryImages from "./adminComponents/GalleryImages.jsx";

const router = createBrowserRouter([
  {
    element: <ScrollToTop />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          // { path: "home", element: <Home /> },
          { path: "spaces/:id", element: <Space /> },
          { path: "terms", element: <Terms /> },
          { path: "careers", element: <Careers /> },
          { path: "calendar", element: <Calendar /> },
          { path: "gallery", element: <GalleryPage /> },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AuthProvider>
        <Admin />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Navigate to="events" /> },
      { path: "events", element: <Events /> },
      { path: "events/event-management", element: <EventManagement /> },
      { path: "events/:id", element: <EventData /> },
      { path: "enquiries", element: <Enquiries /> },
      { path: "gallery", element: <Gallery /> },
      { path: "gallery/:id", element: <GalleryImages /> },
      { path: "staffs", element: <Staffs /> },
      { path: "jobs", element: <Jobs /> },
    ],
  },
  {
    path: "/admin-login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
