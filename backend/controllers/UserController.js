import User from "../models/UserModel.js";
import { getToken } from "../utils/jwt.js";
import nodemailer from "nodemailer";

export const myDetails = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const userRegistration = async (req, res) => {
  try {
    // const data = req.body;
    // console.log("user data:", data);
    // const user = await User.create({ ...data });
    console.log("hey");
    return res.status(200).json({ message: "user creation cooking..." });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const match = await User.findOne({ email });
    if (match && (await match.comparePassword(password))) {
      const token = getToken(match._id);
      let user = match.toObject();
      delete user.password;
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
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
    } else return res.status(401).json({ message: "authentication failed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await User.find({ role: { $ne: "owner" } });
    return res.json({ users });
  } catch (error) {
    console.log("failed to get users:", error.message);
    return res.status(500).json({ message: error.message });
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
  const { client_name, client_email, phone_number } = req.body;

  let EMAIL_ID = process.env.EMAIL_ID;
  let APP_PASSWORD = process.env.APP_PASSWORD;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ID,
        pass: APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: `"${client_name}" <${EMAIL_ID}>`,
      replyTo: client_email,
      to: EMAIL_ID,
      subject: `New Enquiry from ${client_name}.`,
      html: `
      <div style="max-width:600px; margin:auto; font-family: Arial, sans-serif; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; background:#ffffff;">
  <div style="width:100%; height:.4rem; background-color:green;"></div>
  
  <!-- Header -->
  <div style="padding:1rem">
    
    <div style="">
      <div style="margin-bottom:10px; text-transform:capitalize; font-weight:bold">Gardenia Convention Center Enquiry</div>
    <div style="margin-bottom:5px;">Client Name: ${client_name}</div>
    <div style="margin-bottom:5px;">Client Email: ${client_email}</div>
    <div style="margin-bottom:5px;">Phone Number: ${phone_number}</div>
  </div>
  
  
  <!-- Footer -->
  <p style="margin-top:50px; font-size:12px; color:#777; text-align:center;">
    This enquiry was submitted via your website contact form.
  </p>
  </div>
  
</div>
      `,
    });
    res.status(200).json({ message: "email successfully send" });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
};
