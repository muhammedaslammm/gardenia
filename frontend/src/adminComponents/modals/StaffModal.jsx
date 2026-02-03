import { useForm } from "react-hook-form";
import InputLabel from "../InputLabel";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner, X } from "phosphor-react";
import { toast } from "sonner";

const StaffModal = ({ refetch, open }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    },
  });

  let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const submitForm = async (values) => {
    delete values.confirm_password;
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      reset();
      refetch();
      open(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getElements = () => {
    switch (user?.role) {
      case "owner":
        return ["supervisor", "staff"];
      case "supervisor":
        return ["staff"];
      default:
        break;
    }
  };

  return (
    <div className="w-[30rem] bg-white space-y-4 font--inter-tight p-6">
      <div className="flex justify-between items-center">
        <div className="font--dm-serif-display font-medium text-[1.6rem]">
          Manage Staff Personal
        </div>
        <div onClick={() => open(false)} className="cursor-pointer">
          <X className="w-[1.3rem] h-[1.3rem] text-red-700" weight="bold" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="h-full flex flex-col gap-3"
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
        <div className="space-y-2 mt-2">
          <InputLabel title="User Role" error={errors?.role?.message} />
          <div className="flex items-center gap-[2rem]">
            {getElements().map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  id={item}
                  value={item}
                  {...register("role", { required: "Required" })}
                />
                <label htmlFor={item} className="capitalize">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`mt-[4rem] bg-black text-white font-medium py-3 ${loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              Submitting{" "}
              <Spinner className="w-[1.2rem] h-[1.2rem] animate-spin" />
            </div>
          ) : (
            "Submit User Data"
          )}
        </button>
      </form>
    </div>
  );
};

export default StaffModal;
