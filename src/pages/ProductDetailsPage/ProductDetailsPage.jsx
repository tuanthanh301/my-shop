import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ width: "1270px", margin: "auto" }}>
      <div
        style={{
          width: "100%",
          padding: "0",
          // background: "#efefef",
          height: "1000px",
        }}
      >
        <h3 style={{ marginTop: "0px" }}>
          {/* <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </span> */}
          Chi tiết sản phẩm
        </h3>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
