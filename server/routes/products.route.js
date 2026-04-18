import express from "express"
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/product.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = express.Router()

productRouter.post("/create-product", upload.single("product_img"), isAuthenticated, isAdmin, createProduct);
productRouter.get("/get-single-product/:id", getSingleProduct);
productRouter.get("/get-all-products", getAllProducts);

export default productRouter;