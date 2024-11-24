import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26, 148, 255);
    align-items: center;
    height: 70px;
    gap: 16px;
    flex-wrap: nowrap;
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
