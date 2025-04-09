import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import React, { useEffect } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";

import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperHeaderIem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { convertPrice } from "../../ultils";
import { useLocation, useNavigate } from "react-router-dom";
const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUserId({
      id: state?.id,
      user: state?.token,
    });
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token, // convert sang boolean
  });
  // const queryOrder = useQuery(
  //   {
  //     queryKey: ["orders"],
  //     queryFn: fetchMyOrder,
  //   },
  //   {
  //     enabled: user?.id && user?.access_token,
  //   }
  // );
  const { isLoading, data } = queryOrder;
  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderIem>
          <img
            src={order?.image}
            style={{
              width: "77px",
              height: "79px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "#242424",
              marginLeft: "auto",
            }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderIem>
      );
    });
  };
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };
  const mutation = useMutationHook((data) => {
    const { id, token } = data;
    const res = OrderService.cancelOrder(id, token);
    return res;
  });
  const handleCancelOrder = (id) => {
    mutation.mutate(
      { id, token: state?.token },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
  } = mutation;
  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isErrorCancel) {
      message.error();
    }
  }, [isSuccessCancel, isErrorCancel]);
  return (
    // <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div
          style={{
            background: "#f5f5fa",
            width: "1270px",
            height: "100%",
            margin: "0 auto",
          }}
        >
          <h4 style={{ marginTop: "0px" }}>Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Trạng thái
                    </span>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>
                        Giao hàng:{" "}
                      </span>
                      {`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}
                    </div>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>
                        Thanh toán:{" "}
                      </span>
                      {`${order.isPaid ? "Đã giao hàng" : "Chưa giao hàng"}`}
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItem)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: "rgb(255,66,78)" }}>
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(254,56,52)",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order?._id)}
                        styleButton={{
                          height: "36px",
                          backgroundColor: "#fff",
                          border: "1px solid rgb(11,116,229)",
                          borderRadius: "4px",
                        }}
                        textButton={"Huỷ đơn hàng"}
                        styleTextButton={{
                          color: "rgb(11,116,229)",
                          fontSize: "14px",
                        }}
                      ></ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        styleButton={{
                          height: "36px",
                          backgroundColor: "#fff",
                          border: "1px solid rgb(11,116,229)",
                          borderRadius: "4px",
                        }}
                        textButton={"Xem chi tiết"}
                        styleTextButton={{
                          color: "rgb(11,116,229)",
                          fontSize: "14px",
                        }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    // </Loading>
  );
};

export default MyOrderPage;
