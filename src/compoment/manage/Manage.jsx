import React, { useContext, useRef, useState } from "react";
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
  const [hindertable1, setHindertable1] = useState(false);
  const [hindertable2, setHindertable2] = useState(false);
  const { arr } = useContext(UserContext);
  const { result } = useContext(MyContext);
  const [adduser, setAddUser] = useState(false);
  return (
    <div className={`container ${style.container}`}>
      {" "}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Quan lý nhân sự" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{arr.length - 1} Nhân viên</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setHindertable1((pre) => !pre);
                  setHindertable2(false);
                  setAddUser(false);
                }}>
                Xem
              </button>
            </div>
          </Card>
        </Col>{" "}
        <Col span={8}>
          <Card title="Quản lý chấm điểm" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{result} Phiếu điểm</h3>{" "}
              <button
                className="btn btn-primary"
                // onClick={() => {
                //   setHindertable2((pre) => !pre);
                //   setHindertable1(false);
                //   setAddUser(false);
                // }}
              >
                Chấm điểm
              </button>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Quản lý ngày nghỉ" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{result} Đơn</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setHindertable2((pre) => !pre);
                  setHindertable1(false);
                  setAddUser(false);
                }}>
                Duyệt đơn
              </button>
            </div>
          </Card>
        </Col>
      </Row>
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
                    const itemuser = user.value.titel && user.value.titel.data;
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
        )}
        {hindertable2 && <Manageoffday />}
        <TableManagaScores />
      </div>
    </div>
  );
};

export default Manage;
