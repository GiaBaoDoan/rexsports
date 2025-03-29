const dayjs = require("dayjs");
const { Order } = require("../models/Order.model");

const today = dayjs().startOf("day").toDate();
const startOfWeek = dayjs().startOf("week").toDate();
const startOfMonth = dayjs().startOf("month").toDate();

const revenueByTime = async (time) => {
  const result = await Order.aggregate([
    { $match: { createdAt: { $gte: time }, isPaid: true } },
    { $unwind: "$cart" },
    {
      $group: {
        _id: `$id`,
        total: {
          $sum: {
            $multiply: [
              { $ifNull: ["$cart.quantity", 0] },
              { $ifNull: ["$cart.price", 0] },
            ],
          },
        },
        orderCount: { $sum: 1 },
      },
    },
  ]);

  return result;
};

const getRevenue = async (req, res, next) => {
  try {
    const [revenueToday, revenueWeek, revenueMonth] = await Promise.all([
      revenueByTime(today),
      revenueByTime(startOfWeek),
      revenueByTime(startOfMonth),
    ]);

    return res.status(200).json({
      status: 200,
      data: {
        today: {
          revenue: revenueToday[0]?.total || 0,
          orders: revenueToday[0]?.orderCount || 0,
        },
        week: {
          revenue: revenueWeek[0]?.total || 0,
          orders: revenueWeek[0]?.orderCount || 0,
        },
        month: {
          revenue: revenueMonth[0]?.total || 0,
          orders: revenueMonth[0]?.orderCount || 0,
        },
      },
      message: "Lấy dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getRevenue };
