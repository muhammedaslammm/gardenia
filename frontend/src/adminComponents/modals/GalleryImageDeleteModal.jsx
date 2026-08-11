import { Spinner } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";

const GalleryImageDeleteModal = ({ cancel, deleteImage }) => {
  const [loading, setLoading] = useState(false);
  const triggerDelete = async () => {
    setLoading(true);
    try {
      let response = await deleteImage();
      toast.success(response.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      cancel();
    }
  };
  return (
    <div className="bg-white w-[30rem] shadow-xl border border-neutral-300 rounded-[.5rem] flex flex-col gap-1 p-4 font--inter-tight">
      <div className="text-[1.1rem] font-medium font--dm-serif-display">
        Delete this item?
      </div>
      <p>Are you sure you want to delete this image?</p>
      <div className="flex justify-end items-center gap-2 mt-6">
        <button
          className="bg-neutral-300 hover:bg-neutral-200 transition-colors py-1 px-3 rounded-[.2rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => cancel()}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="bg-red-800 hover:bg-red-900 transition-colors text-white py-1 px-3 rounded-[.2rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={() => triggerDelete()}
        >
          {loading ? (
            <div className="flex items-center gap-1">
              Deleting <Spinner className="animate-spin" />
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default GalleryImageDeleteModal;
