import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Image } from "antd";
import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/ImputForm/InputForm";
import {
  WrapperConTainerLeft,
  WrapperConTainerRight,
  WrapperTextLight,
} from "./style";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53) ",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "443px",
          borderRadius: " 20px 20px 20px 20px",
          background: "#fff",
        }}
      >
        <WrapperConTainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm placeholder="abc@gmail.com" />
          <div style={{ position: "relative" }}>
            <span
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm placeholder="Password" type={isShowPassword ? "text" : "password"} />
          </div>
          <ButtonComponent
            border={false}
            size={40}
            style={{
              backgroundColor: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              border: " none",
              borderRadius: "4px",
              marginTop: "26px",
              marginBottom: "10px",
            }}
            textButton={"Đăng nhập"}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <span>
              <WrapperTextLight>Tạo tài khoản mới</WrapperTextLight>
            </span>
          </p>
        </WrapperConTainerLeft>
        <WrapperConTainerRight>
          <Image
            width="200px"
            height="200px"
            src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
            preview={false}
            alt="img-logo"
          />
          <h4>Mua sắm tại TuanThanhShop</h4>
        </WrapperConTainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
