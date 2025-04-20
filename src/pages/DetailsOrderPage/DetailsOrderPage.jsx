import React, { useMemo } from "react";
import {
  WrapperAllPrice,
  WrapperContentInfor,
  WrapperHeaderUser,
  WrapperInforUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../ultils";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import Loading from "../../components/LoadingComponent/Loading";

const DetailsOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const { id } = params;
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder({
      id: id,
      access_token: state?.token,
    });
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    enabled: !!id, // convert sang boolean
  });
  const { isLoading, data } = queryOrder;
  const priceMemo = useMemo(() => {
    const result = data?.orderItem?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);
  if (isLoading || !data) {
    return <div>Đang tải dữ liệu đơn hàng...</div>;
  }
  const {
    shippingAddress,
    orderItem,
    shippingPrice,
    paymentMethod,
    isPaid,
    totalPrice,
  } = data;

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div
        style={{
          background: "#f5f5fa",
          width: "1270px",
          margin: "0 auto",
        }}
      >
        <h4 style={{ marginTop: "0px" }}>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInforUser>
            <WrapperLabel>ĐỊA CHỈ NGƯỜI NHẬN</WrapperLabel>
            <WrapperContentInfor>
              <div className="name-info">{data?.shippingAddress.fullName}</div>
              <div className="address-info">
                <span>Địa chỉ: </span>
                {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}
              </div>
              <div className="address-info">
                <span>Số điện thoại: </span>
                {data?.shippingAddress?.phone}
              </div>
            </WrapperContentInfor>
          </WrapperInforUser>
          <WrapperInforUser>
            <WrapperLabel>HÌNH THỨC GIAO HÀNG</WrapperLabel>
            <WrapperContentInfor>
              <div className="delivery-info">
                <span className="name-delivery">FAST </span>
                Giao hàng tiết kiệm
              </div>
              <div className="delivery-fee">
                <span>Phí giao hàng: </span>
                {data?.shippingPrice} VNĐ
              </div>
            </WrapperContentInfor>
          </WrapperInforUser>
          <WrapperInforUser>
            <WrapperLabel>HÌNH THỨC THANH TOÁN</WrapperLabel>
            <WrapperContentInfor>
              <div className="payment-info">
                {orderContant.payment[data?.paymentMethod]}
              </div>
              <div className="status-payment">
                {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>
            </WrapperContentInfor>
          </WrapperInforUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "610px" }}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>
          {data?.orderItem?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img
                    src={order.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      border: "1px solid rgb(238, 238, 238)",
                      padding: "2px",
                    }}
                  />
                  <div 
                    style={{
                      width: "260",
                      overflow: "hidden",
                      objectFit: "ellipsis",
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {order?.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order.price)}</WrapperItem>
                <WrapperItem style={{marginLeft: '80px'}}>{order?.amount}</WrapperItem>
                <WrapperItem>
                  {order?.discount ? convertPrice(priceMemo * order?.discount / 100) : "0 VNĐ"}
                </WrapperItem>
              </WrapperProduct>
            );
          })}
          <WrapperAllPrice style={{ textAlign: "right", width: "100%" }}>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice style={{ textAlign: "right", width: "100%" }}>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice style={{ textAlign: "right", width: "100%" }}>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem>{convertPrice(totalPrice)}</WrapperItem>
          </WrapperAllPrice>
        </WrapperStyleContent>
      </div>
    </div>
  );
};

export default DetailsOrderPage;
