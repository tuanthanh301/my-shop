import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imageProductSmall from "../../assets/images/img-small.webp";
import * as ProductService from "../../services/ProductService";
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
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numberProduct, setNumberProduct] = useState(1)
  const user = useSelector((state) => state.user)
  console.log('user',user)
  const onChange = (value) => {
    setNumberProduct(Number(value))
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  const { data: productsDetails, isLoading } = useQuery({
    queryKey: ["products-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });
  const handleChangeCount = (type) => {
    if ( type === 'increase'){
      setNumberProduct(numberProduct + 1)
    } else {
      setNumberProduct(numberProduct - 1)

    }

  }
  return (
    <Loading isLoading={isLoading}>
      <Row style={{ backgroundColor: "#fff", borderRadius: "4px" }}>
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <Image
            src={productsDetails?.image}
            alt="image-product"
            preview={false}
          />
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
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {productsDetails?.name}
          </WrapperStyleNameProduct>
          <div className="">
            {/* {renderStar(productsDetails?.rating)} */}
            <Rate allowHalf defaultValue={productsDetails?.rating} value={productsDetails?.rating}/>
          <WrapperStyleTextSold> | Đã bán 1000+</WrapperStyleTextSold>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{productsDetails?.price}$</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến: </span>
            <span className="address">
              {user?.address}
            </span>
            <span className="change-address"> Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button style={{ background: "transparent", cursor: 'pointer', border: "none" }} onClick={() =>handleChangeCount('decrease')}>
                <MinusOutlined style={{ color: "#ccc", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                style={{ width: "50px" }}
                onChange={onChange}
                value={numberProduct}
              />
              <button style={{ background: "transparent", cursor: 'pointer', border: "none" }} defaultValue={1} onClick={() =>handleChangeCount('increase')}>
                <PlusOutlined style={{ color: "#ccc", fontSize: "20px" }}/>
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ButtonComponent
              // size={40}
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
              // size={40}
              style={{
                backgroundColor: "rgb(255, 255, 255)",
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
    </Loading>
  );
};

export default ProductDetailsComponent;
