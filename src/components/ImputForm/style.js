import { Input } from "antd";
import { styled } from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
    outline: none;
    margin-bottom: 10px;
    &:focus {
        background-color: rgb(232,240,254);
    }
`