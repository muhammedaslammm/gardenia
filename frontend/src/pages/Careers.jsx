import useJobs from "../hooks/useJobs.js";

export default function Careers() {
  const { jobs } = useJobs();
  return (
    <div className="py-17 lg:py-20 min-h-[100svh] w-[90%] xl:w-[85%] mx-auto space-y-4">
      {jobs.length === 0 ? (
        <div className="p-6 bg-[#0f592e]/10 rounded-[.3rem]">
          <div className="text-[1.8rem] font--dm-serif-display text-[#0f592e]">
            Nothing Found
          </div>
          <div className="font--inter-tight text-[1.2rem] text-[#0f592e]">
            We couldn't find any job openings in Gardenia Convention Center
            right now!
          </div>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-8  min-h-[80svh]">
          {/* <h1 className="heading--section !font-medium !normal-case underline">
            Available job openings
          </h1> */}
          <div className="grid grid-cols-1 lg:grid-cols-1">
            {jobs.map((job) => (
              <div className="flex flex-col gap-8 border-b border-neutral-400 py-10 first:pt-0 last:border-b-0">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h2 className="lg:text-[1.2rem] font-semibold text-[#0f592e] font--marriweather">
                      {job.title}
                    </h2>
                    <div
                      className="flex space-x-1 items-center self-start text-[.7rem]  lg:text-[.9rem] font-semibold bg-[#0f592e2b] text-[#0f592e] py-1 px-2"
                      style={{ fontFamily: "Inter Tight, serif" }}
                    >
                      Actively Hiring
                    </div>
                  </div>

                  <div className="lg:text-[1.1rem] leading-[1.3rem] text-neutral-800 font--inter-tight">
                    {job.description}
                  </div>
                </div>
                <div className="font--inter-tight text-[.9rem] md:text-[1rem] flex flex-col lg:flex-row justify-between lg:items-center gap-2 md:gap-0">
                  <div className="flex items-center gap-4 ">
                    <div className="text-neutral-500">Job Type</div>
                    <div>{job.job_type}</div>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-2 ">
                    <div className="text-neutral-500">Contact :</div>
                    <div className="flex flex-col md:flex-row md:gap-2">
                      {[job?.enquiry_email, job?.enquiry_phone].join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
