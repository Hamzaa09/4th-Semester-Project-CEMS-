import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import productSlice from "./product/product.slice";
import orderSlice from "./order/order.slice";

export const store = configureStore({
  reducer: {
    userSlice,
    productSlice,
    orderSlice,
  },
});
