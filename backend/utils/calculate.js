const calculateRevenueByOrders = (ordersList) => {
  return ordersList
    .filter((order) => order.isPaid)
    .reduce((total, order) => {
      const orderTotal = order.cart.reduce((sum, item) => {
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        return sum + quantity * price;
      }, 0);
      return total + orderTotal;
    }, 0);
};

module.exports = calculateRevenueByOrders;
