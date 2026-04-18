import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axiosInstance.utility.js";

export const createProductThunk = createAsyncThunk(
  "/products/create-product",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products/create-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "/products/updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("/products/updateProduct", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "/products/get-all-products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products/get-all-products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const getSingleProductThunk = createAsyncThunk(
  "/products/get-single-product/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/get-single-product/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const deleteSingleProductThunk = createAsyncThunk(
  "/products/deleteSingleProduct/:id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `/products/deleteSingleProduct/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const deleteAllProductsThunk = createAsyncThunk(
  "/products/deleteAllProducts",
  async ({ rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/products/deleteAllProducts`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);
