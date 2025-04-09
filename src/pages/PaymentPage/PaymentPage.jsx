import React, { useEffect, useMemo, useState } from "react";
import {
  WrapperRadio,
  WrapperInfo,
  WrapperLeft,
  WrapperRight,
  WrapperTotal,
} from "./style";
import { Form, Radio } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../ultils";
import InputComponents from "../../components/InputComponents/InputComponents";
import * as OrderService from "../../services/OrderService";
import * as UserService from "../../services/UserService";

import * as message from "../../components/Message/Message";

import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState("fast"); // Mặc định là "fast"
  const [payment, setPayment] = useState("later_money"); // Mặc định là "later_money"

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const mutationAddOrder = useMutationHook((data) => {
    const { token, ...stateUserDetails } = data;
    const res = OrderService.createOrder({
      access_token: token,
      data: stateUserDetails,
    });
    return res;
  });
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...stateUserDetails } = data;
    const res = UserService.updateUser({
      id,
      token,
      data: stateUserDetails,
    });
    return res;
  });
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        ...stateUserDetails,
        name: user?.name,
        city: user?.city,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.discount * cur.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 20000000) {
      return 0;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 45000;
    }
  }, [order]);
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);
  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItem: order?.orderItemsSelected,
          fullName: user?.name,
          address: user?.address,
          city: user?.city,
          phone: user?.phone,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
        },
      );
    }
  };
  const { isLoading, data } = mutationUpdate;
  const { data: dataAddOrder, isLoading: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder;
  useEffect(() => {
      if (isSuccess && dataAddOrder?.status === "OK") {
        const arrayOrdered = []
        order?.orderItemsSelected?.forEach(element => {
          arrayOrdered.push(element.product)
        })
        dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
        message.success("Đặt hàng thành công");
        navigate('/orderSuccess', {
          state: {
            delivery,
            payment,
            orders: order?.orderItemsSelected,
            totalPriceMemo: totalPriceMemo
          }
        })
      } else if (isError) {
        message.error();
      }
    }, [isSuccess,isError]);
  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          stateUserDetails,
        },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };
  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      {/* <Loading isLoading={isLoadingAddOrder}> */}
      <div style={{ width: "1270px", height: "100%", margin: "0 auto" }}>
        <h3 style={{marginTop: 0, marginLeft: "10px"}}> Thanh toán</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>Chọn phương thức giao hàng</div>
                <WrapperRadio onChange={handleDelivery} value={delivery}>
                  <Radio value="fast">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      FAST
                    </span>
                    Giao hàng tiết kiệm
                  </Radio>
                  <Radio value="J&T">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      J&T
                    </span>
                    Giao hàng J&T
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div style={{ width: "100%", padding: 0, margin: 0}}>
                <div style={{ width: "100%", padding: 0, margin: 0}}>Chọn phương thức thanh toán</div>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money">
                    Thanh toán tiền mặt khi nhận hàng
                  </Radio>
                  <Radio value='credit_card'>
                    Thanh toán bằng thẻ
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span
                    style={{ color: "blue" }}
                  >{`${user?.address}, ${user?.city}`}</span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính:</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá: </span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >{`${priceDiscountMemo}%`}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng: </span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(deliveryPriceMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền: </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254,56,52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  {/* <span style={{color: '#000', fontSize: '11px'}}>Đã bao gồm VAT nếu có</span> */}
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "360px",
                border: "none",
                borderRadius: "4px",
                marginLeft: "40px",
              }}
              textButton={"Đặt hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponents
                value={stateUserDetails.name}
                onChange={handleOnChangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <InputComponents
                value={stateUserDetails.city}
                onChange={handleOnChangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <InputComponents
                value={stateUserDetails.phone}
                onChange={handleOnChangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <InputComponents
                value={stateUserDetails.address}
                onChange={handleOnChangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
      </ModalComponent>
      {/* </Loading> */}
    </div>
  );
};

export default PaymentPage;
