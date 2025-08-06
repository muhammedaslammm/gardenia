import jwt from "jsonwebtoken";

const getToken = (user) => {
  const { userID, userName, userRole } = user;
  console.log("token", process.env.JWT_SECRET);
  return jwt.sign({ userID, userName, userRole }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const getVerified = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { getToken, getVerified };
