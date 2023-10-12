import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
const DemoColumn = () => {
  const data = [
    {
      type: "Thứ 2",
      sales: 38,
    },

    {
      type: "Thứ 3",
      sales: 52,
    },

    {
      type: "Thứ 4",
      sales: 61,
    },
    {
      type: "Thứ 5",
      sales: 145,
    },
    {
      type: "Thứ 6",
      sales: 48,
    },
    {
      type: "Thứ 7",
      sales: 38,
    },
    {
      type: "Chủ nhật",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: null,
    xAxis: {
      range: [0, 1],
      grid: null,
      label: null,
    },
    yAxis: {
      grid: null,
      label: null, // Ẩn chữ của hàng dọc
    },
  };
  return (
    <div
      style={{
        width: "150px",
        height: "100px",
      }}>
      <Column {...config} />
    </div>
  );
};
export default DemoColumn;
