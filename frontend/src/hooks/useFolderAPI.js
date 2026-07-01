import { useState } from "react";

const useFolderAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const createFolder = async (folder_name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery-folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ folder_name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create folder");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFolder = async (id) => {
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery-folders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete folder");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { createFolder, deleteFolder, loading, error };
};

export default useFolderAPI;
