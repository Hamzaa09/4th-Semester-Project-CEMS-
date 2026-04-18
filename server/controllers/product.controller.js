import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { uploadToCloudinary } from "../utilities/cloudinary.utility.js";
import { ErrorHandler } from "../utilities/customError.utility.js";
import { ProductModel } from "../model/product.model.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    product_title,
    product_type,
    product_quality,
    product_price,
    product_stock,
  } = req.body;
  const file = await uploadToCloudinary(req.file.buffer);

  if (
    !product_title ||
    !product_type ||
    !product_quality ||
    !product_price ||
    !product_stock ||
    !file
  ) {
    return next(new ErrorHandler("All fields are required!", 404));
  }

  const product = await ProductModel.create({
    product_title,
    product_type,
    product_quality,
    product_price,
    product_stock,
    product_img: file,
  });

  res.status(200).json({
    success: true,
    message: "Product added successfully!",
    product,
  });
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product)
    return next(new ErrorHandler("Product doesn't exist!", 404));

  res.status(200).json({
    product: product,
    success: true,
  });
});

// niu
// export const updateProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const {
//     product_title,
//     product_type,
//     product_quality,
//     product_price,
//     product_stock,
//   } = req.body;

//   const file = await uploadToCloudinary(req.file.buffer);

//   if (
//     !product_title ||
//     !product_type ||
//     !product_quality ||
//     !product_price ||
//     !product_stock ||
//     !file
//   ) {
//     return next(new ErrorHandler("All fields are required!", 404));
//   }

//   const query = `
//         UPDATE PRODUCT SET product_title =? ,product_type=?,product_quality = ?,product_price=?, product_stock=? WHERE product_id= ${id};
//     `;

//   const product = await new Promise((resolve, reject) => {
//     sql.query(
//       query,
//       [
//         product_title,
//         product_type,
//         product_quality,
//         product_price,
//         product_stock,
//         file,
//       ],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       },
//     );
//   });

//   res.status(200).json({
//     success: true,
//     message: "Product updated successfully!",
//     product: product,
//   });
// });

// niu
// export const deleteSingleProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const query = `delete from PRODUCT where product_id=${id}`;

//   const product = await new Promise((resolve, reject) => {
//     sql.query(query, (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
//   if (!product.affectedRows == 1) {
//     return res.status(404).json({
//       message: "Product with this ID is not present.",
//       success: false,
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Product Deleted Successfully!",
//     product,
//   });
// });

// niu
// export const deleteAllProducts = asyncHandler(async (req, res) => {
//   const query = `truncate table product`;

//   const result = await new Promise((resolve, reject) => {
//     sql.query(query, (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });

//   res.status(200).json({
//     success: true,
//     message: "All Products Deleted!",
//     result,
//   });
// });

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.find();

  if (!product.length)
    return res.status(404).json({
      message: "No Products Found.",
      success: false,
    });

  res.status(200).json({
    product,
    success: true,
  });
});
