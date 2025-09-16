import User from "../models/UserModel.js";
import { getToken } from "../utils/jwt.js";
import nodemailer from "nodemailer";

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
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
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
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({
          message: "user authenticated",
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
  res
    .clearCookie("token", { httpOnly: true, sameSite: "none", secure: true })
    .status(200)
    .json({ message: "user logged out" });
};

// client enquiry
export const clientEnquiry = async (req, res) => {
  console.log("user enquiry:", req.body);
  const {
    client_name,
    client_email,
    phone_number,
    event_name,
    event_date,
    enquiry_date,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammedbinramli@gmail.com",
        pass: "euay gczf vjsw botq",
      },
    });
    await transporter.sendMail({
      from: client_email,
      to: "muhammedbinramli@gmail.com",
      subject: `New Hall Enquiry from ${client_name}.`,
      text: "",
    });
    console.log(`Email send from ${client_email}`);
    res.status(200).json({ message: "email successfully send" });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
};
