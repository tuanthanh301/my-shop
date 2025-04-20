import React from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import * as OrderService from "../../services/OrderService";
// import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { convertPrice } from "../../ultils";
import  VerticalChart  from "./VerticalChart";
// import Search from "antd/es/transfer/search";
const AdminOrder = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });
  const { isLoading: isLoadingOrder, data: orders } = queryOrder;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
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
        // setTimeout(() => searchInput.current?.select(), 100);f
      }
    },
  });
  const columns = [
    {
      title: "Tên người mua",
      dataIndex: "userName",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    // {
    //   title: "Thành phố",
    //   dataIndex: "city",
    //   render: (text) => <a>{text}</a>,
    //   sorter: (a, b) => a.city.length - b.city.length,
    //   ...getColumnSearchProps("city"),
    // },
    {
      title: "Giá đơn hàng",
      dataIndex: "itemsPrice",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
      ...getColumnSearchProps("itemsPrice"),
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "shippingPrice",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
      ...getColumnSearchProps("shippingPrice"),
    },
    {
      title: "Tình trạng thanh toán",
      dataIndex: "isPaid",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Tình trạng đơn hàng",
      dataIndex: "isDelivered",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
  ];
  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      console.log("user", order);
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        city: order?.shippingAddress?.city,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        isDelivered: order?.isDelivered
          ? "Đã giao hàng thành công"
          : "Đang giao hàng",
        itemsPrice: convertPrice(order?.itemsPrice),
        totalPrice: convertPrice(order?.totalPrice),
        shippingPrice: convertPrice(order?.shippingPrice),
      };
    });
  return (
    <div style={{ width: "100%" }}>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{ width: "350px", height: "250px" }}>
          <PieChartComponent data={orders?.data} />
        </div>
        <div className="">
          <VerticalChart/>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrder}
          data={dataTable}
        />
      </div>
    </div>
  );
};

export default AdminOrder;
