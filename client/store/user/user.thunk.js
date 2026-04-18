import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axiosInstance.utility";

export const loginUserThunk = createAsyncThunk(
  "/users/login-user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/login-user", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "/users/log-out-user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/log-out-user");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);

export const getUserByRoleThunk = createAsyncThunk(
  "/users/role/:role",
  async ({ role }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/users/role/${role}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message || "getUserRoleThunk Issue!");
    }
  },
);

export const addUserThunk = createAsyncThunk(
  "/users/add-user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/add-user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);

export const getProfileThunk = createAsyncThunk(
  "/users/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/get-profile");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);

export const getSingleUserThunk = createAsyncThunk(
  "/users/user/:id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/users/user/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);
