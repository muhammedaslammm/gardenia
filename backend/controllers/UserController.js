import User from "../models/UserModel.js";
import { getToken } from "../utils/jwt.js";

export const myDetails = (req, res) => {
  console.log("user at myDetails:", req.user);
  res.status(200).json({ user: req.user });
};

export const userRegistration = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create({ ...data, role: "admin" });
    const token = getToken({
      userID: user._id,
      userName: user.username,
      userRole: user.role,
    });
    return res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const match = await User.findOne({ email });
    if (match && (await match.comparePassword(password))) {
      const token = getToken({
        userID: match._id,
        userName: match.username,
        userRole: match.role,
      });
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({
          messge: "user authenticated",
          user: {
            userId: match._id,
            userName: match.username,
            userRole: match.role,
          },
        });
    } else return res.status(401).json({ message: "authentication failed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "user logged out" });
};
