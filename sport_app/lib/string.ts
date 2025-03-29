export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD") // Tách các ký tự có dấu thành 2 phần
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d") // Thay thế 'đ' thành 'd'
    .replace(/Đ/g, "D") // Thay thế 'Đ' thành 'D'
    .toLowerCase(); // Chuyển về chữ thường
};
