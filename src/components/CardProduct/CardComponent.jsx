import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSold,
} from "./style";
import { StarFilled } from "@ant-design/icons";
const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, sold} = props
  return (
    <WrapperCardStyle
      hoverable
      // headStyle={{ width: "200px", height: "200px"}}
      style={{ width: 200, header: { width: "200px", height: "200px" }}}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <img style={{width: 200, position: "absolute", top: 50, left: -1}} src="https://salt.tikicdn.com/ts/upload/12/e2/4a/c5226426ee9429b0050449ae5403c9cf.png" alt=" "/>
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight: "4px"}}>
          <span>{rating}</span>{" "}
          <StarFilled style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }} />
        </span>
        <WrapperStyleTextSold> | Đã bán {sold || 100}+</WrapperStyleTextSold>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{marginRight: "8px"}}>{price}</span>
        <WrapperDiscountText>
          -{discount || 5}%
        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
