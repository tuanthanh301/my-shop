import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26, 148, 255);
    align-items: center;
    flex-wrap: nowrap;
    width: 1270px;
    height: 70px;
    gap: 16px;
    padding: 10px 0;
`
export const WrapperText = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 7px;
    font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
