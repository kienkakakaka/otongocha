import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { arrCar } from "./datacar copy";
import { UserContext } from "../../usecontex/usecontex";
import style from "./event.module.scss";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../usecontex/usecontex1";
import Oveplayevent from "./oveplayevent";
const Event = () => {
  const history = useNavigate();
  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];
  const { Messenger } = useContext(MyContext);

  const [selectTypeCar, setSelectTypeCar] = useState([]);
  const [searchText1, setSearchText1] = useState("");
  const {
    RenderTime,
    dataItemArr,
    setDataItemArr,
    setIdItemCars,
    listItemsNote,
    setHinderOverplay,
  } = useContext(MyContext);
  const { writeDatabase, setSearchText, valueCar } = useContext(UserContext);
  const [onCar, setOnCar] = useState("");
  const [onTextCar, setOnTextCar] = useState("");
  const [onTime, setOnTime] = useState("");
  const [onTimeOut, setOnTimeOut] = useState("");
  const [typeNumber, setTypeNumber] = useState("");
  const [colorCar, setColorCar] = useState("black");
  const [ktvJoin, setKtvJoin] = useState("");
  const [numberKilometer, setNumberKilometer] = useState("");
  const [typeSuccess, setTypeSuccess] = useState(false);
  const [numberVin, setNumberVin] = useState("");

  const [hinderForm, setHinderForm] = useState(false);
  const [hinderEdit, setHinderEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const handerClick = (e) => {
    e.preventDefault();
    if (selectTypeCar === "" || onCar === "") {
      Messenger("error", "Vui lòng nhập loại xe và tên xe");
      return;
    } else if (onTextCar === "") {
      Messenger("error", "Vui lòng nhập biển số xe");
      return;
    }
    if (valueCar === null) {
      writeDatabase(`eventCar`, [
        {
          TypeCar: selectTypeCar,
          Car: onCar,
          Conten: onTextCar,
          time: onTime,
          timeout: onTimeOut,
          typeNumber: typeNumber,
          colorCar: colorCar,

          numberKilometer: numberKilometer,
          ktvjoin: ktvJoin,
          numberVin: numberVin,
          typeSuccess: typeSuccess,
        },
      ]);
    } else {
      writeDatabase(`eventCar`, [
        ...valueCar,
        {
          TypeCar: selectTypeCar,
          Car: onCar,
          Conten: onTextCar,
          time: onTime,
          timeout: onTimeOut,
          typeNumber: typeNumber,
          colorCar: colorCar,

          numberKilometer: numberKilometer,
          ktvjoin: ktvJoin,
          numberVin: numberVin,
          typeSuccess: typeSuccess,
        },
      ]);
    }
    Messenger("success", "Thêm sự kiện thành công");
    setSelectTypeCar("");
    setOnTimeOut("");
    setOnTime("");
    setOnCar("");
    setOnTextCar("");
    setHinderForm(true);
    setNumberVin("");
    setNumberKilometer("");
  };
  const removeItems = (Conten) => {
    let index = valueCar.findIndex((item) => item.Conten === Conten);
    let arr = [...valueCar];
    arr.splice(index, 1);

    writeDatabase(`eventCar`, arr);
  };
  const editItems = (Conten) => {
    let index = valueCar.findIndex((item) => item.Conten === Conten);
    setSelectTypeCar(valueCar[index].TypeCar);
    setOnTimeOut(valueCar[index].timeout);
    setOnTime(valueCar[index].time);
    setOnCar(valueCar[index].Car);
    setOnTextCar(valueCar[index].Conten);
    setIndexEdit(index);
    setHinderEdit(true);
    setHinderForm(true);
  };
  const indexCar = arrCar.findIndex((data) => data.name === selectTypeCar);
  const handerClickEdit = (e) => {
    e.preventDefault();
    if (indexEdit !== -1) {
      const data = [...valueCar];
      data[indexEdit] = {
        TypeCar: selectTypeCar,
        Car: onCar,
        Conten: onTextCar,
        time: onTime,
        timeout: onTimeOut,
        typeNumber: typeNumber,
        colorCar: colorCar,
        ktvJoin: ktvJoin,
        numberKilometer: numberKilometer,
      };
      console.log(data);
      writeDatabase(`eventCar`, data);
    }
  };

  return (
    <div className={` container ${style.container}`}>
      <h2 className="font-semibold">Dữ liệu xe</h2>
      <button
        className={`btn btn-primary mb-3 mt-3 ${style.btn}`}
        onClick={() => {
          setHinderForm((pre) => !pre);
          setHinderEdit(false);

          setSelectTypeCar("");
          setOnTimeOut("");
          setOnTime("");
          setOnCar("");
          setOnTextCar("");
          setTypeNumber("");

          setKtvJoin("");
          setNumberKilometer("");

          setIndexEdit(-1);
          setHinderEdit(false);
        }}>
        {hinderForm ? "x" : "+"}
      </button>
      <form
        action=""
        className={`row ${hinderForm ? style.active : style.hinder}`}>
        <div className="mb-3 col-4">
          <label for="disabledSelect" className="form-label">
            Hãng xe
          </label>
          <select
            value={selectTypeCar}
            id="disabledSelect"
            className="form-select"
            onChange={(e) => setSelectTypeCar(e.target.value)}>
            <option>Chọn hãng xe</option>
            {arrCar !== undefined &&
              arrCar.map((data) => (
                <option key={data.name} value={data.name}>
                  {data.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3 col-4">
          <label for="disabledSelect2" className="form-label">
            Loại xe
          </label>
          <select
            value={onCar}
            id="disabledSelect2"
            className="form-select"
            onChange={(e) => setOnCar(e.target.value)}>
            <option>Chọn tên xe</option>
            {indexCar !== -1 &&
              selectTypeCar.length > 0 &&
              arrCar[indexCar].typecar.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
          </select>
        </div>
        <div className="col-4">
          <label htmlFor="bienso" className="form-label">
            Biển số
          </label>
          <input
            value={onTextCar}
            type="text"
            id="bienso"
            className="form-control"
            onChange={(e) => setOnTextCar(e.target.value)}
          />
        </div>
        <div className="mb-3 col-4">
          <label for="exampleColorInput" class="form-label">
            Số VIN
          </label>
          <input
            type="number"
            class="form-control "
            onChange={(e) => setNumberVin(e.target.value)}
            id="exampleColorInput"
            value={numberVin}
            title="Choose your color"></input>
        </div>

        <div className="mb-3 col-3">
          <label for="disabledSelect2" className="form-label">
            Hộp số
          </label>
          <select
            value={typeNumber}
            id="disabledSelect2"
            className="form-select"
            onChange={(e) => setTypeNumber(e.target.value)}>
            <option>Chọn tên xe</option>
            <option>Số tự Động</option>
            <option>Số sàn</option>
          </select>
        </div>
        <div className="mb-3 col-1">
          <label for="exampleColorInput" class="form-label ">
            Màu xe
          </label>
          <input
            type="color"
            value={colorCar}
            class="form-control form-control-color"
            onChange={(e) => setColorCar(e.target.value)}
            id="exampleColorInput"
            title="Choose your color"></input>
        </div>

        <div className="mb-3 col-4">
          <label for="exampleColorInput" class="form-label">
            Số KM
          </label>
          <input
            type="number"
            class="form-control "
            onChange={(e) => setNumberKilometer(e.target.value)}
            id="exampleColorInput"
            value={numberKilometer}
            title="Choose your color"></input>
        </div>

        <button
          className={`btn btn-primary mt-3 ml-3 ${hinderEdit && style.hinder} ${
            style.btn
          }`}
          onClick={(e) => handerClick(e)}>
          Update
        </button>
        <button
          className={`btn btn-primary mt-3 ml-3 ${
            !hinderEdit && style.hinder
          } ${style.btn}`}
          onClick={(e) => handerClickEdit(e)}>
          Chỉnh sửa
        </button>
      </form>
      <br></br>
      <input
        type="text"
        className="mb-3"
        placeholder="Tìm kiếm..."
        value={searchText1}
        onChange={(e) => setSearchText1(e.target.value)}
      />
      <div className="wrapper">
        <table className="table table-bordered border-black bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hãng</th>
              <th>Xe</th>
              <th>Biển số</th>
              <th>Số Vin</th>
              <th style={{ whiteSpace: "nowrap" }}>Hộp số</th>
              <th>Màu xe</th>
              <th>Số KM</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {valueCar !== null &&
              valueCar.length !== 0 &&
              (valueCar
                ? valueCar.filter((data) => {
                    // console.log(data);
                    return data.Conten?.includes(searchText1);
                  })
                : valueCar
              ).map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.TypeCar}</td>
                  <td className="whitespace-nowrap ">{data.Car}</td>
                  <td className="whitespace-nowrap ">{data.Conten}</td>
                  <td>{data.numberVin}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{data.typeNumber}</td>
                  <td
                    className="d-flex justify-content-center align-items-center "
                    style={{ color: `${data.colorCar}`, fontSize: "25px" }}>
                    <i class="fa-solid fa-car"></i>
                  </td>
                  <td>{data.numberKilometer}</td>

                  <td className="d-flex flex-row flex-nowrap">
                    <button
                      onClick={() => {
                        editItems(data.Conten);
                        Messenger("info", "Vui lòng chỉnh sửa");
                      }}
                      className="btn btn-success">
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => {
                        removeItems(data.Conten);
                        Messenger("error", "xoá sự kiện thành công");
                      }}
                      className="btn btn-danger">
                      Xoá
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setSearchText(data.Conten);
                        Messenger("success", "Tham chiếu thành công");
                        history("/");
                      }}>
                      Tham chiếu
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        listItemsNote(e, data.Conten);
                      }}>
                      Ghi chú
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Oveplayevent />
    </div>
  );
};

export default Event;
