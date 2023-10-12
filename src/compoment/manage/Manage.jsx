import React, { useContext, useRef, useState } from "react";
import Select from "react-select";
import style from "./Manage.module.scss";
import { UserContext } from "../../usecontex/usecontex";
import { useClickAway } from "@uidotdev/usehooks";
const Manage = () => {
  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];
  const { writeDatabase, username, valueCar } = useContext(UserContext);

  const [onCar, setOnCar] = useState("");
  const [onTextCar, setOnTextCar] = useState("");
  const [onTime, setOnTime] = useState("");
  const [onTimeOut, setOnTimeOut] = useState("");
  const [typeNumber, setTypeNumber] = useState("");
  const [colorCar, setColorCar] = useState("#333");
  const [ktvJoin, setKtvJoin] = useState("");
  const [numberKilometer, setNumberKilometer] = useState(0);
  const [typeSuccess, setTypeSuccess] = useState(false);
  const [numberVin, setNumberVin] = useState();
  const [closeOver, setCloseOver] = useState(false);
  const [dataOverplay, setDataOverPlay] = useState();
  const handerClick = (data) => {
    console.log(data.Car);
    setDataOverPlay(data);
    setCloseOver(true);
  };
  const cloaseOverplay = () => {
    setCloseOver(false);
  };
  const overplayRef = useRef(null);
  const removeOver = (event) => {
    if (overplayRef.current && !overplayRef.current.contains(event.target)) {
      setCloseOver(false);
    }
  };
  // const ref = useClickAway(() => cloaseOverplay());
  return (
    <div className={`container ${style.container}`}>
      <h1 className="btn btn-primary">Quản lý nhân viên</h1>
      <h1 className="btn btn-primary">Quản lý đơn hàng</h1>
      <h1 className="btn btn-primary">Quản lý đơn đơn nghỉ</h1>
      <table
        style={{ display: "none" }}
        className="table table-bordered border-black">
        <thead>
          <tr>
            {" "}
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
          <tr>
            <td>1</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>2</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>3</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>4</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>5</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>6</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>7</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>{" "}
          <tr>
            <td>9</td>
            <td>Phan Hữu Kiên</td>
            <td>Kỹ Thuật</td>
            <td>Nhân viên</td>
            <td>Hà Tĩnh</td>
            <td>0982090524</td>
            <td>
              <button className="btn btn-primary ml-3">Chỉnh sửa</button>
              <button className="btn btn-primary ml-3">Chấm điểm</button>
              <button className="btn btn-primary ml-3">Xem HĐ</button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-hover">
        <thead className="text-primary">
          <tr>
            <th>ID</th>
            <th>Xe</th>
            <th>Biển số</th>
            <th>Thời gian vào</th>
            <th>Thời gian ra</th>
          </tr>
        </thead>
        <tbody>
          {valueCar !== null &&
            valueCar.length !== 0 &&
            valueCar.map((data, index) => (
              <tr onClick={() => handerClick(data)}>
                <td>{index + 1}</td>
                <td>
                  {data.TypeCar}-{data.Car}
                </td>
                <td>{data.Conten}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {closeOver && (
        <div
          onClick={(event) => removeOver(event)}
          ref={overplayRef}
          className={style.oveplay}>
          <div className={style.oveplayconten}>
            <span onClick={() => cloaseOverplay(false)} className={style.close}>
              X
            </span>
            <label htmlFor="">Tên khách hàng</label>
            <label htmlFor="">Tên xe {dataOverplay.Car}</label>
            <label htmlFor="">Tên Biển số xe</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
