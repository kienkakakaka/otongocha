import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";

const Conten = () => {
  const { valueCar } = useContext(UserContext);
  return (
    <div>
      <div className="main-content">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-warning">
                  <span className="material-icons">equalizer</span>
                </div>
              </div>
              <div className="card-content">
                <p className="category">
                  <strong>Tháng này</strong>
                </p>
                <h3 className="card-title">... TỈ VND</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons text-info">info</i>
                  <a href="#pablo">See detailed report</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-rose">
                  <span className="material-icons">shopping_cart</span>
                </div>
              </div>
              <div className="card-content">
                <p className="category">
                  <strong>Đơn hàng</strong>
                </p>
                <h3 className="card-title">... Đơn hàng</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">local_offer</i> Product-wise
                  sales
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-success">
                  <span className="material-icons"> attach_money </span>
                </div>
              </div>
              <div className="card-content">
                <p className="category">
                  <strong>Hôm nay</strong>
                </p>
                <h3 className="card-title">... TR VND</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">date_range</i> Weekly sales
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
              <div className="card-header">
                <div className="icon icon-info">
                  <span className="material-icons"> follow_the_signs </span>
                </div>
              </div>
              <div className="card-content">
                <p className="category">
                  <strong>Nhân sự</strong>
                </p>
                <h3 className="card-title">... Người</h3>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="material-icons">update</i> Just Updated
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
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
