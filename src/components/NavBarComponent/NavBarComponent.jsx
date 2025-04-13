import { Checkbox, Rate } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTypeProduct,
  WrapperValue,
} from "./style";
import TypeProduct from "../TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductService";

const NavBarComponent = () => {
  const onChange = () => {};
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchAllTypeProduct = async () => {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === "OK") {
        setTypeProducts(res?.data);
      }
  };
  useEffect(() => {
      fetchAllTypeProduct();
    }, []);
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperValue>{option}</WrapperValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            xq
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ display: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span>{`từ ${option} sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabelText>Danh mục sản phẩm</WrapperLabelText>
      <WrapperContent>
        {/* {renderContent("text", ["Dell", "Asus", "Macbook"])} */}
        <div>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </div>
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
