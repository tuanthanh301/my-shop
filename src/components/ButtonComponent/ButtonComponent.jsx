import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({size, bordered, styleButton, styleTextButton,textButton,backgroundColorButton, colorButton, ...rest}) => {
  return (
    <Button
        size={size} 
        style={{ backgroundColor: backgroundColorButton, border: !bordered && 'none' }}
        {...rest}
    ><span style={{color: colorButton}}>{textButton}</span></Button>
  )
}

export default ButtonComponent