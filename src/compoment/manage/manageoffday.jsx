import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { MyContext } from "../../usecontex/usecontex1";

const Manageoffday = () => {
  const { Messenger } = useContext(MyContext);
  const { arr, readDatabase, writeDatabase } = useContext(UserContext);
  const [arrDate, setArrDate] = useState([]);
  const [dataDayOff, setDataDayOff] = useState([]);

  useEffect(() => {
    readDatabase(`user`, setArrDate);
    readDatabase(`datadayoff/data`, setDataDayOff);
  }, []);
  // let result = useMemo(() => {
  //   return dataDayOff.reduce((acc, day) => {
  //     if (day.success === 'wait') return acc + 1;
  //     return acc;
  //   }, 0);
  // }, [dataDayOff]);

  const successitem = (e, item) => {
    e.preventDefault();
    let dayoff = [...dataDayOff];
    const indexItemSuccess =
      dataDayOff &&
      dataDayOff.findIndex((data) => {
        return (
          data.day === item.day &&
          data.dayevent === item.dayevent &&
          data.month === item.month &&
          data.year === item.year &&
          data.username === item.username
        );
      });
    dayoff[indexItemSuccess].success = "ok";
    writeDatabase(`datadayoff`, dayoff);

    const indexEditItems = arrDate[item.username].value.data.findIndex(
      (data) => {
        return data.month === item.month && data.year === item.year;
      }
    );
    let addSuccess = [...arrDate[item.username].value.data];

    addSuccess[indexEditItems].value[item.day].success = "ok";

    writeDatabase(`/user/${item.username}/value`, addSuccess);
    Messenger("success", "Duyệt đơn nghỉ phép thành công");
  };
  const remove = (e, item) => {
    const textadmin = prompt("Nhập lý do");
    if (textadmin.trim() === "") return;
    e.preventDefault();
    let dayoff = [...dataDayOff];
    const indexItemSuccess =
      dataDayOff &&
      dataDayOff.findIndex((data) => {
        return (
          data.day === item.day &&
          data.dayevent === item.dayevent &&
          data.month === item.month &&
          data.year === item.year &&
          data.username === item.username &&
          data.milisecend === item.milisecend
        );
      });

    dayoff[indexItemSuccess].success = "no";
    // delete dayoff[indexItemSuccess].titel;

    dayoff[indexItemSuccess].textadmin = textadmin;
    writeDatabase(`datadayoff`, dayoff);

    const indexEditItems = arrDate[item.username].value.data.findIndex(
      (data) => {
        return data.month === item.month && data.year === item.year;
      }
    );
    let addSuccess = [...arrDate[item.username].value.data];
    addSuccess[indexEditItems].value[item.day].success = "no";
    // delete addSuccess[indexEditItems].value[item.day].success;
    // delete addSuccess[indexEditItems].value[item.day].isSelect;
    addSuccess[indexEditItems].value[item.day].textadmin = textadmin;
    writeDatabase(`/user/${item.username}/value`, addSuccess);
    Messenger("error", "Đã từ chối đơn nghỉ phép");
  };
  return (
    <div>
      <table className="table table-bordered border-black">
        <thead>
          <tr>
            <th>Tài Khoản</th>
            <th>Ngày nghỉ</th>
            <th>Loại nghỉ</th>
            <th>Lý do</th>
            <th>Ngày nộp đơn</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataDayOff &&
            dataDayOff
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
              })
              .reverse()
              .map((item, index) => {
                // if (item.success === true || (!item.success && !item.titel))
                //   return;
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>
                      {item.day + 1}/{item.month}/{item.year}
                    </td>
                    <td>
                      {item.titel === "offfullday" ? "Nghỉ nguyên ngày" : ""}
                      {item.titel === "offmorning" ? "Nghỉ buổi sáng" : ""}
                      {item.titel === "offafternoon" ? "Nghỉ buổi chiều" : ""}
                    </td>
                    <td>{item.text}</td>
                    <td>
                      {item.timeHours}:{item.timeMinutes}
                      {"  "}
                      {item.dayevent}/{item.month}/{item.year}
                    </td>
                    <td>
                      {item.success === "wait" && "Chờ duyệt"}
                      {item.success === "ok" && "Đã duyệt"}
                      {item.success === "no" && "Từ chối"}
                    </td>
                    <td>
                      {item.success === "wait" && (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => successitem(e, item)}>
                            Duyệt đơn
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => remove(e, item, index)}>
                            Từ chối
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default Manageoffday;
