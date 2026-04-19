import { Router } from "express";
import { getPayment, getSession } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/payment", getPayment);
paymentRouter.get("/session/:id", getSession);

export default paymentRouter;
