import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_title: { type: String, required: true },
    product_type: { type: String, required: true },
    product_quality: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_stock: { type: Number, required: true },
    product_img: { type: String, required: true },
  },
  { timestamps: true },
);

ProductSchema.index({product_title: 1})

export const ProductModel = mongoose.model("PRODUCT", ProductSchema);