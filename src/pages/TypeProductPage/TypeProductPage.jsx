import { Col, Pagination, Row } from "antd";
import React from "react";
import CardComponent from "../../components/CardProduct/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { WrapperNavbar, WrapperPagination, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
    <div style={{ padding: "10px 120px", background: "#efefef" }}>
      <Row style={{ flexWrap: "nowrap" }}>
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts span={20}>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <Pagination defaultCurrent={1} total={100} onChange={onChange} style={{textAlign: "center", marginTop: "20px"}} />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
