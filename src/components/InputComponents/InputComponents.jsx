import { Input } from 'antd'
import React from 'react'

const InputComponents = ({size, placeholder,name, value, onChange, bordered ,variant, borderless, style,backgroundColorInput,...rests}) => {
  return (
    <Input
        size={size}
        placeholder={placeholder}
        // bordered={bordered}
        // variant = {borderless}
        style={{ backgroundColorInput: backgroundColorInput}}
        name={name}
        value={value} 
        onChange={onChange}
        {...rests}
      />
  )
}

export default InputComponents

