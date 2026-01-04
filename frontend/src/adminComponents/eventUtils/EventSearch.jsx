import { Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const EventSearch = () => {
  let [results, setResults] = useState(null);
  let [query, setQuery] = useState("");
  let [loading, setLoading] = useState(false);
  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  let mounted = useRef(false);
  let debounce = useRef(null);
  let containerRef = useRef(null);

  useEffect(() => {
    let handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setResults(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    if (!query.trim()) return setResults(null);
    debounce.current = setTimeout(async () => {
      try {
        setLoading(true);
        let response = await fetch(
          `${BACKEND_URL}/api/events/search?query=${query}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        setLoading(false);
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("search result:", result.events);
        setResults(result.events);
      } catch (error) {
        console.log(error.message);
      }
    }, 100);
  }, [query]);
  return (
    <div className="w-[25rem] relative" ref={containerRef}>
      <input
        type="text"
        className="w-full border border-neutral-400 bg-white outline-none px-2 py-1 placeholder:!text-neutral-500"
        placeholder="Search events here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results && (
        <div className="absolute left-0 right-0 max-h-[20rem] overflow-y-scroll bg-white p-4 shadow-xl z-300">
          {loading ? (
            <Spinner className="animate-spin" />
          ) : results.length ? (
            results.map((event) => (
              <Link
                className="flex justify-between text-[.9rem] py-2 border-b border-neutral-300 last:border-0 cursor-pointer hover:bg-neutral-100 transition-colors"
                to={`/admin/events/${event._id}`}
              >
                <div className="leading-[1.1rem]">
                  <div>
                    Event Name :{" "}
                    <span className="font-medium">{event.event_name}</span>
                  </div>
                  <div>
                    Event : <span className="font-medium">{event.event}</span>
                  </div>
                  <div>
                    Booker name :{" "}
                    <span className="font-medium">{event.booker_name}</span>
                  </div>
                </div>
                <div className="font-semibold">#{event.booking_number}</div>
              </Link>
            ))
          ) : (
            <div>No results found!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
