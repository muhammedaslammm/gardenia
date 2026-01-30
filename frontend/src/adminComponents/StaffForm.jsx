import { useForm } from "react-hook-form";
import InputLabel from "./InputLabel";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const StaffForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(AuthContext);

  const submitForm = async (values) => {
    try {
      delete values.confirm_password;
      console.log("staff data:", values);
      //   let response = await fetch(`${BACKEND_URL}/users/register`, {});
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="w-2/6 bg-white border border-neutral-300 flex flex-col gap-4 p-2">
      <div className="space-y-1">
        <h1 className="text-[1.1rem] font--inter-tight font-semibold">
          Handle User
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="h-full flex flex-col gap-2"
      >
        <div className="space-y-1">
          <InputLabel title="Username" error={errors?.username?.message} />
          <input
            type="text"
            placeholder="Eg : Rony"
            className="a--input"
            {...register("username", { required: "Required" })}
          />
        </div>
        <div className="space-y-1">
          <InputLabel title="Email" error={errors?.email?.message} />
          <input
            type="email"
            placeholder="Eg : rony02@gmail.com"
            className="a--input"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email",
              },
            })}
          />
        </div>
        <div className="space-y-1">
          <InputLabel title="Password" error={errors?.password?.message} />
          <input
            type="password"
            placeholder="******"
            className="a--input"
            {...register("password", {
              required: "Required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
        </div>
        <div className="space-y-1">
          <InputLabel
            title="Confirm Password"
            error={errors?.confirm_password?.message}
          />
          <input
            type="password"
            placeholder="******"
            className="a--input"
            {...register("confirm_password", {
              required: "Required",
              validate: (value, formValues) =>
                value === formValues.password || "Password not match",
            })}
          />
        </div>

        <button
          type="submit"
          className="mt-auto bg-black text-white font-medium py-3 cursor-pointer"
        >
          Submit User Data
        </button>
      </form>
    </section>
  );
};

export default StaffForm;
