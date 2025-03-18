import { Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductType = async (type) => {
    setLoading(true);
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setLoading(false);
      setProducts(res?.data);
    } else {
      setLoading(false);
    }
    console.log("res", res);
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);
  console.log("loading", loading);
  const onChange = () => {};

  return (
    <Loading isLoading={loading} >
      <div style={{ width: "100%", background: "#efefef" }}>
        <div style={{ width: "1270px", margin: "0 auto" }}>
          <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
            <WrapperNavbar span={4}>
              <NavBarComponent />
            </WrapperNavbar>
            <Col span={20}>
              <WrapperProducts span={20}>
                {products?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      discount={product.discount}
                      sold={product.sold}
                      id={product._id}
                    />
                  );
                })}
              </WrapperProducts>
              <Pagination
                defaultCurrent={1}
                total={100}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
