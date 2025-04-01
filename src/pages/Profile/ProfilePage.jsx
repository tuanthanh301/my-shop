import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/ImputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../ultils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async    ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    setAvatar(file.preview)
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      {/* <Loading isLoading={isLoading}> */}
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name: </WrapperLabel>
          <InputForm
            id="name"
            style={{ border: "none", marginBottom: "0px", width: "300px" }}
            placeholder="VD: Nguyễn Tuấn Thành"
            value={name}
            onChange={handleOnChangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            // size={50}
            style={{
              height: "30px",
              width: "fit-content",
              border: "1px solid rgb(26,148,255)",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Update"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email: </WrapperLabel>
          <InputForm
            id="email"
            style={{ border: "none", marginBottom: "0px", width: "300px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            // size={50}
            style={{
              height: "30px",
              width: "fit-content",
              border: "1px solid rgb(26,148,255)",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Update"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone: </WrapperLabel>
          <InputForm
            id="phone"
            style={{ border: "none", marginBottom: "0px", width: "300px" }}
            placeholder="0123456789"
            value={phone}
            onChange={handleOnChangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            // size={50}
            style={{
              height: "30px",
              width: "fit-content",
              border: "1px solid rgb(26,148,255)",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Update"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar: </WrapperLabel>
          <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </WrapperUploadFile>
          {avatar && (
            <img src={ avatar } style={{
                height: '60px',
                width: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
            }} alt='avatar'/>
          )}
          {/* <InputForm
            id="avatar"
            style={{ border: "none", marginBottom: "0px", width: "300px" }}
            placeholder="Hà Nội"
            value={avatar}
            onChange={handleOnChangeAvatar}
          /> */}
          <ButtonComponent
            onClick={handleUpdate}
            // size={50}
            style={{
              height: "30px",
              marginLeft: '100px',
              width: "fit-content",
              border: "1px solid rgb(26,148,255)",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Update"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Address: </WrapperLabel>
          <InputForm
            id="address"
            style={{ border: "none", marginBottom: "0px", width: "300px" }}
            placeholder="Hà Nội"
            value={address}
            onChange={handleOnChangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            // size={50}
            style={{
              height: "30px",
              width: "fit-content",
              border: "1px solid rgb(26,148,255)",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Update"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "600",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
      {/* </Loading> */}
    </div>
  );
};

export default ProfilePage;
