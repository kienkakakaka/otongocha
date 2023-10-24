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
    <div className={style.container}>
      <div className="main-content">
        <div className="row d-flex">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={style.itemconten}>
              <div className={style.contenchart2}>
                <Chart2 />
              </div>
              <div>
                <p className="category">
                  <strong>Phụ tùng</strong>
                </p>
                <h4 className="card-title">80 đơn hàng</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={style.itemconten}>
              <div className={style.contenchart2}>
                <Chart2 />
              </div>
              <div>
                <p className="category">
                  <strong>Phụ kiện</strong>
                </p>
                <h4 className="card-title">70 đơn hàng</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={style.itemconten}>
              <div className={style.contenchart2}>
                <DemoColumn />
              </div>
              <div>
                <p className="category">
                  <strong>Tuần này</strong>
                </p>
                <h4 className="card-title"></h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabledashboard />
    </div>
  );
};

export default Conten;
