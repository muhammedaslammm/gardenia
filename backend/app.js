import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routers/UserRouter.js";
import adminRouter from "./routers/AdminRouter.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

export default app;
