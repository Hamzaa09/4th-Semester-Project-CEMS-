import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axiosInstance.utility";

export const placeOrderThunk = createAsyncThunk(
  "/orders/place-order",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/orders/place-order", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Server Error");
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  "/orders/get-all-orders",
  async ({ booker, id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/orders/get-all-orders?booker=${booker}&id=${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Server Error");
    }
  }
);

export const getOrderAdminThunk = createAsyncThunk(
  "/orders/get-all-orders-admin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/get-all-orders-admin`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Server Error");
    }
  }
);

export const getSingleOrderThunk = createAsyncThunk(
  "/orders/get-order/:order_id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/get-order/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Server Error");
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "/orders/update-order-status/:order_id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/orders/update-order-status/${id}`,
        {
          status: "delivered",
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Server Error");
    }
  }
);
