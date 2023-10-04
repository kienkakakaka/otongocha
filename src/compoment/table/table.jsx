import React, { useContext, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";
import style from "./table.module.scss";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Table = () => {
  const username = localStorage.getItem("user");
  const { writeDatabase, arr } = useContext(UserContext);
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  let arrDay = [];
  for (let i = 1; i <= lastDayOfMonth; i++) {
    arrDay.push(<th key={i}>{i}</th>);
  }
  const clickBtn = () => {
    writeDatabase(`/user/${username}/titel`, "Phan Hữu Kiên");
  };
  const handerClickprev = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear(year - 1);
        return 11;
      } else {
        return prev - 1;
      }
    });
  };
  const handerClicknext = () => {
    setMonth((prev) => {
      if (prev < 11) {
        return prev + 1;
      } else {
        setYear(year + 1);
        return 0;
      }
    });
  };
  return (
    <div className={`container  ${style.container}`}>
      <h3>
        Bảng công tháng {month + 1} {year}
      </h3>
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-primary"
          table="table-to-xls"
          filename="test"
          sheet="tablexls"
          buttonText="Xuất file Elx"
        />
      </div>
      <table id="table-to-xls" className="table table-bordered border-black">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Phòng</th>
            {arrDay}
          </tr>
        </thead>
        <tbody>
          {arr &&
            arr.map((user) => {
              console.log(user.value.value.data);
              return (
                <tr>
                  {user.value.titel !== undefined ? (
                    <td className={style.name}>{user.value.titel.data.name}</td>
                  ) : (
                    <td className={style.name}>Chưa nhập tên!</td>
                  )}

                  {user.value.titel !== undefined ? (
                    <td className={style.nameclass}>
                      {user.value.titel.data.typerom}
                    </td>
                  ) : (
                    <td className={style.nameclass}>phòng</td>
                  )}
                  {user.value.value.data !== undefined &&
                    user.value.value.data.find(
                      (user) => user.month === month && user.year === year
                    ) !== undefined &&
                    user.value.value.data
                      .find(
                        (user) => user.month === month && user.year === year
                      )
                      .value.map((data) => {
                        console.log("run");
                        if (data.isSelect == "nooff") {
                          return <td key={data.key}>1</td>;
                        } else if (data.isSelect == "offfullday") {
                          return <td key={data.key}>0</td>;
                        } else if (
                          data.isSelect == "offmorning" ||
                          data.isSelect == "offafternoon"
                        ) {
                          return <td>0.5</td>;
                        } else {
                          return <td></td>;
                        }
                      })}
                </tr>
              );
            })}
        </tbody>
      </table>

      <div
        class="btn-group d-flex     justify-content-center"
        role="group"
        aria-label="Basic outlined example">
        <button
          type="button"
          onClick={() => handerClickprev()}
          class="btn btn-outline-primary d-flex justify-content-center align-items-center">
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button type="button" class="btn btn-outline-primary">
          Tháng {month + 1}
        </button>
        <button
          onClick={() => handerClicknext()}
          type="button"
          class="btn btn-outline-primary  d-flex justify-content-center align-items-center">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
