import dayjs from "dayjs";
import useEnquiries from "../hooks/useEnquiries";
import { Spinner } from "phosphor-react";
import Empty from "./Empty";

const Enquiries = () => {
  let { query, setQuery, sortedResult, handleRead, updateId, handleSort } =
    useEnquiries();
  return (
    <main className="flex flex-col gap-4">
      <h1>Client Enquiries</h1>
      <div className="w-[70%] flex flex-col gap-4">
        <div className="flex justify-between">
          <input
            type="text"
            className="bg-white text-[.9rem] border border-neutral-400 w-6/12 outline-none p-2"
            placeholder="Search for enquiries"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="self-start w-1/6 space-y-1">
            {/* <div className="">Sort</div> */}
            <select
              name=""
              id=""
              className="w-full border border-neutral-400 bg-white cursor-pointer outline-0 p-2"
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
        </div>
        <div className="">
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
              <div className="flex flex-col gap-3">
                {sortedResult.map((enq) => (
                  <div
                    className={`bg-white border border-neutral-400 flex flex-col gap-6 p-2 hover:-translate-y-[.1rem] transition-transform text-[.9rem] ${
                      enq.read && "opacity-80"
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="">
                        <div>Name : {enq.name}</div>
                        <div className="">
                          Event Date :{" "}
                          {dayjs(enq.event_date).format("Do MMMM YYYY")}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="capitalize">
                          Stage : {enq.stage?.replace("_", " ") ?? "-"}
                        </div>
                        <div>Event : {enq.event ?? "-"}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-end text-[.9rem]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-4">
                          <div>Number : {enq.contact_number}</div>
                          <div>Email : {enq.email || "Not Provided"}</div>
                        </div>
                        <div className="text-neutral-600">
                          Enquired date :{" "}
                          {dayjs(enq.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
                      <button
                        className={`text-[.9rem] underline cursor-pointer ${
                          enq._id === updateId
                            ? "cursor-not-allowed"
                            : enq.read
                              ? "text-black"
                              : "text-purple-700"
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
            <Empty
              head={"No Enquiries Found"}
              note={"Couldn't find any enquiries from the client."}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Enquiries;
