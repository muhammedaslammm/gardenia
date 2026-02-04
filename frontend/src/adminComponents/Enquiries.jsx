import dayjs from "dayjs";
import useEnquiries from "../hooks/useEnquiries";
import { Spinner } from "phosphor-react";

const Enquiries = () => {
  let { sortedResult, handleRead, updateId, handleSort } = useEnquiries();
  return (
    <main className="space-y-4">
      <h1>Client Enquiries</h1>

      <div className="w-[70%]">
        {sortedResult === null ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animation--container h-[10rem] w-full">
                <div className="animation--mask animation--loading__effect"></div>
              </div>
            ))}
          </div>
        ) : sortedResult && sortedResult.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="self-start w-2/6 space-y-1">
              {/* <div className="">Sort</div> */}
              <select
                name=""
                id=""
                className="w-full border border-neutral-400 cursor-pointer outline-0 p-2"
                onChange={handleSort}
              >
                {[
                  ["all", "All"],
                  ["read", "Read"],
                  ["un-read", "Unread"],
                ].map(([key, value]) => (
                  <option value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              {sortedResult.map((enq) => (
                <div
                  className={`p-4 border border-neutral-400 space-y-8 ${
                    !enq.read ? "bg-neutral-200" : "bg-white"
                  }`}
                >
                  <div>
                    <div>Enquiree Name : {enq.name}</div>
                    <div className="font-medium">
                      Event Date :{" "}
                      {dayjs(enq.event_date).format("Do MMMM YYYY")}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="">
                      <div>Phone : {enq.contact_number}</div>
                      <div>Email : {enq.email}</div>
                      {/* <div className="text-neutral-600 text-[.8rem]">
                        Submitted date :{" "}
                        {dayjs(enq.createdAt).format("DD-MM-YYYY")}
                      </div> */}
                    </div>
                    <button
                      className={`border border-neutral-400 py-1 px-2 text-[.9rem] ${
                        enq._id === updateId
                          ? "cursor-not-allowed px-8 py-1.5"
                          : "cursor-pointer"
                      }`}
                      onClick={() => handleRead(enq._id, enq.read)}
                      disabled={enq._id === updateId}
                    >
                      {enq._id === updateId ? (
                        <Spinner className="animate-spin w-[1rem] h-[1rem]" />
                      ) : enq.read ? (
                        "Mark as unread"
                      ) : (
                        "Mark as read"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div>No Enquiries</div>
            <div>Couldn't find any enquiries from clients!</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Enquiries;
