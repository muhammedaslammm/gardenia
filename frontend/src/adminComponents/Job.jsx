import { PencilSimpleLine, Trash } from "phosphor-react";

const Job = ({ job, update, selected, deleteJob }) => {
  return (
    <div className="bg-[#0f592e]/10 flex justify-between p-4">
      <div className="space-y-4">
        <div>
          <div className="font-medium">{job.title}</div>
          <div className="w-[90%] text-neutral-700">{job.description}</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between lg:items-end w-full">
          <div className="flex flex-col gap-1 lg:gap-0 text-[.9rem]">
            <div className="leading-[1.1rem] lg:gap-0">
              <span className="text-neutral-500">Enquiry Email :</span>{" "}
              <span>{job.enquiry_email}</span>
            </div>
            {job.enquiry_phone && (
              <div>
                <span className="text-neutral-500">Enquiry Phone :</span>{" "}
                <span>{job.enquiry_phone}</span>
              </div>
            )}
          </div>
          <div className="space-x-4 text-[.9rem]">
            <span className="text-neutral-500">Job Role</span>
            <span>{job.job_type}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <PencilSimpleLine
          className={`h-4 w-4 ${
            selected === job._id
              ? "cursor-not-allowed text-neutral-500"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (selected !== job._id) update(job._id);
          }}
        />
        <Trash
          className="h-4 w-4 cursor-pointer"
          onClick={() => deleteJob(job._id)}
        />
      </div>
    </div>
  );
};

export default Job;
