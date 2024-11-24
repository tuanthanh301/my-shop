import { Input } from 'antd'
import React from 'react'

const InputComponents = ({size, placeholder, bordered , style,backgroundColorInput,...rests}) => {
  return (
    <Input
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColorInput: backgroundColorInput}}
        
      />
  )
}

export default InputComponents