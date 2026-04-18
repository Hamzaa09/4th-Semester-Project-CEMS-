// middleware/isAdmin.js

import { UserModel } from "../model/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.find({ role: "admin" });

    if (!user.length || user[0].role !== "admin") {
      return res.status(403).json({
        message: "Access Denied! Admins Only",
        success: false,
      });
    }

    next(); // user is admin, continue
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAdmin;
