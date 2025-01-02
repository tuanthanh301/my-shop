import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { placeholder = "Nhập text" } = props;
  return (
      <WrapperInputStyle placeholder={placeholder} valueInput={valueInput} />
  );
};

export default InputForm;
