import app from "./app.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
const PORT = process.env.PORT || 4009;

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    app.listen(PORT, () =>
      console.log("db connected and server listening for request via port 4009")
    );
  } catch (error) {}
};

connectDB();
