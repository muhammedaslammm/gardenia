import { getVerified } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "authentication failed, unauthorized" });
  try {
    const token_decoded = getVerified(token);
    req.userId = token_decoded.userId;
    next();
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(401).json({ message: "Unauthorization" });
  }
};

export { authenticate };
