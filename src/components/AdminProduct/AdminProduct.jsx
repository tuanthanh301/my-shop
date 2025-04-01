import React, { useEffect, useRef, useState } from "react";

import { Button, Form, Input, Select, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import InputComponents from "../InputComponents/InputComponents";
import { getBase64, renderOptions } from "../../ultils";
import * as ProductService from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import Search from "antd/es/transfer/search";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    discount: "",
    rating: "",
    image: "",
    newType: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    discount: "",
    rating: "",
    image: "",
  });

  const [form] = Form.useForm();

  const mutation = useMutationHook((data) => {
    const { name, type, countInStock, price, description, discount, rating, image } =
      data;
    const res = ProductService.createProduct({
      name,
      type,
      countInStock,
      price,
      description,
      discount,
      rating,
      image,
    });
    return res;
  });
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...stateProductDetails } = data;
    const res = ProductService.updateProduct({
      id,
      token,
      data: stateProductDetails,
    });
    return res;
  });

  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct({
      id,
      token,
    });
    return res;
  });
  const mutationDeletedMany = useMutationHook((data) => {
    const { ids, token } = data;
    const res = ProductService.deleteManyProduct({
      ids,
      token,
    });
    return res;
  });
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct("",100);
    return res;
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data.name,
        type: res?.data.type,
        countInStock: res?.data.countInStock,
        price: res?.data.price,
        description: res?.data.description,
        rating: res?.data.rating,
        image: res?.data.image,
        discount: res?.data.discount
      });
    }
    setIsLoadingUpdate(false);
  };
  // useEffect(()=>{
  //   form.setFieldsValue(stateProductDetails)
  // },[form, stateProductDetails])
  useEffect(() => {
    if (stateProductDetails.name) {
      form.setFieldsValue(stateProductDetails);
    }
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const { data, isLoading, isSuccess, isError } = mutation;
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

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });

  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{ color: "orange", fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
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
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
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
    // render: (text) =>
    //   searchedColumn === dataIndex ?  (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const columns = [
    {
      title: "Name Product",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        } else if (value === "<=") {
          return record.price <= 50;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        } else if (value === "<=") {
          return Number(record.rating) <= 3;
        }
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      description: "",
      discount:"",
      rating: "",
      image: "",
    });
    form.resetFields();
  };
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
        onSuccess: () => {
          handleCancelDelete(); // Đóng modal sau khi xoá thành công
        },
        onError: () => {
          message.error("Xoá sản phẩm thất bại!");
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      type: "",
      countInStock: "",
      price: "",
      description: "",
      rating: "",
      image: "",
    });
    form.resetFields();
  };
  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
        // form.resetFields(); // Reset form
        // setStateProduct({// Reset state
        //   name: "",
        //   price: "",
        //   description: "",
        //   rating: "",
        //   image: "",
        //   type: "",
        //   newType: "",
        //   countInStock: "",
        // });
        handleCancel()
      },
    });
  };
  // const handleOnChange = (e) => {
  //   setStateProduct({
  //     ...stateProduct,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  // const handleOnChangeAvatarDetails = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateProductDetails({
  //     ...stateProductDetails,
  //     image: file.preview,
  //   });
  // };
  const handleOnChangeAvatarDetails = ({ fileList }) => {
    // Nếu có file mới, lấy file đó để cập nhật
    if (fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setStateProductDetails((prev) => ({
          ...prev,
          image: e.target.result, // Cập nhật URL ảnh mới
        }));
      };
      reader.readAsDataURL(file.originFileObj); // Chuyển file thành Data URL
    } else {
      // Nếu xóa hết ảnh
      setStateProductDetails((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          handleDeleteMany={handleDeleteManyProducts}
          isLoading={isLoadingProducts}
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
      <ModalComponent
        // forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        className="modal-product"
        okText=""
        footer={null}
      >
        {/* <Loading isLoading={isLoading}> */}
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input product type!",
              },
            ]}
          >
            <Select
              name="type"
              value={stateProduct.type}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct.type === "add_type" && (
            <Form.Item
              label="New type"
              name="newType"
              rules={[
                {
                  required: true,
                  message: "Please input product type!",
                },
              ]}
            >
              <InputComponents
                value={stateProduct.newType}
                onChange={handleOnChange}
                name="newType"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Count in stock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input product count in stock!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input product description!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input product discount!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.discount}
              onChange={handleOnChange}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input product rating!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input product image!",
              },
            ]}
          >
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
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
          </Form.Item>
          <Form.Item label={null}>
            <Button
              style={{ marginLeft: "200px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* </Loading> */}
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
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
          onFinish={onUpdateProduct}
          autoComplete="on"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <InputComponents
              value={stateProductDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input product type!",
              },
            ]}
          >
            <InputComponents
              value={stateProductDetails.type}
              onChange={handleOnChangeDetails}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Count in stock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input product count in stock!",
              },
            ]}
          >
            <InputComponents
              value={stateProductDetails.countInStock}
              onChange={handleOnChangeDetails}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price!",
              },
            ]}
          >
            <InputComponents
              value={stateProductDetails.price}
              onChange={handleOnChangeDetails}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input product description!",
              },
            ]}
          >
            <InputComponents
              value={stateProductDetails.description}
              onChange={handleOnChangeDetails}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input product discount!",
              },
            ]}
          >
            <InputComponents
              value={stateProduct.discount}
              onChange={handleOnChange}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input product rating!",
              },
            ]}
          >
            <InputComponents
              value={stateProductDetails.rating}
              onChange={handleOnChangeDetails}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input product image!",
              },
            ]}
          >
            {/* <WrapperUploadFile
                onChange={handleOnChangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
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
              </WrapperUploadFile> */}
            <WrapperUploadFile
              fileList={
                stateProductDetails.image
                  ? [
                      {
                        uid: "-1",
                        url: stateProductDetails.image,
                        name: "image",
                        status: "done",
                      },
                    ]
                  : []
              }
              onChange={handleOnChangeAvatarDetails}
              maxCount={1}
              listType="picture-card"
              beforeUpload={() => false} // Ngăn tải lên tự động
            >
              {!stateProductDetails.image && <Button>Select File</Button>}
            </WrapperUploadFile>
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
        title="Xoá sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        {/* <Loading isLoading={isLoading}> */}
        <div className="">Bạn có chắc muốn xoá sản phẩm này không?</div>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
