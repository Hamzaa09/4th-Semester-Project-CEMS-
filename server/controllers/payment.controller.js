import Stripe from "stripe";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { ProductModel } from "../model/product.model.js";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getPayment = asyncHandler(async (req, res, next) => {
  const { products: orderedProducts } = req.body; // ✅ extract orderedProducts

  if (!orderedProducts || orderedProducts.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  // Convert to ObjectId
  const product_ids = orderedProducts.map(
    (prod) => new mongoose.Types.ObjectId(prod.productId),
  );

  // Fetch from DB
  const products = await ProductModel.find({ _id: { $in: product_ids } });

  // Map to Stripe line items
  const lineItems = orderedProducts.map((orderedItem) => {
    const dbProduct = products.find(
      (p) => p._id.toString() === orderedItem.productId,
    );

    if (!dbProduct) {
      throw new Error(`Product not found: ${orderedItem.productId}`);
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: dbProduct.product_title,
          images: [dbProduct.product_img],
        },
        unit_amount: dbProduct.product_price * 100,
      },
      quantity: orderedItem.quantity || 1,
    };
  });

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  res.status(200).json({ id: session.id, url: session.url });
});

export const getSession = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const session = await stripe.checkout.sessions.retrieve(id);

  res.json({ session });
});
