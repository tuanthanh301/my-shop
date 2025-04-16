import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall from "../../assets/images/img-small.webp";
import * as ProductService from "../../services/ProductService";
import {
  WrapperAddressProduct,
  WrapperDescTextProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleNameProduct,
  WrapperStyleTextSold,
} from "./style";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../ultils";
import * as message from "../../components/Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent /CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    setNumberProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() =>{
    initFacebookSDK()
  },[])

  useEffect(() => {
    const orderRedux = order?.orderItem?.find(
      (item) => item.product === productsDetails?._id
    );
    if (orderRedux?.amount + numberProduct <= orderRedux?.countInStock || (!orderRedux && productsDetails?.countInStock > 0)) {
      setErrorLimitOrder(false);
    } else if(productsDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numberProduct]);
  // useEffect(() => {
  //   if (order.isSuccessOrder) {
  //     message.success("Đã thêm sản phẩm vào giỏ hàng thành công");
  //   }
  //   return () => {
  //     dispatch(resetOrder);
  //   };
  // }, [order.isSuccessOrder]);
  useEffect(() => {
    if (order.isSuccessOrder) {
      message.success("Đã thêm sản phẩm vào giỏ hàng thành công");
      dispatch(resetOrder());
    }
  }, [order.isSuccessOrder]);
  

  const { data: productsDetails, isLoading } = useQuery({
    queryKey: ["products-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });
  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumberProduct(numberProduct + 1);
      }
    } else {
      if (!limited) {
        setNumberProduct(numberProduct - 1);
      }
    }
  };
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      //   {
      //     name: {type: String, required: true},
      //     amount: {type: Number, required: true},
      //     image: {type: String, required: true},
      //     price: {type: Number, required: true},
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItem?.find(
        (item) => item.product === productsDetails?._id
      );
      if (orderRedux?.amount + numberProduct <= orderRedux?.countInStock || (!orderRedux && productsDetails?.countInStock > 0)) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productsDetails?.name,
              amount: numberProduct,
              image: productsDetails?.image,
              price: productsDetails.price,
              product: productsDetails?._id,
              discount: productsDetails?.discount,
              countInStock: productsDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };
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
          {/* <Row
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
          </Row> */}
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {productsDetails?.name}
          </WrapperStyleNameProduct>
          <div className="">
            {/* {renderStar(productsDetails?.rating)} */}
            <Rate
              allowHalf
              defaultValue={productsDetails?.rating}
              value={productsDetails?.rating}
            />
            <WrapperStyleTextSold>
              {productsDetails?.sold}
            </WrapperStyleTextSold>
          </div>
          <WrapperDescTextProduct>
            <h5> Thông số sản phẩm</h5>
            {productsDetails?.description}
          </WrapperDescTextProduct>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productsDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến: </span>
            <span className="address">{user?.address}</span>
            <span className="change-address"> Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"}/>
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
              <button
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() =>
                  handleChangeCount("decrease", numberProduct === 1)
                }
              >
                <MinusOutlined style={{ color: "#ccc", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                style={{ width: "50px" }}
                defaultValue={1}
                onChange={onChange}
                value={numberProduct}
                min={1}
                max={productsDetails?.countInStock}
              />
              <button
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  border: "none",
                }}
                defaultValue={1}
                onClick={() =>
                  handleChangeCount(
                    "increase",
                    numberProduct === productsDetails?.countInStock
                  )
                }
              >
                <PlusOutlined style={{ color: "#ccc", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <ButtonComponent
                // size={40}
                style={{
                  backgroundColor: "rgb(255,57,69)",
                  height: "48px",
                  width: "220px",
                  border: " none",
                  borderRadius: "4px",
                }}
                onClick={handleAddOrderProduct}
                textButton={"Chọn mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>Sản phẩm đã hết hàng</div>
              )}
            </div>
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
        {/* <CommentComponent dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width='1270px'/> */}
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
