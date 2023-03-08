import express from "express";
import {
  authorizeUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.route("/signup").post(asyncHandler(registerUser));
router.route("/login").post(authorizeUser);
router.route("/logout").post(logoutUser);

export default router;
