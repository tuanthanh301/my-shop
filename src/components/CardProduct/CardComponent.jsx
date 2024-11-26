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
const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px"}}
      style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <img style={{width: 200, position: "absolute", top: 50, left: -1}} src="https://salt.tikicdn.com/ts/upload/12/e2/4a/c5226426ee9429b0050449ae5403c9cf.png" alt=" "/>
      <StyleNameProduct>Iphone 15</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight: "4px"}}>
          <span>4.96</span>{" "}
          <StarFilled style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }} />
        </span>
        <WrapperStyleTextSold> | Đã bán 1000+</WrapperStyleTextSold>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ
        <WrapperDiscountText>
          -24%
        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
