import { image6 } from "../utils/images";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
const Login = () => {
  const { userData, handleInput, submitCredentials, buttonText, errors } =
    useUser();
  return (
    <section className="relative">
      <Link
        to="/"
        className="absolute top-6 left-6 z-100 text-white font-semibold text-[1.4rem]"
      >
        Gardenia
      </Link>
      <div className="lg:h-screen flex flex-col lg:flex-row">
        {/* left */}
        <div className="lg:w-4/6 h-[10rem] lg:h-full relative">
          <img
            src={image6}
            alt="gardenia night image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        {/* right */}
        <div className="relative lg:w-2/6">
          <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[80%]  flex flex-col gap-8 mx-auto my-[2rem] lg:my-[8rem]">
            <div>
              <div className="font--dm-serif-display text-[1.6rem]">
                Log-in to Admin Panel
              </div>
              <div className="font--marriweather">
                Enter your credentials below to use the admin panel of gardenia
                convention center
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>Email</div>
                  {errors.email && (
                    <div className="text-red-800 capitalize text-[.9rem]">
                      {errors.email}
                    </div>
                  )}
                </div>
                <input
                  className="border border-neutral-400/70 p-2 rounded-[.3rem] w-full"
                  type="email"
                  name="email"
                  placeholder="Eg: simon002@gmail.com"
                  value={userData.email}
                  onChange={handleInput}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>Password</div>
                  {errors.password && (
                    <div className="text-red-800 capitalize text-[.9rem]">
                      {errors.password}
                    </div>
                  )}
                </div>
                <input
                  className="border border-neutral-400/70 placeholder:text-neutral-600 text-neutral-400 p-2 rounded-[.3rem] w-full"
                  type="password"
                  name="password"
                  placeholder="Your Secret Passkey***"
                  value={userData.password}
                  onChange={handleInput}
                />
              </div>
              <div>
                <button
                  className={`${
                    errors.login_error ? "bg-red-800" : "bg-[#0f592e]"
                  } text-white font-semibold rounded-[.3rem] w-full p-2 mt-[2rem] cursor-pointer hover:-translate-y-[.1rem] active:translate-y-0 transition`}
                  onClick={submitCredentials}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
