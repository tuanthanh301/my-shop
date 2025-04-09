import { styled } from "styled-components";

export const WrapperHeaderUser = styled.div`
    display: flex;
    flex-direction: row;
    gap: 45px;
`;
export const WrapperInforUser = styled.div`

`;
export const WrapperLabel = styled.div`
    margin-bottom: 10px;
`;
export const WrapperContentInfor = styled.div`
  display: flex;
  padding: 20px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 350px;
  height: 100px;
  gap: 10px;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;
  .name-info{
    font-weight: bold;
  }
  .name-delivery{
    color: #ea8500;
    font-weight: bold;
  }
  .payment-info{
    color: #ea8500;
    font-weight: bold;
  }
`;

export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`;
export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  /* border: 1px solid rgb(235, 235, 240);
  box-shadow: 0 12px 12px #ccc; */

  
`;
export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
`;
export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red;
  }
`;
export const WrapperStyleContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px
`;
export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
