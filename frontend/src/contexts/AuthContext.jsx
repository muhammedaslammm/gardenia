import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    let isMounted = true;
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("user data at /me request:", data.user);
        if (!response.ok) {
          throw new Error(data.message);
        } else {
          if (isMounted) setUser((prev) => data.user);
        }
      } catch (error) {
        console.error(error.message);
        if (isMounted) setUser(false);
      }
    };
    fetchAdminDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  const userLogin = async (userData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/login  `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await response.json();
      console.log("user data at login:", data.user);
      if (!response.ok) throw new Error();
      setUser(data.user);
      return true;
    } catch (error) {
      console.error(error.message);
      setUser(null);
      return false;
    }
  };

  const userLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setUser(null);
      return true;
    } catch (error) {
      return false;
    }
  };

  let value = { user, userLogin, userLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
