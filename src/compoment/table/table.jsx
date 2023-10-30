import React, { useContext, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";
import style from "./table.module.scss";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card } from "antd";
const Table = () => {
  const username = localStorage.getItem("user");
  const super_admin = username === "giamdoc";
  const { writeDatabase, arr } = useContext(UserContext);
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  let arrDay = [];
  for (let i = 1; i <= lastDayOfMonth; i++) {
    arrDay.push(<th key={i}>{i}</th>);
  }
  const position_user = arr.filter(
    (user) => user.value.titel.data.typerom === "Kỹ Thuật"
  );

  const result_time = 500;
  const result_time_plus = 4;
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
  const sortedArr = arr.slice().sort((a, b) => {
    const positionA =
      a.value.titel && a.value.titel.data && a.value.titel.data.position;
    const positionB =
      b.value.titel && b.value.titel.data && b.value.titel.data.position;

    const order = {
      "Trưởng phòng": 1,
      "Phó phòng": 2,
      "Tổ trưởng": 3,
      "Tổ phó": 4,
      "Nhân viên": 5,
    };

    return order[positionA] - order[positionB];
  });
  console.log(lastDayOfMonth);

  return (
    <div className={`container   ${style.container}`}>
      <h3>
        Bảng công tháng {month + 1} {year}
      </h3>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Nhân sự phòng" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{arr ? position_user.length - 1 : 0} Nhân viên</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  // setHindertable1((pre) => !pre);
                  // setHindertable2(false);
                  // setHindertable3(false);
                  // setAddUser(false);
                }}>
                Xem
              </button>
            </div>
          </Card>
        </div>{" "}
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Tổng giờ công" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{result_time} giờ công</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  // setHindertable3((pre) => !pre);
                  // setHindertable1(false);
                  // setHindertable2(false);
                  // setAddUser(false);
                }}>
                Xem
              </button>
            </div>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <Card title="Tổng giờ làm thêm" bordered={false}>
            <div className="d-flex justify-content-between">
              <h3>{result_time_plus} giờ làm thêm</h3>{" "}
              <button
                className="btn btn-primary"
                onClick={() => {
                  // setHindertable2((pre) => !pre);
                  // setHindertable1(false);
                  // setAddUser(false);
                  // setHindertable3(false);
                }}>
                Xem
              </button>
            </div>
          </Card>
        </div>
      </div>
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-primary"
          table="table-to-xls"
          filename={` bảng công tháng ${month + 1}`}
          sheet="tablexls"
          buttonText="Xuất file Excel"
        />
      </div>
      <div className="wrapper">
        {" "}
        <table
          id="table-to-xls"
          className="table table-bordered border-black bg-white">
          <thead>
            <tr>
              <th colSpan={lastDayOfMonth + 2} className="text-center">
                <h2>
                  {" "}
                  Bảng công tháng {month + 1} {year}
                </h2>
              </th>
            </tr>

            <tr>
              <th>Họ tên</th>
              <th>Phòng</th>
              {arrDay}
            </tr>
          </thead>
          <tbody>
            {sortedArr &&
              sortedArr.map((user) => {
                const titelUsers = user.value.titel && user.value.titel.data;
                const valueUser = user.value.value && user.value.value.data;
                if (user.value.value === undefined) return;
                if (titelUsers.email === "giamdoc@otongocha.vn") return;
                return (
                  <tr>
                    {user.value.titel !== undefined ? (
                      <td className={style.name}>{titelUsers.name}</td>
                    ) : (
                      <td className={style.name}>Chưa nhập tên!</td>
                    )}

                    {user.value.titel !== undefined ? (
                      <td className={style.nameclass}>{titelUsers.typerom}</td>
                    ) : (
                      <td className={style.nameclass}>phòng</td>
                    )}
                    {valueUser !== undefined &&
                      valueUser.find(
                        (user) => user.month === month && user.year === year
                      ) !== undefined &&
                      valueUser
                        .find(
                          (user) => user.month === month && user.year === year
                        )
                        .value.map((data) => {
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
      </div>

      <div className="text-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handerClickprev()}>
          <ArrowBackIosIcon />
        </button>
        <button type="button" className="btn btn-outline-primary">
          Tháng {month + 1}
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => handerClicknext()}
          type="button">
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Table;
