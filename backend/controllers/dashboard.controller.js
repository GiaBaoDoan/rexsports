const DashboardServices = require("../services/dashboard.service");

const httpStatus = require("../constants/httpStatus");
const { getDate } = require("../utils/helper");

const getOverview = async (req, res, next) => {
  const today = getDate("day");
  const week = getDate("week");
  const month = getDate("month");

  try {
    const [revenueToday, revenueWeek, revenueMonth] = await Promise.all([
      DashboardServices.getOverview(today),
      DashboardServices.getOverview(week),
      DashboardServices.getOverview(month),
    ]);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Lấy dữ liệu thành công",
      data: {
        today: {
          revenue: revenueToday.total,
          orders: revenueToday.orderCount,
        },
        week: {
          revenue: revenueWeek.total,
          orders: revenueWeek.orderCount,
        },
        month: {
          revenue: revenueMonth.total,
          orders: revenueMonth.orderCount,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const getReport = async (req, res, next) => {
  try {
    const {
      orders,
      totalUsers,
      usersToday,
      totalOrders,
      totalRevenue,
      avgOrderValue,
      ordersToday,
      revenueToday,
      pendingOrders,
    } = await DashboardServices.getReport(req.query);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Lấy dữ liệu thành công",
      data: {
        orders,
        totalUsers,
        usersToday,
        totalOrders,
        totalRevenue,
        avgOrderValue,
        ordersToday,
        revenueToday,
        pendingOrders,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getOverview, getReport };
