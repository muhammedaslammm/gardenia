import { useState } from "react";
import { createPortal } from "react-dom";
import ExcelModal from "../modals/ExcelModal";
import { ArrowSquareOut } from "phosphor-react";

const ExcelDownload = () => {
  const [box, setBox] = useState(false);
  return (
    <div className="">
      <button
        className="text-[.9rem] text-neutral-500 underline hover:text-green-800 transition-colors cursor-pointer flex items-center gap-1 "
        onClick={() => setBox(true)}
      >
        Generate excel sheet? <ArrowSquareOut />
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
