import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/ImputForm/InputForm";
import {
  WrapperConTainerLeft,
  WrapperConTainerRight,
  WrapperTextLight,
} from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
// import Loading from "../../components/LoadingComponent/Loading";
// import * as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch} from 'react-redux';
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation()
  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const handldeNavigateSignUp = () => {
    navigate("/sign-up");
    // setLoading(true)

  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  // const [loading, setLoading] = useState(false);
  const { data, isLoading, isSuccess } = mutation;
  useEffect(() =>{
    if(isSuccess){
      if(location?.state){
        navigate(location?.state)
      } else {
        navigate('/')
      }
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    } 
  },[isSuccess]) 
  const handleGetDetailsUser = async (id,token) =>{
      const res = await UserService.getDetailsUser(id,token)
      dispatch(updateUser({...res?.data, access_token: token}))
  }
  const handleSignIn = () => { 
    mutation.mutate({
      email,
      password,
    });
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
          <p>Đăng nhập hoặc tạo tài khoản</p>
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
          {data?.status === "ERR" && <span style={{ color: "red" }}>{data?.message}</span>}
          {/* <Loading isLoading={loading}>  */}
          {/* loading video 28 */}
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              // size={40}
              style={{
                backgroundColor: "rgb(255,57,69)",
                height: "48px",
                width: "100%",
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
          {/* </Loading> */}
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{" "}
            <span>
              <WrapperTextLight onClick={handldeNavigateSignUp}>
                Tạo tài khoản mới
              </WrapperTextLight>
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
