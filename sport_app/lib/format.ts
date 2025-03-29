export const formatCurrency = (amount: number = 0) => {
  return amount.toLocaleString("vi-VN", { currency: "VND" }) + " VND";
};
