import React from "react";
import {
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperCountOrder,
  WrapperInputNumber,
  WrapperItemOrder,
  WrapperItemOrderInfor,
} from "./style";
import { useSelector } from "react-redux";
import { convertPrice } from "../../ultils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ width: "1270px", height: "100%", margin: "0 auto" }}>
        <h3 style={{ marginTop: 0, marginLeft: "10px" }}>
          {" "}
          Đơn hàng đã đặt thành công
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <div style={{ fontWeight: "bold" }}>Phương thức giao hàng</div>
                <WrapperValue value="fast">
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.delivery[state?.delivery]}
                  </span>
                  - Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <div style={{ fontWeight: "bold" }}>Phương thức thanh toán</div>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfor>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                    <div
                      style={{
                        width: "300px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={order?.image}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        Số lượng: {order?.amount}
                      </span>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        Giá tiền: {convertPrice(order?.price)}
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfor>
            <div className="">
              <span style={{
                      color: "rgb(254,56,52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                Tổng tiền: {convertPrice(state?.totalPriceMemo)}
              </span>
            </div>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
