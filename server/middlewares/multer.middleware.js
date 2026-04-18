
import multer from "multer";
import path from "path";
import { ErrorHandler } from "../utilities/customError.utility.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new ErrorHandler("Only images are allowed!", 400), false);;
};

export const upload = multer({
  storage,
  fileFilter,
});
