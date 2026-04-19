export const getPayment = asyncHandler(async (req, res) => {
  const { products: orderedProducts } = req.body;

  // ✅ log orderedProducts not products
  console.log("🔥 orderedProducts:", JSON.stringify(orderedProducts));

  const product_ids = orderedProducts.map(
    (prod) => new mongoose.Types.ObjectId(prod.productId),
  );

  const dbProducts = await ProductModel.find({ _id: { $in: product_ids } });

  const lineItems = orderedProducts.map((orderedItem) => {
    const dbProduct = dbProducts.find(
      (p) => p._id.toString() === orderedItem.productId,
    );

    return {
      price_data: {
        currency: "usd",
        product_data: { name: dbProduct.product_title },
        unit_amount: dbProduct.product_price * 100,
      },
      quantity: orderedItem.quantity || 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  res.status(200).json({ url: session.url });
});