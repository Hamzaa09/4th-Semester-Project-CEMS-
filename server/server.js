import express from "express";
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/products.route.js";
import orderRouter from "./routes/order.route.js";
import cors from "cors";
import { connectDB } from "./connection/mongo.connection.js";
import paymentRouter from "./routes/payment.route.js";

//configs
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

//middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/stripe", paymentRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.use(errorMiddleware); // ✅ always last

// app.listen(port, () => {
//     console.log(`listening on http://localhost:${port}`);
// });

export default app;
