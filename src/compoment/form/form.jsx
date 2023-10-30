import React, { useState, useContext, useEffect } from "react";
import data from "../../data/data1.json";
import { db } from "../../config";
import { UserContext } from "../../usecontex/usecontex";
import Select from "react-select";
import { Pagination } from "antd";
import style from "./form.module.scss";
import { MyContext } from "../../usecontex/usecontex1";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarOutlined } from "@ant-design/icons";
const dataEdit = data.orders.map((data) => ({
  code: data.code,
  phone_number: data.customer_data.phone_number,
  name: data.customer_data.name,
  id: data.customer_data.name.match(/\d+[A-Z]-\d+\.\d+/)
    ? data.customer_data.name.match(/\d+[A-Z]-\d+\.\d+/)[0]
    : null,
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
    searchText,
    setSearchText,
  } = useContext(UserContext);
  const { RenderTime, dataItemArr, setDataItemArr } = useContext(MyContext);

  const { Messenger } = useContext(MyContext);
  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];

  const username1 = localStorage.getItem("user");
  const [changeInput, setchangeInput] = useState("");
  const [indexcodeItem, setIndexCodeItem] = useState("");
  const [hinderTable, setHinderTable] = useState(false);
  const [ktvJoin, setKtvJoin] = useState("");
  const [opentext, setOpentex] = useState(false);
  const [hinderEdit, setHinderEdit] = useState(true);
  const [save, setSave] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  if (dataItemArr === null) {
    writeDatabase(`data_items_car`, dataEdit);
  }
  const handerClick = (code) => {
    let index = dataItemArr.findIndex((item) => item.code === code);
    setIndexArr(index);
    setDataItem(dataItemArr[index]);
    setHinderTable(true);
  };
  const handerSelect = (option) => {
    setKtvJoin(option);
    const data_edit_arr = [...dataItemArr];
    data_edit_arr[indexArr].list_items[indexItem].ktv = option;
    writeDatabase(`data_items_car`, data_edit_arr);
  };

  const handleDateChange = (data) => {
    Messenger("success", "Thành Công");
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const day = date.getDate();
    setSearchText(`${day}/${month}/${year}`);
    setShowDatePicker(false); // Ẩn bảng ngày sau khi chọn
  };

  const editItems = () => {
    const data_edit_arr = [...dataItemArr];
    const dataid = data_edit_arr[indexArr].list_items[indexItem];
    const newText = `${username1}:${changeInput}`;
    dataid.ktv = ktvJoin;
    if (changeInput.trim() !== "") {
      if (dataid.text === undefined) {
        dataid.text = [newText];
      } else dataid.text = [...dataid.text, newText];
    }

    setOpentex(false);
    writeDatabase(`data_items_car`, data_edit_arr);
  };
  const data_item_render =
    dataItemArr && searchText
      ? dataItemArr.filter((data) => {
          return (
            (data.code && data.code.includes(searchText)) ||
            (data.name && data.name.includes(searchText)) ||
            (data.phone_number && data.phone_number.includes(searchText)) ||
            (data.id && data.id.includes(searchText)) ||
            (RenderTime(data.created_on) &&
              RenderTime(data.created_on).includes(searchText))
          );
        })
      : dataItemArr;

  const totalItems = data_item_render.length;
  //   const pageNumber = 1;
  const getPageData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let pageData;
    if (totalItems !== 0) {
      pageData = data_item_render.slice(startIndex, endIndex);

      return pageData;
    }
  };
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
      <div className="container-fluid">
        <div
          className="mb-3 d-flex justify-content-between"
          style={{ position: "relative" }}>
          <input
            type="text"
            style={{ width: "500px" }}
            placeholder="Tìm kiếm mã đơn,tên khách hàn, sdt,ngày tạo,biển số..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={() => setShowDatePicker((pre) => !pre)}>
            <CalendarOutlined />
          </button>
          <div style={{ position: "absolute", right: "0", top: "40px" }}>
            {showDatePicker && (
              <DatePicker inline onChange={handleDateChange} />
            )}
          </div>
        </div>
        <div className="wrapper">
          {" "}
          <table className=" table table-bordered border-black bg-white">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>SDT</th>
                <th>Thời gian tạo</th>
              </tr>
            </thead>
            <tbody>
              {getPageData(page) &&
                getPageData(page).map((data, index) => (
                  <tr onClick={() => handerClick(data.code)}>
                    <td>{data.code}</td>
                    <td style={{ maxWidth: "500px" }}>{data.name}</td>
                    <td>{data.phone_number}</td>
                    <td>{RenderTime(data.created_on)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {hinderTable && dataItemArr[indexArr] && (
          <div className={style.oveplay}>
            <div style={{ overflow: "auto" }} className={style.oveplayconten}>
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={() => setHinderTable(false)}>
                close
              </button>

              <div>
                <h1>Mã đơn: {dataItemArr[indexArr].code}</h1>
                <p>Tên khách hàng: {dataItemArr[indexArr].name}</p>
                <p>
                  {dataItemArr[indexArr].name.match(/\d+[A-Z]-\d+\.\d+/) &&
                    dataItemArr[indexArr].name.match(/\d+[A-Z]-\d+\.\d+/)[0]}
                </p>
                {dataItemArr[indexArr].district && (
                  <p>Địa chỉ {dataItemArr[indexArr].district}</p>
                )}
                <p>SDT: {dataItemArr[indexArr].phone_number}</p>
              </div>
              <div className="wrapper">
                {" "}
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
                    {dataItemArr[indexArr].list_items &&
                      dataItemArr[indexArr].list_items.map((item, index) => (
                        <tr
                          onClick={() => {
                            setIndexItem(index);
                          }}>
                          <td>{index + 1}</td>
                          <td>{item.name_item}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.quantity} {item.unit}
                          </td>
                          <td>{item.tag || ""}</td>
                          {hinderEdit && (
                            <td>
                              <Select
                                isMulti
                                value={item.ktv}
                                name="colors"
                                onChange={(option) => {
                                  handerSelect(option);
                                }}
                                options={datauserktv}
                                className="basic-multi-select"
                                classNamePrefix="select"
                              />
                            </td>
                          )}
                          <td onClick={() => setOpentex(true)}>
                            {item.text}{" "}
                            {opentext && (
                              <input
                                type="text"
                                onChange={(e) => setchangeInput(e.target.value)}
                              />
                            )}
                          </td>
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
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <Pagination
            defaultCurrent={1}
            showSizeChanger
            defaultPageSize={20}
            onShowSizeChange={onShowSizeChange}
            total={totalItems}
            onChange={handlePageChange}
          />
        </div>
      </div>{" "}
    </>
  );
};

export default Form;
