import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import InputComponents from "../InputComponents/InputComponents";
import { getBase64 } from "../../ultils";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
// import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
// import Search from "antd/es/transfer/search";
const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });

  const [form] = Form.useForm();

  const mutationDeleted = useMutationHook((data) => {
    const { id, access_token } = data;
    const res = UserService.deleteUser({
      id,
      access_token,
    });
    return res;
  });

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    setIsLoadingUpdate(true); // đặt loading true sớm
    try {
      const res = await UserService.getDetailsUser(
        rowSelected,
        user?.access_token
      );
      if (res?.data) {
        setStateUserDetails({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          isAdmin: res.data.isAdmin,
          address: res.data.address,
          avatar: res.data.avatar,
        });
      }
    } catch (error) {
      console.error("Lỗi khi fetch chi tiết user:", error);
      message.error("Không thể lấy thông tin người dùng!");
    } finally {
      setIsLoadingUpdate(false);
    }
  };
  useEffect(() => {
    if (stateUserDetails.name) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };
  // const handleDeleteManyUsers = (ids) => {
  //   mutationDeletedMany.mutate(
  //     { ids: ids, access_token: user?.access_token },
  //     {
  //       onSettled: () => {
  //         queryUser.refetch();
  //       },
  //     }
  //   );
  // };
  const mutationUpdate = useMutationHook((data) => {
    const { id, access_token, ...stateUserDetails } = data;
    const res = UserService.updateUser({
      id,
      access_token,
      data: stateUserDetails,
    });
    return res;
  });
  const mutationDeletedMany = useMutationHook(({ ids, access_token }) => {
    return UserService.deleteManyUser({ ids }, access_token);
  });

  const handleDeleteManyUsers = (ids) => {
    if (!ids?.length || !user?.access_token) {
      return message.warning(
        "Vui lòng chọn người dùng và đảm bảo đã đăng nhập."
      );
    }

    mutationDeletedMany.mutate(
      {
        ids,
        access_token: user.access_token,
      },
      {
        onSuccess: () => {},
        onError: () => {
          message.error("Xoá nhiều người dùng thất bại!");
        },
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  // const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;
  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
    staleTime: 0 // đảm bảo dữ liệu cũ không bị cache quá lâu
  });
  const { isLoading: isLoadingUsers, data: users } = queryUser;
  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{ color: "orange", fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
        <DeleteOutlined
          style={{
            marginLeft: "15px",
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }}
        />
      </div>
    );
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "Name User",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  // const dataTable =
  //   users?.data?.length &&
  //   users?.data?.map((user) => {
  //     return {
  //       ...user,
  //       key: user._id,
  //       isAdmin: user.isAdmin ? "True" : "False",
  //     };
  //   });
  const dataTable = users?.data?.map((user) => ({
    ...user,
    key: user._id,
    isAdmin: user.isAdmin ? "True" : "False",
  }));

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany]);
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
  };
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      // message.success();
      queryUser.refetch(); // <- Cập nhật lại bảng sau khi update
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);
  

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
        onSuccess: () => {
          handleCancelDelete(); // Đóng modal sau khi xoá thành công
        },
        onError: () => {
          message.error("Xoá người dùng thất bại!");
        },
      }
    );
  };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  //   setStateUser({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     isAdmin: false,
  //   });
  //   form.resetFields();
  // };
  // const handleOnChange = (e) => {
  //   setStateUser({
  //     ...stateUser,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        access_token: user?.access_token,
        data: stateUserDetails,
      },
      {
        onSuccess: () => {
          message.success('Cập nhật người dùng thành công!');
        },
        onError: () => {
          message.error("Cập nhật người dùng thất bại!");
        },
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  
  return (
    <div style={{ width: "100%" }}>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUsers}
          columns={columns}
          isLoading={isLoadingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        {/* <Loading> */}
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onUpdateUser}
          autoComplete="on"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <InputComponents
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputComponents
              value={stateUserDetails.email}
              onChange={handleOnChangeDetails}
              name="email"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputComponents
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <InputComponents
              value={stateUserDetails.address}
              onChange={handleOnChangeDetails}
              name="address"
            />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your avatar!",
              },
            ]}
          >
            <WrapperUploadFile
              onChange={handleOnChangeAvatarDetails}
              maxCount={1}
            >
              <Button>Select File</Button>
              {stateUserDetails?.avatar && (
                <img
                  src={stateUserDetails?.avatar}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
            {/* <WrapperUploadFile
              fileList={
                stateUserDetails.image
                  ? [{ uid: "-1", url: stateUserDetails.image }]
                  : []
              }
              onChange={handleOnChangeAvatarDetails}
              maxCount={1}
              listType="picture-card"
            >
              {!stateUserDetails.image && <Button>Select File</Button>}
            </WrapperUploadFile> */}
          </Form.Item>
          <Form.Item label={null}>
            <Button
              style={{ marginLeft: "200px" }}
              type="primary"
              htmlType="submit"
            >
              Apply
            </Button>
          </Form.Item>
        </Form>
        {/* </Loading> */}
      </DrawerComponent>
      <ModalComponent
        title="Xoá người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        {/* <Loading isLoading={isLoading}> */}
        <div className="">Bạn có chắc muốn xoá tài khoản này không?</div>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
