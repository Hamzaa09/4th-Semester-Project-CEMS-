// middleware/isAdmin.js

import { UserModel } from "../model/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req._id); // ← from isAuthenticated

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied! Admins Only",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export default isAdmin;
