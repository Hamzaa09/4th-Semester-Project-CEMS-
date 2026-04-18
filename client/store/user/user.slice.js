import { createSlice } from "@reduxjs/toolkit";
import {
  getProfileThunk,
  getUserByRoleThunk,
  loginUserThunk,
  logoutUserThunk,
} from "./user.thunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    bookers: [],
    suppliers: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });

    builder
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });

    builder
      .addCase(getUserByRoleThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserByRoleThunk.fulfilled, (state, action) => {
        state.bookers = action.payload.users.filter(
          (user) => user.role === "booker"
        );
        state.suppliers = action.payload.users.filter(
          (user) => user.role === "supplier"
        );
      })
      .addCase(getUserByRoleThunk.rejected, (state, action) => {
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export default userSlice.reducer;