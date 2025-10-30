import jwt from "jsonwebtoken";

const getToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getVerified = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { getToken, getVerified };
