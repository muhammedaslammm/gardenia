import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import adminRouter from "./routers/AdminRouter.js";

const app = express();
const allowedOrigins = [
  "http:localhost:5173",
  "https://gardeniaconventioncenter.in",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

export default app;
