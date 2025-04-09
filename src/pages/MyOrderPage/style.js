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
export const WrapperStylerHeaderDelivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 14px;
  }
`;
export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;
`;
export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`;
export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;

export const WrapperStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
`;

export const WrapperHeaderIem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const WrapperFooterItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(235, 235, 240);
  align-items: flex-end;
  gap: 10px;
`;
