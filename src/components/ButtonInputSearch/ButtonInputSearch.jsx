import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import InputComponents from "../InputComponents/InputComponents";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13,92,182)',
    colorButton = "#fff",
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <InputComponents
        size={size}
        placeholder={placeholder}
        // bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size} 
        style={{ backgroundColor: backgroundColorButton, border: !bordered && 'none' }}
        icon={<SearchOutlined style={{color: '#fff'}} color={colorButton}/>} 
        textButton='Tìm kiếm'
        styleTextButton={{ color: colorButton}}
      />
    </div>
  );
};

export default ButtonInputSearch;
