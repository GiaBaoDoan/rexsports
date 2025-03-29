import { BANK } from "@/lib/contanst";
import { getDate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { calculateCartTotal } from "@/lib/math";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import React from "react";

const Payment = () => {
  const { cart } = useAppSelector((state) => state.CartReducer);

  const total_price = calculateCartTotal(cart);
  return (
    <div className="border rounded-lg">
      <hr />
      <div className="flex my-5 p-3 gap-3 items-center font-bold">
        <p>Tổng tiền : {formatCurrency(total_price)}</p>
        <p>Ngày đặt hàng: {getDate(new Date())}</p>
      </div>
      <hr />
      <div className="flex justify-center items-center gap-10 my-10">
        <Image
          width={400}
          height={400}
          alt="Mã quét ngân hàng"
          src={`https://img.vietqr.io/image/${BANK._bankName}-${BANK._id}-compact2.jpg?amount=${total_price}&addInfo=Thanh toán tiền mua hàng&accountName=${BANK._userName}`}
        ></Image>

        <div className="text-dark max-w-[550px] w-full space-y-3 font-medium">
          <h6 className="font-bold text-lg">
            Thực hiện theo hướng dẫn sau để thanh toán:
          </h6>
          <p className="mb-2">
            <strong>Bước 1:</strong> Mở ứng dụng <strong>Mobile Banking</strong>
            của ngân hàng
          </p>
          <p className="mb-2">
            <strong>Bước 2:</strong> Chọn <strong>Thanh Toán</strong> và quét mã
            QR tại hướng dẫn này
          </p>
          <p className="mb-2">
            <strong>Bước 3:</strong> Nhập số tiền cần chuyển là
            <strong className="text-blue-600">
              {formatCurrency(total_price)}
            </strong>
            và nội dung chuyển tiền
            <strong className="text-blue-600">NAP 2e1u77</strong> (NAP + cách +
            code_thanh_toán)
          </p>
          <div>
            <p className="mb-1">
              Ngân hàng:
              <i>
                <b>{BANK._bankName}</b>
              </i>
            </p>
            <p className="mb-1">
              Tên:
              <i>
                <b>{BANK._userName}</b>
              </i>
            </p>
            <p className="mb-1">
              Số tài khoản:
              <i>
                <b>
                  <i>{BANK._id}</i>
                </b>
              </i>
            </p>
            <p className="mb-1">
              Chi nhánh:
              <i>
                <b>{BANK._branch}</b>
              </i>
            </p>
          </div>
          <p className="mb-10">
            <strong>Bước 4:</strong> Hoàn thành các bước thanh toán bạn hãy đính
            kèm biên lai vào tờ đơn sau đó đợi <strong>Email</strong> xác nhận
            mua hàng thành công
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
