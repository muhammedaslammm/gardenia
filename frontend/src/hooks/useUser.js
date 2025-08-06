import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";

export const useUser = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Log In");
  const { userLogin, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const submitCredentials = async () => {
    let errors = {};
    Object.entries(userData).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = `${key} required`;
      else if (
        key === "email" &&
        value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        errors[key] = "Invalid Email";
    });
    if (Object.values(errors).length) {
      return setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }

    let login_result = await userLogin(userData);

    if (!login_result) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        login_error: "Invalid email or password",
      }));
      setButtonText("Invalid Username or Password");
      setTimeout(() => {
        setButtonText("Log In");
        setErrors({});
      }, 2500);
      return;
    }

    navigate("/admin/events");
  };

  const handleLogout = async () => {
    const logout_result = await userLogout();
    if (logout_result) navigate("/admin-login");
    else toast.error("Logging Out Failed");
  };

  return {
    userData,
    handleInput,
    submitCredentials,
    handleLogout,
    buttonText,
    errors,
  };
};
