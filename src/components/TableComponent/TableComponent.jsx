import { Button, Table } from "antd";
import React, { useMemo, useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo( () => {
    const arr = columns.filter((col) => col.dataIndex !== 'action')
    return arr;
  }, [columns])
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setRowSelectedKeys(selectedRowKeys);
  //   },
  // };
  const rowSelection = useMemo(() => ({
    type: selectionType,
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  }), [selectionType]);
  
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };
  const handleExportExcel = () => {
    const excel = new Excel()
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx")
  }
  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            width: "fit-content",
            heigh: "30px",
            background: "#1677ff",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "10px",
          }}
          onClick={handleDeleteAll}
        >
          Xoá tất cả
        </div>
      )}
      <Button onClick={handleExportExcel}>Export Excel</Button>
      <div style={{ width: "100%" }}>
        <Table
          style={{ width: "100%" }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
      </div>
    </Loading>
  );
};

export default TableComponent;
