import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    shop_name: { type: String, required: true },
    address: { type: String, required: true },
    booker_id: { type: String, required: true },
    supplier_id: { type: String, required: true },
    product_items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PRODUCT",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    status: { type: String, default: "processing" },
    payment_type: { type: String, required: true },
  },
  { timestamps: true },
);

OrderSchema.index({ booker_id: 1 });
OrderSchema.index({ supplier_id: 1 });

export const OrderModel = mongoose.model("ORDER", OrderSchema);
