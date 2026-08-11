import dayjs from "dayjs";
import { CaretRight, Plus, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import GalleryModal from "./modals/GalleryModal";
import GalleryIMG from "./GalleryIMG";

const GalleryImages = () => {
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchFolder();
  }, [id]);

  const fetchFolder = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/gallery-folders/${id}`, {
        method: "GET",
        credentials: "include",
      });
      let data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);
    } catch (error) {
      toast.error("Failed to fetch folder data");
    }
  };

  return (
    <main className="flex flex-col gap-4">
      <div className="breadcrumbs flex items-center gap-1 text-[.9rem]">
        <Link to="/admin/gallery" className="underline">
          Gallery Folders
        </Link>
        <CaretRight className="" />
        <span>Images</span>
      </div>
      {data === null && <div>loading...</div>}
      {data !== null && (
        <>
          <div className="container flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[1.3rem] font-medium capitalize">{`${data.folder_name} Images`}</div>
                <div>{`Created ${dayjs(data.createdAt).format("DD MMMM YYYY")}`}</div>
              </div>
              <button
                className="py-2 px-3 bg-green-900 text-white text-[.9rem] font-medium text-center hover:bg-green-800 transition-colors cursor-pointer"
                onClick={() => setModal(true)}
              >
                Add Images
              </button>
            </div>
            <div>
              {data.images.length === 0 ? (
                <div className="bg-yellow-50 text-center p-16">
                  <div className="font-medium">No images added.</div>
                  <div>
                    Add images to give more visual insights for the public.
                  </div>
                </div>
              ) : (
                <div className="columns-3xs gap-4">
                  {data.images.map((img) => (
                    <GalleryIMG
                      folderID={id}
                      img={img}
                      refetch={fetchFolder}
                      key={img._id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {modal &&
            createPortal(
              <div className="fixed z-100 inset-0 bg-black/50 flex justify-center items-center">
                <GalleryModal
                  close={() => setModal(false)}
                  folderId={id}
                  refetch={fetchFolder}
                />
              </div>,
              document.getElementById("modal--gallery"),
            )}
        </>
      )}
    </main>
  );
};

export default GalleryImages;
