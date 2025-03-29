const CustomError = require("../utils/customError");
const { uploadToCloudinary } = require("../services/upload");
const { Order } = require("../models/Order.model");
const { Product } = require("../models/Product.model");

const createOrder = async (req, res, next) => {
  const order = req.body;
  const { cart, bill } = order;

  try {
    if (bill) {
      const result = await uploadToCloudinary(bill);
      order.bill = result.url;
    }

    for (const item of cart) {
      const product = await Product.findById(item.productId);

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
      );

      if (variant.stock < item.quantity) {
        return next(new CustomError("Giao dịch thất bại", 400));
      }
      variant.stock -= item.quantity;
      await product.save();
    }

    // create order successfully
    const newOrder = await new Order(order);
    const saveOrder = await newOrder.save();

    return res.status(201).json({
      status: 201,
      message: "Tạo hóa đơn thành công",
      data: saveOrder,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const fetchOrders = async (req, res, next) => {
  const { page = 1, shipping, isPaid, phone, limit = 5 } = req.query;

  const filters = {
    ...(shipping ? { shipping } : {}),
    ...(phone ? { phone } : {}),
    ...(isPaid ? { isPaid: isPaid === "true" } : {}),
  };

  try {
    const totalRecords = await Order.countDocuments(filters);
    const totalPages = Math.ceil(totalRecords / limit);
    const currentPage = page > totalPages ? 1 : parseInt(page);
    const skip = (currentPage - 1) * limit;

    const orders = await Order.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return res.status(200).json({
      data: orders,
      pagination: { totalRecords, totalPages, currentPage, limit },
      message: "Lấy dữ liệu thành công",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const fetchOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return next(new CustomError("Không tìm thấy sản phẩm", 404));
    }
    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: order,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

const updateStatusOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkId = await Order.findById(id);
    if (!checkId) {
      return next(new CustomError("Không tìm thấy đơn hàng", 404));
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      data: updatedOrder,
      message: "Cập nhật đơn hàng thành công",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) next(new CustomError("Không tìm thấy sản phẩm này", 404));
    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Đã xóa sản phẩm",
      status: 200,
      data: order,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createOrder,
  fetchOrders,
  fetchOrder,
  updateStatusOrder,
  deleteOrder,
};
