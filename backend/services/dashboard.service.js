const dayjs = require("dayjs");
const ORDER_STATUS = require("../constants/orderStatus");
const { Order } = require("../models/Order.model");
const User = require("../models/User.model");
const calculateRevenueByOrders = require("../utils/calculate");

const getOverview = async (time) => {
  const orders = await Order.find({
    createdAt: { $gte: time },
    isPaid: true,
  });

  const totalRevenue = calculateRevenueByOrders(orders);

  return { total: totalRevenue, orderCount: orders.length };
};

const getReport = async (params) => {
  const today = dayjs().startOf("day");

  const { from = today, to = today.add(7, "day") } = params;

  const [users, orders] = await Promise.all([
    User.find({ verified: true }),
    Order.find({
      createdAt: { $gte: from, $lte: to },
    }),
  ]);

  const ordersToday = orders.filter(
    (order) => new Date(order.createdAt) >= from
  );

  const usersToday = users.filter((user) => new Date(user.createdAt) >= from);

  const totalRevenue = calculateRevenueByOrders(orders);
  const revenueToday = calculateRevenueByOrders(ordersToday);

  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const pendingOrders = orders.filter(
    (order) => order.shipping === ORDER_STATUS.PENDING
  );

  return {
    orders,
    totalUsers: users.length,
    usersToday: usersToday.length,
    totalOrders: orders.length,
    ordersToday: ordersToday.length,
    pendingOrders: pendingOrders.length,
    totalRevenue,
    revenueToday,
    avgOrderValue,
  };
};

module.exports = { getOverview, getReport };
