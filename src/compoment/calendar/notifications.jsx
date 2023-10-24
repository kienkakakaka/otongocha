import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";

const Notifications = () => {
  const username = localStorage.getItem("user");
  const { readDatabase } = useContext(UserContext);
  const [dataDayOff, setDataDayOff] = useState([]);

  useEffect(() => {
    readDatabase(`datadayoff/data`, setDataDayOff);
  }, []);
  const datauser =
    dataDayOff &&
    dataDayOff
      .filter((item) => item.username === username)
      .sort((a, b) => {
        const dateA = `${a.year}-${a.month}-${a.day}`;
        const dateB = `${b.year}-${b.month}-${b.day}`;
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

  const data =
    datauser &&
    datauser.reverse().map((item) => {
      return (
        <tr>
          <td>
            {item.day + 1}/{item.month}/{item.year}
          </td>
          <td>
            {item.titel === "offfullday" ? "Nghỉ nguyên ngày" : ""}
            {item.titel === "offmorning" ? "Nghỉ buổi sáng" : ""}
            {item.titel === "offafternoon" ? "Nghỉ buổi chiều" : ""}
          </td>
          <td>
            {" "}
            {item.timeHours}:{item.timeMinutes}
            {"  "}
            {item.dayevent}/{item.month}/{item.year}
          </td>
          <td>{item.text}</td>
          <td>{item.textadmin}</td>
          <td>
            {item.success === "wait" && "Chờ duyệt"}
            {item.success === "ok" && "Đã duyệt"}
            {item.success === "no" && "Từ chối"}
          </td>
        </tr>
      );
    });
  return (
    <div>
      <>
        <table className="table table-bordered border-black">
          <thead>
            <tr>
              <th>Thời gian nghỉ</th>
              <th>Loại nghỉ</th>
              <th>Thời gian nộp đơn</th>
              <th>Lý do</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </>
    </div>
  );
};

export default Notifications;
