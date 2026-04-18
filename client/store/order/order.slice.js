import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getOrderAdminThunk,
  getOrderThunk,
  getSingleOrderThunk,
  placeOrderThunk,
  updateOrderStatusThunk,
} from "./order.thunk";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to place order";
      });

    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.successMessage = action.payload.message;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to place order";
      });

    builder
      .addCase(getOrderAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getOrderAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.successMessage = action.payload.message;
      })
      .addCase(getOrderAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to place order";
      });

    builder
      .addCase(getSingleOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getSingleOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.successMessage = action.payload.message;
      })
      .addCase(getSingleOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to place order";
      });

    builder
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.successMessage = action.payload.message;
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to place order";
      });
  },
});

export const { clearMessage } = orderSlice.actions;
export default orderSlice.reducer;
