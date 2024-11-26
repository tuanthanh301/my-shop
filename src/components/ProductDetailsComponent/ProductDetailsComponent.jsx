import { Col, Image, InputNumber, Row } from "antd";
import React from "react";
import imageProduct from "../../assets/images/test.jpg.webp";
import imageProductSmall from "../../assets/images/img-small.webp";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSold,
} from "./style";
import { StarFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = () => {
  const onChange = () => {};

  return (
    <Row style={{ padding: "16px", backgroundColor: "#fff", borderRadius:"4px" }}>
      <Col span={10} style={{borderRight: "1px solid #e5e5e5", paddingRight: "8px"}}>
        <Image src={imageProduct} alt="image-product" preview={false} />
        <Row
          className=""
          style={{ paddingTop: "10px", justifyContent: "space-between" }}
        >
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image-small-product"
              preview={false}
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{paddingLeft: "10px"}}>
        <WrapperStyleNameProduct>
          Combo Trọn Bộ CONAN ĐẶC SẮC: Conan và Tổ chức Áo Đen, Conan Tuyển Tập
          Đặc Biệt{" "}
        </WrapperStyleNameProduct>
        <div className="">
          <StarFilled
            style={{ fontSize: "16px", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "16px", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "16px", color: "rgb(253, 216, 54)" }}
          />
          <WrapperStyleTextSold> | Đã bán 1000+</WrapperStyleTextSold>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>12,022,003₫</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến: </span>
          <span className="address"> Số 41, đường Đại Cát, P. Liên Mạc, Q. Bắc Từ Liêm, Hà Nội</span>
          <span className="change-address"> Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div style={{margin: "10px 0 20px", padding: "10px 0", borderTop: "1px solid #e5e5e5",borderBottom: "1px solid #e5e5e5" }}>
          <div style={{marginBottom: "10px"}}>Số lượng</div>
          <WrapperQualityProduct>
            <button style={{ background: "transparent", border: "none" }}>
              <MinusOutlined style={{ color: "#ccc", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber
              style={{ width: "50px" }}
              defaultValue={0}
              onChange={onChange}
            />
            <button style={{ background: "transparent", border: "none" }}>
              <PlusOutlined style={{ color: "#ccc", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{display: 'flex', alignItems: "center", gap:"12px"}}>
          <ButtonComponent
            border={false}
            size={40}
            style={{
              backgroundColor: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              border: " none",
              borderRadius: "4px",
            }}
            textButton={"Chọn mua"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
          <ButtonComponent
            border={false}
            size={40}
            style={{
              backgroundColor: "rgb(255, 255, 255);",
              height: "48px",
              width: "220px",
              border: "1px solid rgb(10, 104, 255)",
              borderRadius: "4px",
            }}
            textButton={"Mua trước trả sau"}
            styleTextButton={{ color: "rgb(10, 104, 255)", fontSize: "15px" }}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
