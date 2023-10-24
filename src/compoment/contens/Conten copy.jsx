import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import Chart4 from "../chart/chart4";
import Chart5 from "../chart/chart5";
import Chart2 from "../chart/Chart2";
import style from "./conten.module.scss";
import Chart3 from "../chart/Chart3";
import DemoColumn from "../chart/chart6";
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
                  <strong>Tháng này</strong>
                </p>
                <h4 className="card-title">1.5 TỈ VND</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={style.itemconten}>
              <div className={style.contenchart2}>
                <DemoColumn />
              </div>
              <div>
                <p className="category">
                  <strong>Tuần này</strong>
                </p>
                <h4 className="card-title">500 TR VND</h4>
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
                  <strong>Đơn hàng</strong>
                </p>
                <h4 className="card-title">70 đơn hàng</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7 col-md-12">
            <h2>Doanh số Tuần này</h2>
            <Chart4 />
          </div>
          {/* <div className="col-lg-5 col-md-12">
            <h2>Tỉ lệ hoàn thành doanh số</h2>
            <Chart5 />
          </div> */}
          <div className="col-lg-5 col-md-12">
            <h2>Doanh số</h2>
            <Chart3 />
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="card">
              <div className="card-header card-header-text">
                <h4 className="card-title">Doanh số hôm nay</h4>
                <p className="category">Thứ 6 ngày 28 tháng 9 năm 2023</p>
              </div>
              <div className="card-content table-responsive">
                <table className="table table-hover">
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Xe</th>
                      <th>Sản phẩm</th>
                      <th>Giá trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Honda CRV</td>
                      <td>Màn GoTech 360 base</td>
                      <td>16.500.000</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Mazda CX5</td>
                      <td>Đèn V20L</td>
                      <td>9.000.000</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Honda City</td>
                      <td>Thảm katar</td>
                      <td>1.900.000</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Toyota Vios</td>
                      <td>Màn hình Naviplay N600</td>
                      <td>6.800.000</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Toyata Yaris</td>
                      <td>Ghế da NaPan</td>
                      <td>6.300.000</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Ford Ranger</td>
                      <td>Nắp thùng</td>
                      <td>5.200.000</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Huynhdai Accent</td>
                      <td>Ốp bậc trong ngoài</td>
                      <td>500.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12">
            <div className="card">
              <div className="card-header card-header-text">
                <h4 className="card-title">Sự kiện</h4>
              </div>
              <div className="card-content">
                <div className="streamline">
                  <div className="sl-item sl-primary">
                    {valueCar !== null &&
                      valueCar !== undefined &&
                      valueCar.map((data) => (
                        <div className="sl-content">
                          {/* <small className="text-muted">5 mins ago</small> */}
                          <p>
                            Xe {data.Conten} vào lúc {data.time}{" "}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <nav className="d-flex">
                  <ul className="m-0 p-0">
                    <li>
                      <a href="#"> Home </a>
                    </li>
                    <li>
                      <a href="#"> Company </a>
                    </li>
                    <li>
                      <a href="#"> Portfolio </a>
                    </li>
                    <li>
                      <a href="#"> Blog </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Conten;
