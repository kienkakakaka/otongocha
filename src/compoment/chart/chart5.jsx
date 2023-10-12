import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const Chart5 = () => {
  const data = [
    {
      type: "Tham gia",
      value: 92,
    },
    {
      type: "Không tham gia",
      value: 8,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    legend: false,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div style={{ width: "150px", height: "100px" }}>
      <Pie {...config} />
    </div>
  );
};

export default Chart5;
