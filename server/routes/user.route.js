import express from "express";
import {
  addUser,
  getAllUsers,
  getProfile,
  getSingleUser,
  getUsersByRole,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.middleware.js";
const userRouter = express.Router();

userRouter.post(
  "/add-user",
  upload.single("profilePic"),
  isAuthenticated,
  isAdmin,
  addUser,
);
userRouter.post("/login-user", loginUser);
userRouter.post("/logout-user", logoutUser);
userRouter.get("/role/:role", getUsersByRole);
userRouter.get("/get-profile", isAuthenticated, getProfile);
userRouter.get("/user/:id", isAuthenticated, isAdmin, getSingleUser);
userRouter.get("/get-all-users", isAuthenticated, isAdmin, getAllUsers);

export default userRouter;
