import { Image } from "antd";
import React, { useEffect, useState } from "react";
import InputForm from "../../components/ImputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

import {
  WrapperConTainerLeft,
  WrapperConTainerRight,
  WrapperTextLight,
} from "../SignInPage/style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHook((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() =>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    } else if (isError){
      message.error()
    }
  },[isSuccess, isError])

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value); 
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    });
    // console.log("sign-up", email, password, confirmPassword);
  };
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
          <p>Tạo tài khoản</p>
          <InputForm
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && <span style={{ color: "red" }}>{data?.message}</span>}
          {/* <Loading isLoading={isLoading}> */}
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              // size={50}
              style={{
                backgroundColor: "rgb(255,57,69)",
                height: "48px",
                width: "100%",
                border: " none",
                borderRadius: "4px",
                marginTop: "26px",
                marginBottom: "10px",
              }}
              textButton={"Đăng ký"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
            <p>
              Bạn đã có tài khoản?{" "}
              <span>
                <WrapperTextLight onClick={handleNavigateSignIn}>
                  Đăng nhập
                </WrapperTextLight>
              </span>
            </p>
          {/* </Loading> */}
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

export default SignUpPage;
