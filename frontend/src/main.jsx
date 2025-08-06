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
import { AuthProvider } from "./contexts/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: "home", element: <Home /> },
      { path: "spaces/:id", element: <Space /> },
      { path: "terms", element: <Terms /> },
      { path: "careers", element: <Careers /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <Navigate to="events" /> },
      { path: "events", element: <Events /> },
      { path: "jobs", element: <Jobs /> },
    ],
  },
  {
    path: "/admin-login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
