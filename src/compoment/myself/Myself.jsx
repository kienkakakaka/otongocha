import React, { useContext, useEffect, useState } from "react";
import Chart2 from "../chart/Chart2";
import DemoColumn from "../chart/chart6";
import style from "./myself.module.scss";
import Chart5 from "../chart/chart5";
import { UserContext } from "../../usecontex/usecontex";
import Select from "react-select";

const username = localStorage.getItem("user");
const Myself = () => {
  const [hinderEdit, setHinderEdit] = useState(true);

  const [hinderTable, setHindertable] = useState(false);
  const [hinderTable2, setHinderTable2] = useState(false);
  const [myuser, setmyUser] = useState([]);
  const [myuserIndex, setmyUserIndex] = useState();
  console.log(myuser);
  const { readDatabase, writeDatabase } = useContext(UserContext);
  const [hinderForm, setHinderForm] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  console.log(dataItem);
  const [dataItemArr, setDataItemArr] = useState([]);
  const datauserktv = [
    { value: "kienktv", label: "kienktv" },
    { value: "cuongktv", label: "cuongktv" },
    { value: "ngocktv", label: "ngocktv" },
    { value: "hienktv", label: "hienktv" },
    { value: "hungktv", label: "hungktv" },
    { value: "datktv", label: "datktv" },
  ];
  const [codeItem, setCodeItem] = useState("");
  const [indexcodeItem, setIndexCodeItem] = useState("");
  const [changeInput, setchangeInput] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const handerClick = (index) => {
    setmyUserIndex(index);
    setDataItem(myuser[index]);
    setHinderTable2(true);
  };
  const user = datauserktv.map((user) => user.value);

  useEffect(() => {
    user.map((user) => {
      const results =
        dataItemArr &&
        dataItemArr.filter((data) => {
          return data.list_items.some((item) => {
            return item.ktv && item.ktv.some((ktv) => ktv.value === user);
          });
        });
      writeDatabase(`data_items/${user}`, results);
      console.log(results);
    });

    // setmyUser(results);
  }, [dataItemArr]);
  useEffect(() => {
    readDatabase(`data_items_car/data`, setDataItemArr);
  }, []);

  const editItems = () => {
    // handerClick(myuserIndex);
    if (dataItemArr && dataItemArr.length !== 0) {
      const updateDataItems = dataItemArr.map((item) => {
        if (item.code == codeItem) {
          item.list_items[indexcodeItem].text =
            item.list_items[indexcodeItem].text === undefined
              ? `${username}:${changeInput}  `
              : item.list_items[indexcodeItem].text +
                `${username}:${changeInput}  `;
          return item;
        } else return item;
      });
      writeDatabase(`data_items_car`, updateDataItems);
    }
    setchangeInput("");
    console.log(myuser);
    setDataItem(myuser[myuserIndex]);
  };
  const data = [
    {
      timePeriod: "2019 Q3",
      value: 1,
    },
    {
      timePeriod: "2019 Q4",
      value: 1.2,
    },
    {
      timePeriod: "2020 Q1",
      value: 1.3,
    },
    {
      timePeriod: "2020 Q2",
      value: 1.4,
    },
    {
      timePeriod: "2020 Q3",
      value: 1.5,
    },
    {
      timePeriod: "2020 Q4",
      value: 1.6,
    },
    {
      timePeriod: "2021 Q1",
      value: 1.6,
    },
    {
      timePeriod: "2021 Q2",
      value: 1.7,
    },
    {
      timePeriod: "2021 Q3",
      value: 1.8,
    },
    {
      timePeriod: "2021 Q4",
      value: 1.9,
    },
    {
      timePeriod: "2022 Q1",
      value: 2,
    },
    {
      timePeriod: "2022 Q2",
      value: 2.1,
    },
    {
      timePeriod: "2022 Q3",
      value: 2.2,
    },
    {
      timePeriod: "2022 Q4",
      value: 2.3,
    },
    {
      timePeriod: "2023 Q1",
      value: 2.4,
    },
    {
      timePeriod: "2023 Q2",
      value: 2.5,
    },
    {
      timePeriod: "2023 Q3",
      value: 2.6,
    },
    {
      timePeriod: "2023 Q4",
      value: 2.6,
    },
    {
      timePeriod: "2024 Q1",
      value: 2.7,
    },
    {
      timePeriod: "2024 Q2",
      value: 2.8,
    },
    {
      timePeriod: "2024 Q3",
      value: 2.9,
    },
    {
      timePeriod: "2024 Q4",
      value: 3,
    },
    {
      timePeriod: "2025 Q1",
      value: 3.1,
    },
    {
      timePeriod: "2025 Q2",
      value: 3.2,
    },
  ];

  useEffect(() => {
    readDatabase(`data_items/${username}/data`, setmyUser);
  }, []);

  return (
    <>
      <div className={`container ${style.container}`}>
        <div className="row d-flex">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`d-flex ${style.itemconten}`}>
              <div className={style.contenchart2}>
                <Chart2 data={data} />
              </div>
              <div>
                <p>Lộ trình phát tiển</p>
                <h4>49%</h4>
                <button
                  onClick={() => {
                    setHindertable((pre) => !pre);
                    setHinderForm(false);
                  }}
                  className={style.btnsubmit}>
                  Chấm điểm
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`d-flex ${style.itemconten}`}>
              <div className={style.contenchart2}>
                <Chart5 />
              </div>
              <div>
                <p className="category">
                  <strong>Tỉ lệ tham gia</strong>
                </p>
                <h4 className="card-title">92%</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`d-flex ${style.itemconten}`}>
              <div className={style.contenchart2}>
                <Chart2 />
              </div>
              <div>
                <p className="category">
                  <strong>Hoa Hồng</strong>
                </p>
                <h4 className="card-title">225K</h4>
                <p>1 - 10 /10/2023</p>
              </div>
            </div>
          </div>
        </div>

        {hinderTable && (
          <div>
            <table className="table table-bordered border-black">
              <thead>
                <tr>
                  <th className="fw-bold">TT</th>
                  <th className="fw-bold">Tiêu chí</th>
                  <th className="fw-bold">Hệ số</th>
                  <th className="fw-bold">Nhân viên chấm điểm</th>
                  <th className="fw-bold">Quản lý chấm điểm</th>
                  <th className="fw-bold">Giám đốc chấm điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold">1</td>
                  <td className="fw-bold">Năng suất làm việc</td>
                  <td style={{ textAlign: "center" }}>60</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">2</td>
                  <td className="fw-bold">Chất lượng chuyên môn</td>
                  <td style={{ textAlign: "center" }}>60</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">3</td>
                  <td className="fw-bold">
                    Đào tạo nhân viên hỗ trợ đồng nghiệp
                  </td>
                  <td style={{ textAlign: "center" }}>40</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">4</td>
                  <td className="fw-bold">Làm việc nhóm</td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">5</td>
                  <td className="fw-bold">Tuân thủ nội quy</td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">6</td>
                  <td className="fw-bold">
                    Văn hoá ứng xử với KH, đồng nghiệp
                  </td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">7</td>
                  <td className="fw-bold">Tính tự giác,chủ động công việc</td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">8</td>
                  <td className="fw-bold">
                    Ý kiến sáng tạo cải tiến công việc
                  </td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">9</td>
                  <td className="fw-bold">Học tập nâng cao chuyên môn</td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">10</td>
                  <td className="fw-bold">Thực hành 5s Kaizen</td>
                  <td style={{ textAlign: "center" }}>20</td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input className="w-25" type="number" />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="fw-bold">Tổng điểm</td>
                  <td className="fw-bold" style={{ textAlign: "center" }}>
                    300
                  </td>
                  <td className="fw-bold" style={{ textAlign: "center" }}>
                    ...
                  </td>
                  <td className="fw-bold" style={{ textAlign: "center" }}>
                    ...
                  </td>
                  <td className="fw-bold" style={{ textAlign: "center" }}>
                    ...
                  </td>
                  <td className="fw-bold" style={{ textAlign: "center" }}></td>
                </tr>
              </tbody>
            </table>
            <div class="mb-3">
              <label
                className="fw-bold"
                for="exampleFormControlTextarea1"
                class="form-label">
                Góp ý, đề xuất
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label
                className="fw-bold"
                for="exampleFormControlTextarea1"
                class="form-label">
                Nhận xét của quản lý
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label
                className="fw-bold"
                for="exampleFormControlTextarea1"
                class="form-label">
                Nhận xét của giám đốc
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"></textarea>
            </div>
            <button className="btn btn-primary mb-3 mt-3">Cập nhật</button>
          </div>
        )}
        {hinderForm && (
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Góp ý
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"></textarea>
            <button className="btn btn-primary mb-3 mt-3">Cập nhật</button>
          </div>
        )}
        <div className={style.itemconten}>
          <h1>Công việc hôm nay</h1>
          <table className="table table-hover">
            <thead className="text-primary">
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>SDT</th>
                <th>Thời gian tạo</th>
              </tr>
            </thead>
            <tbody>
              {myuser &&
                myuser.map((data, index) => (
                  <tr
                    onClick={() => {
                      handerClick(index);
                      setCodeItem(data.code);
                    }}>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.created_on}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {hinderTable2 && dataItem && (
          <div className={style.oveplay}>
            <div style={{ overflow: "auto" }} className={style.oveplayconten}>
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={() => setHinderTable2(false)}>
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
                  {myuser[myuserIndex].list_items.map((dataItem, index) => {
                    // console.log(dataItem.text);
                    return (
                      <tr
                      // onClick={() => {
                      //   setIndexItem(dataItem);
                      // }}
                      >
                        <td>{index + 1}</td>
                        <td>{dataItem.name_item}</td>
                        <td>{dataItem.price}</td>
                        <td>
                          {dataItem.quantity} {dataItem.unit}
                        </td>
                        <td>{dataItem.tag || ""}</td>
                        <td>
                          {dataItem.ktv &&
                            dataItem.ktv.map((user) => user.value)}
                        </td>
                        <td>{dataItem.text}</td>

                        <td>
                          <input
                            type="text"
                            onClick={() => setIndexCodeItem(index)}
                            // value={changeInput}
                            onChange={(e) => setchangeInput(e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              editItems();
                            }}>
                            Lưu
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Myself;
