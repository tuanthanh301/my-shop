import { Badge, Col } from "antd";
import React from "react";
import {
  WrapperHeader,
  WrapperText,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./styleHeader";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
// import Search from "antd/es/transfer/search";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperText>TuanThanhShop</WrapperText>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Tìm sản phẩm mong muốn"
            // onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={6} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            <div>
              <div className="">
                <WrapperTextHeaderSmall>
                  <span>Đăng nhập/Đăng ký</span>
                </WrapperTextHeaderSmall>
              </div>
              <div className="">
                <WrapperTextHeaderSmall>
                  <span>Tài khoản</span>
                </WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge count={6} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>
              <span>Giỏ hàng</span>
            </WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
