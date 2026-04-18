import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utilities/cloudinary.utility.js";
import { UserModel } from "../model/user.model.js";

export const addUser = asyncHandler(async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    let profilePicUrl = await uploadToCloudinary(req.file.buffer);

    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role ||
      !profilePicUrl
    ) {
      return res.status(400).json({
        message: "All Fields Are Required!",
        success: false,
      });
    }

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res.status(409).json({
        message: "Email Already Exists!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profilePic: profilePicUrl,
    });

    return res.status(201).json({
      message: `${fullName} With Role ${role} Added Successfully`,
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All Fields Are Required!",
        success: false,
      });
    }
    const user = await UserModel.find({ email });
    if (!user.length) {
      return res.status(404).json({
        message: "User Not Found!",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        message: `Welcome back ${user[0].fullName}`,
        user: user[0],
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req._id;

    const user = await UserModel.find({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user: user[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export const logoutUser = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// not in use
// export const updateProfile = async (req, res, next) => {
//   try {
//     const userId = req._id;
//     const { fullName, email, phoneNumber } = req.body;
//     const file = await uploadToCloudinary(req.file.buffer);
//     if (!fullName || !email || !file || !phoneNumber) {
//       return res.status(400).json({
//         message: "All Fields Are Required!",
//         success: false,
//       });
//     }

//     const query = `UPDATE USERS SET fullName = ?, email = ?, phoneNumber = ?,profilePic=? WHERE _id = ?`;
//     await new Promise((resolve, reject) => {
//       sql.query(
//         query,
//         [fullName, email, phoneNumber, file, userId],
//         (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         },
//       );
//     });
//     return res.status(200).json({
//       message: "Profile Updated Successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// not in use
// export const deleteUser = async (req, res, next) => {
//   try {
//     // user id is id of a person admin want to delete (booker or supplier)
//     const userId = req.params.id;

//     const query = `DELETE FROM USERS WHERE _id = ? AND role!="admin"`;
//     const result = await new Promise((resolve, reject) => {
//       sql.query(query, [userId], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//     if (result.affectedRows === 0) {
//       return res.status(400).json({
//         message: "Cannot delete this user (maybe admin or not found)",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "User Deleted Successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      message: "Users Retrieved Successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// export const getSingleUser = async (req, res, next) => {
//   try {
//     const id = req.params;
//     console.log(id);

//     const user = await UserModel.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User Not Found",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       message: "User Retrieved Successfully",
//       success: true,
//       user: user[0],
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      user,
      success: true,
      message: "User Retrieved Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getUsersByRole = async (req, res, next) => {
  try {
    const role = req.params.role;

    const users = await UserModel.find({ role });
    if (!users.length) {
      return res.status(404).json({
        message: `No users found with role: ${role}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Users with role: ${role} Retrieved Successfully`,
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
