import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { MyContext } from "../../usecontex/usecontex1";
import { Button, Modal } from "antd";
import ModalScores from "./ModalScores";

const TableManagaScores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { readDatabase } = useContext(UserContext);
  const [Arrdata, setArrdata] = useState([]);
  const [ArrdataIndex, setArrdataIndex] = useState([]);
  const { RenderTime } = useContext(MyContext);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [userTitel, setUserTitel] = useState([]);
  const [name, setName] = useState("");
  const [dataUserSelect, setDataUserSelect] = useState(null);
  useEffect(() => {
    readDatabase("/scores", setArrdata);
    readDatabase("/user", setUserTitel);
  }, []);
  if (Arrdata === null) return;
  const Arr_item_scores = Arrdata && Object.values(Arrdata);
  const Arr_item_filter =
    Arr_item_scores &&
    Arr_item_scores.filter(
      (item) =>
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year &&
        item.type === "user"
    );
  const Arr_item_admin =
    Arrdata &&
    Arr_item_scores.findIndex(
      (item) =>
        item.name === name &&
        item.type === "admin" &&
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year
    );
  const Arr_item_super_admin =
    Arrdata &&
    Arr_item_scores.findIndex(
      (item) =>
        item.name === name &&
        item.type === "superadmin" &&
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year
    );
  let userScores_admin;
  let userScores_super_admin;
  if (Arr_item_admin !== -1) userScores_admin = Arr_item_scores[Arr_item_admin];
  if (Arr_item_super_admin !== -1)
    userScores_super_admin = Arr_item_scores[Arr_item_super_admin];
  const submitScores = (index, name) => {
    setArrdataIndex(Arr_item_scores[index]);
    setName(name);
    setIsModalOpen(true);
    if (userTitel[name].titel) setDataUserSelect(userTitel[name].titel);
  };
  const Rendertd = (names) => {
    const Arr_item_super_admin =
      Arrdata &&
      Arr_item_scores.findIndex(
        (item) =>
          item.name === names &&
          item.type === "superadmin" &&
          new Date(item.time).getMonth() === month &&
          new Date(item.time).getFullYear() === year
      );
    const Arr_item_admin =
      Arrdata &&
      Arr_item_scores.findIndex(
        (item) =>
          item.name === names &&
          item.type === "admin" &&
          new Date(item.time).getMonth() === month &&
          new Date(item.time).getFullYear() === year
      );
    const Arr_item_user =
      Arrdata &&
      Arr_item_scores.findIndex(
        (item) =>
          item.name === names &&
          item.type === "user" &&
          new Date(item.time).getMonth() === month &&
          new Date(item.time).getFullYear() === year
      );
    if (Arr_item_super_admin !== -1) {
      return "Giám đốc đã duyệt";
    } else if (Arr_item_admin !== -1) {
      return "Trưởng phòng đã duyệt";
    } else if (Arr_item_user !== -1) {
      return "Chờ duyệt";
    }
  };
  if (Arrdata === null) return;
  return (
    <div>
      <ModalScores
        isModalOpen={isModalOpen}
        ArrdataIndex={ArrdataIndex}
        setIsModalOpen={setIsModalOpen}
        user={dataUserSelect}
        name={name}
      />
      <h1 className="text-center text-4xl m-2 font-medium">
        Phiếm điểm tháng {month + 1}
      </h1>
      <table className=" table table-bordered border-black">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tài khoản</th>
            <th>Ngày gửi</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Arr_item_filter &&
            Arr_item_filter.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{RenderTime(item.time)}</td>
                <td>{Rendertd(item.name)}</td>
                <td>
                  <button
                    onClick={() => submitScores(index, item.name)}
                    className="btn btn-primary">
                    Duyệt phiếu
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableManagaScores;
