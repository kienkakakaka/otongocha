import React from "react";
import style from "./table2.module.scss";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const Table2 = () => {
  return (
    <div className={`container  ${style.container}`}>
      <div className="d-flex  justify-content-between mb-3 mt-3">
        <div className="col-7">
          <h1 className="fw-bold">Phiếu lương tháng 10/2023</h1>
          <div className="d-flex  justify-content-between">
            <div>
              <p>
                Họ và tên: <i className="fw-bold">Phan Hữu Kiên</i>
              </p>
              <p>
                Bộ phận:<i className="fw-bold">Phòng kỹ thuật</i>
              </p>
            </div>
            <div>
              <p>Mã số nhân viên</p>
              <p>
                Chức vụ: <i className="fw-bold">Nhân viên</i>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end flex-column">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-primary"
            table="table-to-xls"
            filename="bảng lương tháng 10"
            sheet="tablexls"
            buttonText="Xuất file Excel"
          />
          <p>
            Xếp loại: <i className="fw-bold">gần đạt</i>
          </p>
          <p>
            Bậc nghề: <i className="fw-bold">2.3</i>
          </p>
          <p>
            Lộ trình phát triển: <i className="fw-bold">49%</i>
          </p>
        </div>
      </div>
      <div className="wrapper">
        {" "}
        <table className="table table-bordered border-black" id="table-to-xls">
          <thead>
            <tr>
              <th className="fw-bold">TT</th>
              <th className="fw-bold">Diễn giải</th>
              <th className="fw-bold">Chấm điểm</th>
              <th className="fw-bold">Thang điểm</th>
              <th className="fw-bold">Hệ số điểm</th>
              <th className="fw-bold">Hệ số nhân</th>
              <th className="fw-bold text-danger">Hệ số chia lương</th>
              <th className="fw-bold">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">1</td>
              <td className="fw-bold">Hệ số chia lương cứng</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td className="text-danger">1.54</td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">2</td>
              <td className="fw-bold">Hệ số lương bậc nghề</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td className="text-danger">1.54</td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">3</td>
              <td className="fw-bold">Hệ số tham gia doanh số</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td className="text-danger">1.54</td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">4</td>
              <td className="fw-bold">Hệ số hiệu quả công việc</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td className="text-danger">1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.1</td>
              <td>Năng suất làm việc</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>Chất lượng chuyên môn</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.3</td>
              <td>Đào tạo nhân viên hỗ trợ đồng nghiệp</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.4</td>
              <td>Làm việc nhóm</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.5</td>
              <td>Tuân thủ nội quy</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.6</td>
              <td>Văn hoá ứng xử với KH, đồng nghiệp</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.7</td>
              <td>Tính tự giác,chủ động công việc</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.8</td>
              <td>Ý kiến sáng tạo cải tiến công việc</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.9</td>
              <td>Học tập nâng cao chuyên môn</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td>4.10</td>
              <td>Thực hành 5s Kaizen</td>
              <td className="fw-bold">25</td>
              <td>25</td>
              <td>1.02</td>
              <td>1.50</td>
              <td>1.54</td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">I</td>
              <td className="fw-bold">Lương</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">8.000.000</td>
            </tr>
            <tr>
              <td className="fw-bold">II</td>
              <td className="fw-bold">Lương khoản, thử việc</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">III</td>
              <td className="fw-bold">Thưởng cá nhân</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">100.000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Thưởng cá nhân</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hoa hồng bán sản phẩm</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">IV</td>
              <td className="fw-bold">Phụ cấp và trợ cấp</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">360.000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Phụ cấp công việc ngoài chuyên môn</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Phụ cấp độc hại rủi ro</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Phụ cấp xăng xe,điện thoại</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">360.000</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Trợ cấp gia cảnh</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Chế độ đãi ngộ</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>6</td>
              <td>Tiền phép</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="fw-bold">V</td>
              <td className="fw-bold">Tổng thu nhập</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">8.460.000</td>
            </tr>
            <tr>
              <td className="fw-bold">VI</td>
              <td className="fw-bold">Các khoản giảm trừ</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Trừ tiền tạm ứng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Trừ tiền đang nợ công ty</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Vi phạm nội quy</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Bồi thường lỗi công việc</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Phí BHXH, BHYT, Công đoàn</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>512.000</td>
            </tr>
            <tr>
              <td className="fw-bold">VII</td>
              <td className="fw-bold">Thực nhận</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">7.800.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table2;
