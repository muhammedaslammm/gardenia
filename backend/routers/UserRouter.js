import express from "express";
import {
  myDetails,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/UserController.js";
import { authenticate, adminAccess } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/me", authenticate, adminAccess, myDetails);
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
