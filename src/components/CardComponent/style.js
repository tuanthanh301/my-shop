import { Card } from "antd";
import { styled } from "styled-components";
export const WrapperCardStyle = styled(Card)`
  width: 220px
  & img {
    width: 200px;
    height: 200px;
  }
  position: relative;
  background-color: ${props => props.disabled ? '#ccc' : "#fff"};
  cursor: ${props => props.disabled ? 'not-allowed' : '#fff'}
` 
export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
  font-size: 10px;
  color: #808089;
  margin: 6px 0 0;

`;

export const WrapperPriceText = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: rgb(255, 66, 78);

  
`;
export const WrapperDiscountText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: rgb(255, 66, 78);
  margin-top: 5px;
`;
export const WrapperStyleTextSold = styled.span`
   color: rgb(120, 120, 120);
   font-size: 15px;
   line-height: 24px;
`