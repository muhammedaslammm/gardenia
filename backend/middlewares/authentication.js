import { getVerified } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "authentication failed, unauthorized" });
  try {
    const token_decoded = getVerified(token);
    req.user = token_decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorization" });
  }
};

const adminAccess = (req, res, next) => {
  const user_role = req.user?.userRole;
  if (user_role !== "admin")
    res.status(403).json({ message: "Authorization denied" });
  else next();
};

export { authenticate, adminAccess };
