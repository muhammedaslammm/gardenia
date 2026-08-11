import { FilePlus } from "phosphor-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import GalleryGroupModal from "./modals/GalleryFolderModal";
import GalleryFolder from "./GalleryFolder";
import useFolderAPI from "../hooks/useFolderAPI.js";

const Gallery = () => {
  let [folders, setFolders] = useState(null);
  let [showModal, setShowModal] = useState(false);

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchFolders();
  }, []);

  let fetchFolders = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/gallery-folders`, {
        method: "GET",
        credentials: "include",
      });
      let data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setFolders(data.folders);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (folders === null)
    return (
      <div>
        <div className="loading">Loading...</div>
      </div>
    );
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-[.9rem]">Gallery Folders</h1>
      {folders && (
        <div className="container">
          <div className="grid grid-cols-6 gap-4">
            <div
              onClick={() => setShowModal(true)}
              className="relative group border-1 border-dashed border-neutral-400 h-[12rem] cursor-pointer  bg-yellow-100 hover:bg-yellow-200 transition-all rounded-[1rem]"
            >
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-green-800 flex flex-col items-center gap-2 ">
                <FilePlus className="w-[3rem] h-[3rem]" />
                <div className="text-center">Add New Folder</div>
              </div>
            </div>
            {folders.map((folder) => (
              <GalleryFolder
                key={folder._id}
                data={folder}
                refetch={fetchFolders}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal Portal */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
            <GalleryGroupModal setModal={setShowModal} refetch={fetchFolders} />
          </div>,
          document.getElementById("modal--gallery"),
        )}
    </main>
  );
};

export default Gallery;
