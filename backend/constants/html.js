const generateEmailTemplate = (type, link) => {
  let title = "";
  let description = "";
  let buttonText = "";
  let buttonColor = "";

  switch (type) {
    case "verify":
      title = "Xác thực tài khoản của bạn";
      description =
        "Cảm ơn bạn đã đăng ký. Vui lòng nhấn vào nút bên dưới để xác thực địa chỉ email của bạn.";
      buttonText = "Xác thực ngay";
      buttonColor = "#4CAF50";
      break;
    case "reset":
      title = "Đặt lại mật khẩu";
      description =
        "Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào nút bên dưới để tiếp tục quá trình.";
      buttonText = "Đặt lại mật khẩu";
      buttonColor = "#F44336";
      break;
    default:
      title = "Thông báo từ Rexsports";
      description = "Đây là nội dung email.";
      buttonText = "Xem chi tiết";
      buttonColor = "#2196F3";
      break;
  }

  return `
    <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">${title}</h2>
      <p style="font-size: 16px; color: #555;">
        ${description}
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="padding: 12px 24px; background-color: ${buttonColor}; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">${buttonText}</a>
      </div>
      <p style="font-size: 14px; color: #888;">
        Nếu bạn không yêu cầu thao tác này, vui lòng bỏ qua email này.
      </p>
      <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">
        © ${new Date().getFullYear()} Rexsports. All rights reserved.
      </p>
    </div>
  `;
};

module.exports = generateEmailTemplate;
