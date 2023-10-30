import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./usecontex";
import { getDatabase, push, ref as dbRef, set } from "firebase/database";
// import data from "../data/data2.json";
export const MyContext = React.createContext();
export const MyProvider = ({ children }) => {
  const username = localStorage.getItem("user");
  const super_admin = username === "giamdoc";
  const [dataItemArr, setDataItemArr] = useState([]);
  const [idItemCars, setIdItemCars] = useState([]);
  const [itemsNote, setItemnote] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [hinderOverplay, setHinderOverplay] = useState(false);

  const { readDatabase, writeDatabase } = useContext(UserContext);
  const Messenger = (mess, value) => {
    toast[mess](`${value}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    readDatabase(`data_items_car/data`, setDataItemArr);

    readDatabase(`datadayoff/data`, setDataDayOff);
  }, []);
  const [dataDayOff, setDataDayOff] = useState([]);
  let result = useMemo(() => {
    if (super_admin) {
      return (
        dataDayOff &&
        dataDayOff.reduce((acc, day) => {
          if (day.success === "wait" && day.admin) return acc + 1;
          return acc;
        }, 0)
      );
    } else
      return (
        dataDayOff &&
        dataDayOff.reduce((acc, day) => {
          if (day.success === "wait") return acc + 1;
          return acc;
        }, 0)
      );
  }, [dataDayOff]);
  const RenderTime = (datadate) => {
    const date = new Date(datadate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };
  // const dataEdit = data.map((data) => ({
  //   code: data.code,
  //   phone_number: data.customer_data.phone_number,
  //   name: data.customer_data.name,
  //   id: data.customer_data.name.match(/\d+[A-Z]-\d+\.\d+/)
  //     ? data.customer_data.name.match(/\d+[A-Z]-\d+\.\d+/)[0]
  //     : null,
  //   created_on: data.created_on,
  //   district: data.customer_data.addresses[0]?.address1 ?? null,
  //   list_items: data.order_line_items.map((data) => ({
  //     name_item: data.product_name,
  //     price: data.price,
  //     tag: data.note,
  //     quantity: data.quantity,
  //     unit: data.unit,
  //     ktv: [],
  //   })),
  // }));
  // writeDatabase(`data_items_car`, dataEdit);
  const noteItems = idItemCars
    ? dataItemArr.filter((data) => {
        return data.id && data.id.includes(idItemCars);
      })
    : dataItemArr;
  // console.log(noteItems);
  const listItemsNote = (e, code) => {
    e.preventDefault();
    const listItems = dataItemArr.filter((data) => {
      return data.id && data.id.includes(code);
    });
    const itemsNote = listItems.map((item) =>
      item.list_items.filter((data) => data.text !== undefined)
    );

    const [item] = itemsNote;
    if (item.length === 0) {
      Messenger("error", "Không có ghi chú");
      return;
    }
    setItemnote(item);
    setHinderOverplay(true);
  };
  const pushToDatabase = (path, data) => {
    set(push(dbRef(getDatabase(), "/scores")), data);
  };
  return (
    <MyContext.Provider
      value={{
        Messenger,
        RenderTime,
        result,
        setIdItemCars,
        dataItemArr,
        listItemsNote,
        itemsNote,
        setHinderOverplay,
        hinderOverplay,
        pushToDatabase,
      }}>
      {children}
    </MyContext.Provider>
  );
};
