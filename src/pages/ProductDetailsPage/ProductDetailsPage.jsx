import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
  return (
    <div style={{ width: "1270px", margin: "auto" }}>
      <div
        style={{
          width: "100%",
          padding: '0',
          background: "#efefef",
          height: "1000px",
        }}
      >
        <h5 style={{ marginTop: "0px" }}>Trang chủ</h5>
        <ProductDetailsComponent />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
