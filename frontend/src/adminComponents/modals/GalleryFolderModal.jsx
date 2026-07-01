import { X } from "phosphor-react";
import { useState } from "react";
import ModalLabel from "./ModalLabel";
import ButtonLoading from "./ButtonLoading";
import { toast } from "sonner";
import useFolderAPI from "../../hooks/useFolderAPI.js";

const GalleryFolderModal = ({ setModal, refetch }) => {
  const [folderName, setFolderName] = useState("");
  const [folderError, setFolderError] = useState("");
  const { createFolder, loading } = useFolderAPI();

  const validateFolderName = (name) => {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return "At least 2 characters required";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFolderName(folderName);
    if (validationError) {
      setFolderError(validationError);
      return;
    }

    try {
      let response = await createFolder(folderName);
      toast.success(response.message || "Folder successfully created");
      setModal(false);
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to create folder");
      setFolderError(err.message);
    }
  };

  return (
    <div className="relative w-[40rem] bg-white space-y-4 mb-[2rem] p-4 font--inter-tight">
      <div className="flex justify-between items-center">
        <div className="font--dm-serif-display font-medium text-[1.6rem]">
          Create a New Folder
        </div>
        <div onClick={() => setModal(false)} className="cursor-pointer">
          <X className="w-[1.3rem] h-[1.3rem] text-red-700" weight="bold" />
        </div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <ModalLabel title="Folder Name" error={folderError} />
          <input
            type="text"
            value={folderName}
            onChange={(e) => {
              setFolderName(e.target.value);
              setFolderError("");
            }}
            placeholder="Enter folder name"
            className="a--input"
            autoFocus
          />
          {folderError && (
            <p className="text-xs text-red-600 mt-1">{folderError}</p>
          )}
        </div>

        {/* Guidelines */}
        <div className="space-y-2 p-3 bg-neutral-50 border border-neutral-200 rounded">
          <div className="text-sm font-semibold text-neutral-700">
            Guidelines:
          </div>
          <ul className="text-xs text-neutral-600 space-y-1">
            <li>✓ At least 2 characters required</li>
            <li>✗ Make sure to avoid existing folder names</li>
            <li>✓ Use clear, descriptive names</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={() => setModal(false)}
            className="px-4 py-2 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? <ButtonLoading /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryFolderModal;
