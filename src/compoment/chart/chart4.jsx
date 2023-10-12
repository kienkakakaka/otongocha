import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./chart.module.scss";
import { Column } from "@ant-design/plots";

const Chart4 = () => {
  // const [data, setData] = useState([]);
  const data = [
    {
      name: "Phụ tùng",
      day: "Thứ 2",
      value: 18.9,
    },
    {
      name: "Phụ tùng",
      day: "Thứ 3",
      value: 28.8,
    },
    {
      name: "Phụ tùng",
      day: "Thứ 4",
      value: 39.3,
    },
    {
      name: "Phụ tùng",
      day: "Thứ 5",
      value: 81.4,
    },
    {
      name: "Phụ tùng",
      day: "Thứ 6",
      value: 47,
    },
    {
      name: "Phụ tùng",
      day: "Thứ 7",
      value: 20.3,
    },
    {
      name: "Phụ tùng",
      day: "Chủ nhật",
      value: 24,
    },

    {
      name: "Phụ kiện",
      day: "Thứ 2",
      value: 12.4,
    },
    {
      name: "Phụ kiện",
      day: "Thứ 3",
      value: 23.2,
    },
    {
      name: "Phụ kiện",
      day: "Thứ 4",
      value: 34.5,
    },
    {
      name: "Phụ kiện",
      day: "Thứ 5",
      value: 99.7,
    },
    {
      name: "Phụ kiện",
      day: "Thứ 6",
      value: 52.6,
    },
    {
      name: "Phụ kiện",
      day: "Thứ 7",
      value: 35.5,
    },
    {
      name: "Phụ kiện",
      day: "Chủ nhật",
      value: 37.4,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "day",
    yField: "value",
    seriesField: "name",

    dodgePadding: 2,
    label: {
      position: "middle",

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return (
    <div className={`container  ${style.container}`}>
      <Column {...config} />
    </div>
  );
};

export default Chart4;
