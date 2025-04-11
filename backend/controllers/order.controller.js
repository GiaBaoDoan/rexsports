const { parse } = require("dotenv");
const httpStatus = require("../constants/httpStatus");
const MESSAGE = require("../constants/messages");
const OrderServices = require("../services/order.service");

const createOrder = async (req, res, next) => {
  try {
    const order = await OrderServices.createOrder(req.body);

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: MESSAGE.ORDER.CREATED,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  const { shipping, isPaid, phone, limit = 10, page = 1 } = req.query;
  try {
    const { orders, pagination } = await OrderServices.getAllOrders({
      shipping,
      isPaid,
      phone,
      limit,
      page,
    });

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.ORDER.FETCHED_ALL,
      data: orders,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderServices.getOrderById(req.params.id);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.ORDER.FETCHED,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const UpdateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await OrderServices.updateOrder(
      req.params.id,
      req.body
    );

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.ORDER.UPDATED,
      data: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderServices.deleteOrder(req.params.id);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.ORDER.DELETED,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  UpdateOrder,
  deleteOrder,
};
