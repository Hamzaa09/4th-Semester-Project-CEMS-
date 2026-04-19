import { Router } from "express";
import { getPayment, getSession } from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const paymentRouter = Router();

paymentRouter.post("/payment", isAuthenticated, getPayment);
paymentRouter.get("/session/:id", isAuthenticated, getSession);

export default paymentRouter;
