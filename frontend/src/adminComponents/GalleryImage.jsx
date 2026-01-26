import { Spinner } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";

const GalleryImage = ({ image, refetch }) => {
  let [loading, setLoading] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const deleteImage = async (id) => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/admin/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      key={image._id}
      className="relative border border-neutral-300 cursor-pointer group"
      onClick={() => deleteImage(image._id)}
    >
      <img
        src={image.url}
        alt="uploaded image"
        className="w-full h-full object-contain object-center"
      />
      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex justify-center items-center leading-[1.2rem] text-[.9rem] text-white text-center font-medium p-4">
        {loading ? (
          <div className="flex items-center gap-1">
            Image Deleting{" "}
            <Spinner className="w-[1.3rem] h-[1.3rem] animate-spin" />
          </div>
        ) : (
          "Click to delete this image from gallery"
        )}
      </div>
    </div>
  );
};

export default GalleryImage;
