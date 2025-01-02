import { styled } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    background: rgb(13, 92, 182);
    color: #fff;
    span {
      color: #fff;
    }
  } 
  width: 100%;
  text-align: center;

`;
export const WrapperProducts = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;