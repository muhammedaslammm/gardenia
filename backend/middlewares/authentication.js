import User from "../models/UserModel.js";
import { getVerified } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "authentication failed, unauthorized" });
  try {
    const payload = getVerified(token);
    req.userId = payload.userId;

    let user = await User.findOne({ _id: req.userId }).select("role blocked");
    if (!user)
      return res
        .status(401)
        .json({ message: "Request Denied : User not authenticated" });
    if (user.blocked)
      return res
        .status(403)
        .json({ message: "Request Denied : Authorization failed" });

    req.userRole = user.role;
    next();
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(401).json({ message: "Unauthorization" });
  }
};

const validateUser = async (req, res, next) => {
  let role = req.body.role;
  let userRole = req.userRole;
  if (
    userRole === "staff" ||
    (userRole === "supervisor" && ["owner", "supervisor"].includes(role))
  )
    return res.status(403).json({ message: "Failed : Request rejected" });

  next();
};

export { authenticate, validateUser };
