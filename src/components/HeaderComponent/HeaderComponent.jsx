import { Badge, Button, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperText,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./styleHeader";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
// import Search from "antd/es/transfer/search";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import Loading from "../../components/LoadingComponent/Loading";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserAvatar(user?.avatar);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  const handleHome = () => {
    navigate("/"); // Chuyển về trang chủ
  };
  return (
    <div
      style={{
        width: "100vw",
        background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <WrapperText>
            <Button
              style={{
                backgroundColor: "transparent",
                color: 'white',
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={handleHome}
            >
              TuanThanhShop
            </Button>
          </WrapperText>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              // textButton="Tìm kiếm"
              placeholder="Tìm sản phẩm mong muốn"
              onChange={onSearch}
              // enterButton
            />
          </Col>
        )}

        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <div className="">
                    <WrapperTextHeaderSmall>
                      <span>Đăng nhập/Đăng ký</span>
                    </WrapperTextHeaderSmall>
                  </div>
                  <div className="">
                    <WrapperTextHeaderSmall>
                      <span>Tài khoản</span>
                    </WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ display: "flex", alignItems: "center", cursor: 'pointer' }}>
              <Badge count={6} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>
                <span>Giỏ hàng</span>
              </WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
