import express from "express";
import {
  clientEnquiry,
  myDetails,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/me", authenticate, myDetails);
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.post("/client-enquiry", clientEnquiry);

export default router;
