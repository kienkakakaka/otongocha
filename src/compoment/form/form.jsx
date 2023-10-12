import React, { useState, useContext, useEffect } from "react";
import data from "../../data/data1.json";
import { db } from "../../config";
import { UserContext } from "../../usecontex/usecontex";
import Select from "react-select";

import style from "./form.module.scss";
const dataEdit = data.orders.map((data) => ({
  code: data.code,
  phone_number: data.customer_data.phone_number,
  name: data.customer_data.name,
  created_on: data.created_on,
  district: data.customer_data.addresses[0].district,
  list_items: data.order_line_items.map((data) => ({
    name_item: data.product_name,
    price: data.price,
    tag: data.note,
    quantity: data.quantity,
    unit: data.unit,
    ktv: [],
  })),
}));
const Form = () => {
  const {
    setmyUser,
    readDatabase,
    writeDatabase,
    indexArr,
    setIndexArr,
    indexItem,
    setIndexItem,
  } = useContext(UserContext);
  const [dataItemArr, setDataItemArr] = useState([]);

  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];
  const username = datauserktv.map((user) => user.value);

  const [hinderTable, setHinderTable] = useState(false);
  const [ktvJoin, setKtvJoin] = useState("");

  console.log(indexItem);
  const [hinderEdit, setHinderEdit] = useState(true);
  const [save, setSave] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  useEffect(() => {
    readDatabase(`data_items_car/data`, setDataItemArr);
  }, []);

  if (dataItemArr === null) {
    writeDatabase(`data_items_car`, dataEdit);
  } else console.log(dataItemArr);
  const handerClick = (index) => {
    setIndexArr(index);
    setDataItem(dataItemArr[index]);
    setHinderTable(true);
  };
  const editItems = () => {
    // console.log(dataItemArr[indexArr].list_items[index]);
    const data_edit_arr = [...dataItemArr];
    data_edit_arr[indexArr].list_items[indexItem].ktv = ktvJoin;
    writeDatabase(`data_items_car`, data_edit_arr);
  };
  useEffect(() => {
    username.map((user) => {
      const results =
        dataItemArr &&
        dataItemArr.filter((data) => {
          return data.list_items.some((item) => {
            return item.ktv && item.ktv.some((ktv) => ktv.value === user);
          });
        });
      writeDatabase(`data_items/${user}`, results);
    });

    // setmyUser(results);
  }, [dataItemArr]);

  return (
    <>
      <div className="container-fluid">
        <table className=" table table-bordered border-black">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>SDT</th>
              <th>Thời gian tạo</th>
            </tr>
          </thead>
          <tbody>
            {dataItemArr &&
              dataItemArr.map((data, index) => (
                <tr onClick={() => handerClick(index)}>
                  <td>{data.code}</td>
                  <td>{data.name}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.created_on}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        {hinderTable && dataItem && (
          <div className={style.oveplay}>
            <div style={{ overflow: "auto" }} className={style.oveplayconten}>
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={() => setHinderTable(false)}>
                close
              </button>

              <div>
                <h1>Mã đơn: {dataItem.code}</h1>
                <p>Tên khách hàng: {dataItem.name}</p>
                {dataItem.district && <p>Địa chỉ {dataItem.district}</p>}
                <p>SDT: {dataItem.phone_number}</p>
              </div>

              <table className=" table table-bordered border-black">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tag</th>
                    <th>KTV</th>
                    <th>Ghi chú</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataItem.list_items.map((dataItem, index) => (
                    <tr
                      onClick={() => {
                        setIndexItem(index);
                      }}>
                      <td>{index + 1}</td>
                      <td>{dataItem.name_item}</td>
                      <td>{dataItem.price}</td>
                      <td>
                        {dataItem.quantity} {dataItem.unit}
                      </td>
                      <td>{dataItem.tag || ""}</td>
                      {hinderEdit && (
                        <td>
                          <Select
                            isMulti
                            value={dataItem.ktv}
                            name="colors"
                            onChange={(option) => setKtvJoin(option)}
                            options={datauserktv}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </td>
                      )}
                      <td>{dataItem.text}</td>
                      <td>
                        <button
                          onClick={() => {
                            editItems(index);
                          }}>
                          Lưu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default Form;
