import app from "./app.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://gardenia:gardeniapass1@cluster0.i9fvp9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    app.listen(4009, () =>
      console.log("db connected and server listening for request via port 4009")
    );
  } catch (error) {}
};

connectDB();
