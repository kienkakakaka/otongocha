import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "antd";
import Select from "react-select";
import style from "./Manage.module.scss";
import { UserContext } from "../../usecontex/usecontex";
import { useClickAway } from "@uidotdev/usehooks";
import Sigup from "../auth/createAcc";
import Manageoffday from "./manageoffday";
import { MyContext } from "../../usecontex/usecontex1";
import ManageScores from "./manageScores";
import TableManagaScores from "./tableManagaScores";
const Manage = () => {
  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];
  const [Arrdata, setArrdata] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [hindertable1, setHindertable1] = useState(false);
  const [hindertable2, setHindertable2] = useState(false);
  const [hindertable3, setHindertable3] = useState(false);

  const { arr, readDatabase } = useContext(UserContext);
  const { result } = useContext(MyContext);
  const [adduser, setAddUser] = useState(false);
  useEffect(() => {
    readDatabase("/scores", setArrdata);
  }, []);
  // if (Arrdata === null) return;
  const Arr_item_scores = Arrdata && Object.values(Arrdata);
  const Arr_item_filter =
    Arr_item_scores &&
    Arr_item_scores.filter(
      (item) =>
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year &&
        item.type === "user"
    );
  return (
    <div className={`container ${style.container}`}>
      {" "}
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Quan lý nhân sự" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{arr ? arr.length - 1 : 0} Nhân viên</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setHindertable1((pre) => !pre);
                  setHindertable2(false);
                  setHindertable3(false);
                  setAddUser(false);
                }}>
                Xem
              </button>
            </div>
          </Card>
        </div>{" "}
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Quản lý chấm điểm" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{Arr_item_filter ? Arr_item_filter.length : 0} Phiếu điểm</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setHindertable3((pre) => !pre);
                  setHindertable1(false);
                  setHindertable2(false);
                  setAddUser(false);
                }}>
                Chấm điểm
              </button>
            </div>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Quản lý ngày nghỉ" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{result ? result : 0} Đơn</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setHindertable2((pre) => !pre);
                  setHindertable1(false);
                  setAddUser(false);
                  setHindertable3(false);
                }}>
                Duyệt đơn
              </button>
            </div>
          </Card>
        </div>
      </div>
      <div>
        {hindertable1 && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddUser((pre) => !pre);
                setHindertable2(false);
              }}>
              +
            </button>{" "}
            {adduser && <Sigup />}
            <div className="wrapper">
              {" "}
              <table className="table table-bordered border-black">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Phòng</th>
                    <th>Chức vụ</th>
                    <th>Địa chỉ</th>
                    <th>SDT</th>
                    <th>Hàng động</th>
                  </tr>
                </thead>
                <tbody>
                  {arr &&
                    arr.map((user, index) => {
                      const itemuser =
                        user.value.titel && user.value.titel.data;
                      if (user.value.titel === undefined) {
                        return;
                      }

                      return (
                        <tr>
                          <td>{index}</td>
                          <td>{itemuser && itemuser.name}</td>
                          <td>{itemuser && itemuser.typerom}</td>
                          <td>{itemuser && itemuser.position}</td>
                          <td>{itemuser && itemuser.address}</td>
                          <td>{itemuser && itemuser.sdt}</td>
                          <td>
                            <button className="btn btn-primary ml-3">
                              Chỉnh sửa
                            </button>
                            <button className="btn btn-primary ml-3">
                              Chấm điểm
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {hindertable2 && <Manageoffday />}
      </div>{" "}
      <TableManagaScores />
    </div>
  );
};

export default Manage;
