import { DotsThreeVertical, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import useFolderAPI from "../hooks/useFolderAPI.js";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const GalleryFolder = ({ data, refetch }) => {
  let { folder_name, count, _id } = data;
  const [box, setBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  let { deleteFolder } = useFolderAPI();

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setBox(false);
    };
    document.addEventListener("mousedown", handleMouseClick);
    return () => document.removeEventListener("mousedown", handleMouseClick);
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setLoading(true);
      let response = await deleteFolder(_id);
      toast.success(response.message || "Folder successfully deleted");
      refetch();
    } catch (error) {
      toast.error(error.message || "Folder deletion failed");
    } finally {
      setBox(false);
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/admin/gallery/${_id}`}
      className="group bg-green-800 hover:bg-green-900 transition-colors text-yellow-200 flex flex-col justify-between rounded-[1rem] h-[12rem] p-4"
    >
      <div className="self-end">{count}</div>
      <div className="flex items-center justify-between gap-2">
        <div className="truncate font-medium ">{folder_name}</div>
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBox((prev) => !prev);
            }}
            className="cursor-pointer"
            aria-label={`Open actions for ${folder_name}`}
          >
            <DotsThreeVertical weight="bold" className="w-5 h-5" />
          </button>
          {box && (
            <div
              className="absolute right-0 top-full mt-1 z-10 min-w-[8rem] rounded border border-neutral-300 bg-white"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    Deleting{" "}
                    <Spinner className="animate-spin w-[1.1rem] h-[1.1rem]" />
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GalleryFolder;
