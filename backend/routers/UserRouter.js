import express from "express";
import {
  clientEnquiry,
  deleteUser,
  getUsers,
  handleBlock,
  myDetails,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/UserController.js";
import { authenticate, validateUser } from "../middlewares/authentication.js";
const router = express.Router();

router.get("/users/me", authenticate, myDetails);
router.post("/users/register", authenticate, validateUser, userRegistration);
router.post("/users/login", userLogin);
router.post("/users/logout", userLogout);
router.post("/users/client-enquiry", clientEnquiry);
router.get("/users", authenticate, getUsers);
router.patch("/users/:id", authenticate, validateUser, handleBlock);
router.delete("/users/:id", authenticate, validateUser, deleteUser);

export default router;
