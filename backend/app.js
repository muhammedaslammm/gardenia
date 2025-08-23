import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import jobRouter from "./routers/JobRouter.js";
import eventRouter from "./routers/EventRouter.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://www.gardeniaconventioncenter.in",
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
app.use("/api/jobs", jobRouter);
app.use("/api/events", eventRouter);

export default app;
