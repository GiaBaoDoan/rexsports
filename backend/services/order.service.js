const httpStatus = require("../constants/httpStatus");
const MESSAGE = require("../constants/messages");
const { Order } = require("../models/Order.model");
const CustomError = require("../utils/customError");
const getPagination = require("../utils/pagination.util");
const { getProductById } = require("./product.service");
const sendEmail = require("../utils/email.util");
const generateOrderEmail = require("../constants/OrderEmail");
const TYPE_EMAIL = require("../constants/typeEmail");
const Product = require("../models/Product.model");

const getAllOrders = async ({ shipping, isPaid, phone, limit, page }) => {
  const filters = {
    ...(shipping ? { shipping } : {}),
    ...(phone ? { phone } : {}),
    ...(isPaid ? { isPaid: isPaid === "true" } : {}),
  };

  const totalRecords = await Order.countDocuments(filters);

  const { skip, currentPage, totalPages } = getPagination(
    totalRecords,
    parseInt(page),
    parseInt(limit)
  );

  const orders = await Order.find(filters)
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  return {
    orders,
    pagination: { totalRecords, totalPages, currentPage, limit },
  };
};

const getOrderById = async (id) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new CustomError(MESSAGE.ORDER.NOT_FOUND, httpStatus.NOT_FOUND);
  }
  return order;
};

const createOrder = async (order) => {
  for (const cart of order.cart) {
    const product = await getProductById(cart.productId);

    const variant = product.variants.find(
      (v) => String(v._id) === cart.variantId
    );

    if (!variant || variant.stock < cart.quantity) {
      throw new Error(MESSAGE.ORDER.FAILED, httpStatus.BAD_REQUEST);
    }
  }

  const newOrder = await Order.create(order);

  return newOrder;
};

const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    throw new CustomError(MESSAGE.NOT_FOUND, httpStatus.NOT_FOUND);
  }
  return order;
};

const updateOrder = async (id, data) => {
  const order = await getOrderById(id);

  if (data.isPaid) {
    for (const cart of order.cart) {
      await Product.findByIdAndUpdate(cart.productId, {
        $inc: { sold: cart.quantity },
      });
    }
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });

  return updatedOrder;
};

const sendOrderConfirmationEmail = async (orderId) => {
  const order = await getOrderById(orderId);
  const html = generateOrderEmail(order);
  await sendEmail(order.email, TYPE_EMAIL.order, html);
  return order;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
  sendOrderConfirmationEmail,
};
