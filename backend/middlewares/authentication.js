import User from "../models/UserModel.js";
import { getVerified } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "authentication failed, unauthorized" });
  try {
    const payload = getVerified(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(401).json({ message: "Unauthorization" });
  }
};

const validateUser = async (req, res, next) => {
  let role = req.body.role;

  let user = await User.findOne({ _id: req.userId }).select("role");

  if (!user)
    return res.status(401).json({ message: "Failed : User creation rejected" }); //rare case
  if (
    user.role === "staff" ||
    (user.role == "supervisor" && ["owner", "supervisor"].includes(role))
  )
    return res.status(403).json({ message: "Failed : User creation rejected" });

  next();
};

export { authenticate, validateUser };
