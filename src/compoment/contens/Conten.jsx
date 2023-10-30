import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import Chart4 from "../chart/chart4";
import Chart5 from "../chart/chart5";
import Chart2 from "../chart/Chart2";
import style from "./conten.module.scss";
import Chart3 from "../chart/Chart3";
import DemoColumn from "../chart/chart6";
import Tabledashboard from "./tabledashboard";
const Conten = () => {
  const { valueCar } = useContext(UserContext);
  return (
    <div className=" container">
      <Tabledashboard />
    </div>
  );
};

export default Conten;
