import React, { useContext, useEffect, useMemo, useState } from "react";
import { MyContext } from "../../usecontex/usecontex1";
import { UserContext } from "../../usecontex/usecontex";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Pagination, Modal } from "antd";
import Select from "react-select";

const Tabledashboard = () => {
  const position = localStorage.getItem("position");
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const admin = position === "Trưởng phòng" || position === "Quản lý";
  const history = useNavigate();
  const { setSearchText } = useContext(UserContext);

  const { dataItemArr, Messenger, RenderTime } = useContext(MyContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataTable, setDataTable] = useState([]);
  let item_filter = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const list_data = dataItemArr.forEach((items) => {
    if (!items.id) return;
    items.list_items.forEach((item) =>
      item_filter.push({
        time: RenderTime(items.created_on),
        name: items.name,
        id: items.id,
        name_item: item.name_item,
        price: item.price,
        quantity: item.quantity,
        tag: item.tag,
        unit: item.unit,
        ktv: item.ktv,
        text: item.text,
        code: items.code,
      })
    );
  });
  const kpi = (key) =>
    item_filter &&
    item_filter.filter((data) => {
      // console.log(data.name_item);
      return data.name_item && data.name_item.includes(key);
    });

  console.log(dataItemArr);
  // console.log(item_filter);
  const totalItems = item_filter.length;
  //   const pageNumber = 1;
  const getPageData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let pageData;
    if (item_filter.length !== 0) {
      pageData = item_filter.slice(startIndex, endIndex);

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
    <div className="wrapper">
      <h2 className="text-center">
        Khoán chỉ tiêu phòng {month}/{year}{" "}
      </h2>
      <table
        style={{ backgroundColor: "#fff" }}
        className=" table table-bordered border-black">
        <thead>
          <tr>
            <th>STT</th>
            <th>Sản phẩm,Dịch vụ</th>
            <th>DVT</th>
            <th>Chỉ tiêu</th>
            <th>Doanh số</th>
            <th>Hoa hồng</th>
            <th>Tổng hoa hồng</th>
            <td>Đạt</td>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Chỉnh góc lái"));
            }}>
            <td>1</td>
            <td>Combo hunter</td>
            <td>xe</td>
            <td>30</td>
            <td>15.000.000</td>
            <td>20.000</td>
            <td>600.000</td>
            <td
              style={{
                color: kpi("Chỉnh góc lái").length > 30 ? "green" : "red",
              }}>
              {kpi("Chỉnh góc lái").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Vệ sinh phanh 4 bánh"));
            }}>
            <td>2</td>
            <td>Gói vệ sinh phanh 4 bánh</td>
            <td>Xe</td>
            <td>25</td>
            <td>7.000.000</td>
            <td>10.000</td>
            <td>250.000</td>
            <td
              style={{
                color:
                  kpi("Vệ sinh phanh 4 bánh").length > 25 ? "green" : "red",
              }}>
              {kpi("Vệ sinh phanh 4 bánh").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Chổi"));
            }}>
            <td>3</td>
            <td>Chổi gạt mưa</td>
            <td>Đôi</td>
            <td>35</td>
            <td>14.000.000</td>
            <td>5.000</td>
            <td>175.000</td>
            <td
              style={{
                color: kpi("Chổi").length > 35 ? "green" : "red",
              }}>
              {kpi("Chổi").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Lọc"));
            }}>
            <td>4</td>
            <td>Lọc động cơ,Lọc điều hoà</td>
            <td>Cái</td>
            <td>90</td>
            <td>13.500.000</td>
            <td>5.000</td>
            <td>450.000</td>
            <td
              style={{
                color: kpi("Lọc").length > 90 ? "green" : "red",
              }}>
              {kpi("Lọc").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("bendix"));
            }}>
            <td>5</td>
            <td>Má phanh Bendix</td>
            <td>Bộ</td>
            <td>10</td>
            <td>7.500.000</td>
            <td>30.000</td>
            <td>300.000</td>{" "}
            <td
              style={{
                color: kpi("bendix").length > 10 ? "green" : "red",
              }}>
              {kpi("bendix").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("brembo"));
            }}>
            <td>6</td>
            <td>Má phanh Brembo</td>
            <td>Bộ</td>
            <td>5</td>
            <td>10.500.000</td>
            <td>60.000</td>
            <td>300.000</td>
            <td
              style={{
                color: kpi("brembo").length > 5 ? "green" : "red",
              }}>
              {kpi("brembo").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Chổi"));
            }}>
            <td>7</td>
            <td>Nước làm mát HPK</td>
            <td>Lít</td>
            <td>60</td>
            <td>4.800.000</td>
            <td>5.000</td>
            <td>300.000</td>{" "}
            <td
              style={{
                color: kpi("Nước làm mát").length > 60 ? "green" : "red",
              }}>
              {kpi("Nước làm mát").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Thảm lót chân"));
            }}>
            <td>8</td>
            <td>Thảm lót chân Kata</td>
            <td>Bộ</td>
            <td>10</td>
            <td>5.970.000</td>
            <td>100.000</td>
            <td>300.000</td>{" "}
            <td
              style={{
                color: kpi("Thảm lót chân").length > 10 ? "green" : "red",
              }}>
              {kpi("Thảm lót chân").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("CLưới chống chuột"));
            }}>
            <td>9</td>
            <td>Lưới chống chuột</td>
            <td>Cái</td>
            <td>20</td>
            <td>5.000.000</td>
            <td>20.000</td>
            <td>400.000</td>{" "}
            <td
              style={{
                color: kpi("Lưới chống chuột").length > 20 ? "green" : "red",
              }}>
              {kpi("Lưới chống chuột").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("lavor"));
            }}>
            <td>10</td>
            <td>Vô lăng,gối đầu Lavor</td> <td>Cái</td>
            <td>10</td>
            <td>5.000.000</td>
            <td>30.000</td>
            <td>300.000</td>{" "}
            <td
              style={{
                color: kpi("lavor").length > 10 ? "green" : "red",
              }}>
              {kpi("lavor").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Màn hình Gotech"));
            }}>
            <td>11</td>
            <td>Màn hình,Box Gotech</td>
            <td>Bộ</td>
            <td>1</td>
            <td>12.500.000</td>
            <td>100.000</td>
            <td>100.000</td>{" "}
            <td
              style={{
                color: kpi("Màn hình Gotech").length > 1 ? "green" : "red",
              }}>
              {kpi("Màn hình Gotech").length}
            </td>
          </tr>
          <tr
            onClick={() => {
              setIsModalOpen(true);
              setDataTable(kpi("Màn hình Naviplay"));
            }}>
            <td>12</td>
            <td>Màn hình,Box Naviplay</td>
            <td>Bộ</td>
            <td>7</td>
            <td>49.000.000</td>
            <td>50.000</td>
            <td>350.000</td>{" "}
            <td
              style={{
                color: kpi("Màn hình Naviplay").length > 7 ? "green" : "red",
              }}>
              {kpi("Màn hình Naviplay").length}
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        title="Chi tiết chỉ tiêu"
        open={isModalOpen}
        // onOk={handleOk}
        width={1200}
        onCancel={handleCancel}
        footer={null}>
        <div className="wrapper">
          <table className=" table table-bordered border-black ">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Khách hàng</th>
                <th>KTV</th>
                <th>Thời gian</th>
                {admin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {dataTable &&
                dataTable.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.ktv && item.ktv.map((i) => <p>{i.value}</p>)}</td>
                    <td>{item.time}</td>
                    {admin && (
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setSearchText(item.code);
                            Messenger("success", "Tham chiếu thành công");
                            history("/");
                          }}>
                          Tham chiếu
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default Tabledashboard;
