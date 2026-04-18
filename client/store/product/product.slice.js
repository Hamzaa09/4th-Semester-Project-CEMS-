import { createSlice } from "@reduxjs/toolkit";
import {
  createProductThunk,
  deleteAllProductsThunk,
  deleteSingleProductThunk,
  getAllProductsThunk,
  getSingleProductThunk,
  updateProductThunk,
} from "./product.thunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    singleProduct: null,
    allProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(getSingleProductThunk.pending, (state) => {})
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.singleProduct = action.payload.product;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {});

    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.allProducts = action.payload.product;
        state.loading = false;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(deleteSingleProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSingleProductThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSingleProductThunk.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(deleteAllProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
