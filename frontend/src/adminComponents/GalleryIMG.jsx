import { X } from "phosphor-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import GalleryImageDeleteModal from "./modals/GalleryImageDeleteModal";

const GalleryIMG = ({ folderID, img, refetch }) => {
  const [modal, setModal] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let IMAGE_URL = import.meta.env.VITE_CLOUDINARY_IMAGE_URL;

  const deleteImage = async () => {
    let response = await fetch(
      `${BACKEND_URL}/api/gallery-folders/${folderID}/images/${img._id}`,
      { method: "DELETE", credentials: "include" },
    );

    let data = await response.json().catch(() => ({}));

    if (!response.ok) throw new Error(data.message || "Image failed to delete");
    await refetch();
    return { message: data.message || "Image deleted" };
  };

  return (
    <>
      <div className="relative overflow-hidden mb-4">
        <img
          src={`${IMAGE_URL}/${img.public_id}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <button
          className="bg-neutral-300/30 absolute right-2 top-2 p-1 rounded-full hover:bg-red-400 cursor-pointer"
          onClick={() => setModal(true)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {modal && (
        <div className={`fixed inset-0 z-100`}>
          <div
            className={`absolute top-8 ${modal ? "translate-y-0" : "-translate-y-[200%]"} transition-transform duration-500 right-[50%] translate-x-[50%]`}
          >
            <GalleryImageDeleteModal
              deleteImage={deleteImage}
              cancel={() => setModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryIMG;
