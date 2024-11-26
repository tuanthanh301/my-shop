import { Col, Image, InputNumber } from "antd";
import { styled } from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
`;
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset:
    display: flex;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 300;
  line-height: 32px;
  word-break: break-word;
`;
export const WrapperStyleTextSold = styled.span`
  color: rgb(120, 120, 120);
  font-size: 15px;
  line-height: 24px;
`;
export const WrapperPriceProduct = styled.div`
  background: rgb(250, 250, 250);
  border-radius: 4px;
`;
export const WrapperPriceTextProduct = styled.h1`
  color: rgb(255, 66, 78);
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  margin-right: 8px;
  padding: 10px;
  margin-top: 10px;
`;
export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ,
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;
export const WrapperQualityProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 130px;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number-outlined {
    width: 70px;
    border-top: none;
    border-bottom: none;
    border-radius: 0;
    &.ant-input-number-handler-wrap {
      display: none;
    }
  }
`;
