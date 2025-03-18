import React from 'react'
import { WrapperLeft, WrapperStylerHeader } from './style'

const OrderPage = ({count = 1}) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`)
  }
  const handleChangeOut = () => {

  }
  const handleOnChangeCheckOut = (e) => {

  }
  return (
    <div style={{background: '#f5f5f5', width: '100%', height: '100vh'}}>
      <div style={{width: '1270px', height: '100%'}}>
        <h3> Giỏ hàng</h3>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <WrapperLeft>
            <WrapperStylerHeader>

            </WrapperStylerHeader>
          </WrapperLeft>
        </div>
      </div>
    </div>
  )
}

export default OrderPage