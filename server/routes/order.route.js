import express from "express";
import {
  getOrderById,
  getOrders,
  getOrdersAdmin,
  placeOrder,
  updateStatus,
} from "../controllers/order.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuthenticated, placeOrder);
orderRouter.get("/get-all-orders", isAuthenticated, getOrders);
orderRouter.get("/get-all-orders-admin", isAuthenticated, getOrdersAdmin);
orderRouter.get("/get-order/:order_id", isAuthenticated, getOrderById);
orderRouter.put(
  "/update-order-status/:order_id",
  isAuthenticated,
  updateStatus
);
export default orderRouter;
