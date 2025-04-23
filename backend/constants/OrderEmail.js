const generateOrderEmail = (order) => {
  const productRows = order.cart
    .map((item) => {
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <img src="${
              item.icon || ""
            }"  width="60" style="border-radius: 8px;" />
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            <strong>${item.name}</strong><br/>
            Size: ${item.size} - Color: ${item.color}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;" align="center">${
            item.quantity
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;" align="right">${item.price.toLocaleString()}₫</td>
        </tr>
      `;
    })
    .join("");

  const detailLink = `${process.env.CLIENT_URL}/checkout/${order._id}`;

  return `
  <div style="max-width: 700px; margin: auto; padding: 20px; font-family: sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #eee;">
    <h2 style="text-align: center; color: #333;">🛒 Đơn hàng mới từ Rexsports</h2>
    
    <h3>Thông tin khách hàng</h3>
    <p>
      👤 <strong>${order.name}</strong><br/>
      📧 ${order.email}<br/>
      ☎️ ${order.phone}<br/>
      🏠 ${order.address}<br/>
      🕒 Ngày đặt: ${order.createdAt}
    </p>

    <h3 style="margin-top: 30px;">Chi tiết đơn hàng</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="padding: 10px; text-align: left;">Ảnh</th>
          <th style="padding: 10px; text-align: left;">Sản phẩm</th>
          <th style="padding: 10px;">Số lượng</th>
          <th style="padding: 10px; text-align: right;">Giá</th>
        </tr>
      </thead>
      <tbody>
        ${productRows}
      </tbody>
    </table>

    <p style="margin-top: 20px; text-align: right;">
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${detailLink}" style="padding: 12px 24px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Xem chi tiết đơn hàng
      </a>
    </div>

    <p style="font-size: 14px; color: #888; text-align: center;">© ${new Date().getFullYear()} Rexsports</p>
  </div>
`;
};

module.exports = generateOrderEmail;
// <strong>Tổng cộng: ${order.total.toLocaleString()}₫</strong>
