import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {

//         const token = req.cookies.token
//         if (!token) {
//             return res.status(401).json({
//                 message: "User Is Not Authenticated!",
//                 success: false,
//             })
//         }
//         const decode = jwt.verify(token, process.env.SECRET_KEY)
//         if (!decode) {
//             return res.status(401).json({
//                 message: "Invalid Token!",
//                 success: false,
//             })
//         }
//         req._id = decode.userId //  attach user id to request object and can be used in the controller by using req._id
//         next() // to pass the control to the next middleware or controller
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: "Something Went Wrong!",
//             success: false,
//         })
//     }
// }

const isAuthenticated = async (req, res, next) => {
  try {
    // console.log("auth header:", req.headers.authorization); // add this
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req._id = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong!", success: false });
  }
};

export default isAuthenticated;
