import useJobs from "../hooks/useJobs";
import Empty from "./Empty";
import { Spinner } from "phosphor-react";
import { Toaster, toast } from "sonner";
import Job from "./Job";

const Jobs = () => {
  const {
    jobs,
    newJob,
    handleEntry,
    submitNewJob,
    updateJob,
    deleteJob,
    updateChild,
    buttonState,
    errors,
  } = useJobs();
  const buttonStyle =
    buttonState === "success"
      ? "bg-[#0f592e]"
      : buttonState === "error"
      ? "bg-red-800"
      : buttonState === "loading !py-1"
      ? "bg-[#081e10]/60 cursor-not-allowed"
      : buttonState === "update"
      ? "bg-yellow-800"
      : "bg-[#081e10]/95";

  const buttonText =
    buttonState === "success" ? (
      "Job Successfully Created"
    ) : buttonState === "error" ? (
      "Job Creation Failed"
    ) : buttonState === "loading" ? (
      <div className="flex items-center justify-center">
        <Spinner className="animate-spin h-6 w-6" />
      </div>
    ) : buttonState === "update" ? (
      "Update Job"
    ) : (
      "Create New Job"
    );
  return (
    <>
      <Toaster position="top-center" richColors={true} />
      <section className="flex flex-col lg:flex-row ">
        <div className="lg:w-4/6 border-b pb-8 lg:pb-0 lg:border-r lg:pr-8 border-neutral-400 ">
          {jobs.length ? (
            <div className="space-y-2">
              <div className="font-semibold">Jobs Posted</div>
              <div className="space-y-2 w-full">
                {jobs.map((job) => (
                  <Job
                    job={job}
                    update={updateJob}
                    selected={updateChild}
                    deleteJob={deleteJob}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Empty
              head={"No Jobs Added"}
              note={
                "We couldn't find any jobs. You need to add available openings inorder for the publec to get aware of."
              }
            />
          )}
        </div>
        <div className="mx-auto w-full md:w-[80%] lg:w-2/6 text-black pt-8 lg:pt-0 lg:pl-8 font--inter-tight space-y-4 rounded-[.3rem]">
          <div className=" font-semibold text-[1.2rem] ">
            {updateChild
              ? "Update the Selected Job..."
              : "Add new Job Openings here..."}
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div>Job Title</div>
                {errors.title && (
                  <div className="a--input-error">{errors.title}</div>
                )}
              </div>
              <input
                type="text"
                name="title"
                className="a--input"
                placeholder="Eg: Manager"
                value={newJob.title}
                onChange={handleEntry}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div>Description</div>
                {errors.description && (
                  <div className="a--input-error">{errors.description}</div>
                )}
              </div>

              <textarea
                name="description"
                id=""
                rows={4}
                className="a--input"
                placeholder="We are looking for an experienced and passionate candidate who ..."
                value={newJob.description}
                onChange={handleEntry}
              ></textarea>
            </div>
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div>Job Type</div>
                {errors.job_type && (
                  <div className="a--input-error">{errors.job_type}</div>
                )}
              </div>

              <select
                name="job_type"
                id=""
                className="a--input"
                value={newJob.job_type}
                onChange={handleEntry}
              >
                <option value="" disabled>
                  Select a job type
                </option>
                {["Full Time", "Part Time", "Intern", "Trainee"].map((role) => (
                  <option value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div>Enquiry Email</div>
                {errors.enquiry_email && (
                  <div className="a--input-error">{errors.enquiry_email}</div>
                )}
              </div>
              <input
                type="email"
                name="enquiry_email"
                placeholder="Eg: xyz093@gmail.com"
                className="a--input"
                value={newJob.enquiry_email}
                onChange={handleEntry}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-end justify-between">
                <div>Enquiry Phone Number (Optional)</div>
                {errors.enquiry_phone && (
                  <div className="a--input-error">{errors.enquiry_phone}</div>
                )}
              </div>

              <input
                type="tel"
                name="enquiry_phone"
                placeholder="Eg: 9998978937"
                className="a--input"
                value={newJob.enquiry_phone}
                onChange={handleEntry}
              />
            </div>
            <button
              disabled={["loading", "success", "error"].includes(buttonState)}
              className={`mt-8 w-full text-center text-white font-semibold py-2 cursor-pointer hover:-translate-y-[.1rem] active:translate-y-0 transition ${buttonStyle}`}
              onClick={submitNewJob}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
