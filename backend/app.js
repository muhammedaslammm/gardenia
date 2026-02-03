import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import jobRouter from "./routers/JobRouter.js";
import eventRouter from "./routers/EventRouter.js";
import eventDateRouter from "./routers/DateRouter.js";
import blockRouter from "./routers/BlockRouter.js";
import enquiryRouter from "./routers/EnquiryRouter.js";
import galleryRouter from "./routers/GalleryRouter.js";
import clientRouter from "./routers/ClientRouter.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://www.gardeniaconventioncenter.in",
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
  }),
);

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api", clientRouter);
app.use("/api", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api", eventRouter);
app.use("/api", eventDateRouter);
app.use("/api", blockRouter);
app.use("/api", enquiryRouter);
app.use("/api", galleryRouter);

export default app;
