import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log("users:", result.users);
      setUsers(result.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { users, refetch: getUsers };
};

export default useUsers;
