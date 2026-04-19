import mongoose from "mongoose";
import { OrderModel } from "../model/order.model.js";
import { UserModel } from "../model/user.model.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { shop_name, products, address, booker_id, payment_type } = req.body;

    if (!shop_name || !products || !address || !booker_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let suppliers = await UserModel.find({ role: "supplier" }).select("_id");
    const randomIndex = Math.floor(Math.random() * suppliers.length);
    const supplier_id = suppliers[randomIndex]._id;
    const total_price = products.reduce(
      (sum, product) => sum + Number(product.price) * Number(product.quantity),
      0,
    );

    const data = {
      shop_name,
      address,
      booker_id,
      product_items: products,
      supplier_id,
      total_price,
      payment_type,
    };

    const order = await OrderModel.create(data);

    return res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      supplier_assigned: supplier_id,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { booker, id } = req.query;

    const field = booker === "true" ? "booker_id" : "supplier_id";

    const orders = await OrderModel.find({ [field]: id });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrdersAdmin = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await OrderModel.findById(order_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// niuF
// export const deleteOrder = async (req, res) => {
//   try {
//     const { order_id } = req.params;
//     const query = `DELETE FROM ORDERS WHERE order_id = ${order_id}`;
//     const order = await new Promise((resolve, reject) => {
//       sql.query(query, [order_id], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//     if (order.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Order deleted successfully!",
//       order,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { shop_name, booker_id, product_id, supplier_id, status } = req.body;
    if (!shop_name || !booker_id || !product_id || !supplier_id || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      order_id,
      {
        shop_name,
        booker_id,
        product_id,
        supplier_id,
        status,
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      order,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      order_id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      order,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
