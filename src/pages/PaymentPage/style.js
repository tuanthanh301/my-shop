import { Radio } from "antd";
import { styled } from "styled-components";

export const WrapperLeft = styled.div`
  width: 910px;
`;
export const WrapperStylerHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 14px;
  }
`;

export const WrapperListOrder = styled.div``;
export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`;

export const WrapperPriceDiscount = styled.div`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 54px;
  margin-left: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const WrapperInputNumber = styled.div`
  font-size: 13px;
`;
export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 100%;
`;
export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 100%;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 5px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 400px;
  border-radius: 4px;
  height: 100px;
  padding-left: 016px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;