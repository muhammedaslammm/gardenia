import { useState } from "react";
import { createPortal } from "react-dom";
import ExcelModal from "../modals/ExcelModal";

const ExcelDownload = () => {
  const [box, setBox] = useState(false);
  return (
    <div className="">
      <button
        className="bg-green-800 text-[.9rem] text-white font-semibold cursor-pointer px-2 py-1"
        onClick={() => setBox(true)}
      >
        Download Excel
      </button>
      {box &&
        createPortal(
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-100">
            <ExcelModal open={setBox} />
          </div>,
          document.getElementById("modal--event")
        )}
    </div>
  );
};

export default ExcelDownload;
