import { Modal } from "antd";
import React, { useRef, useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
const ModalScores = ({ setIsModalOpen, isModalOpen, ArrdataIndex, user }) => {
  const username = localStorage.getItem("user");
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const inputRef7 = useRef();
  const inputRef8 = useRef();
  const inputRef9 = useRef();
  const inputRef10 = useRef();
  const inputRef11 = useRef();
  console.log(ArrdataIndex);
  const AddEvent = () => {
    const list_input = {
      type: "admin",
      name: username,
      userSuccess: ArrdataIndex.name,
      time: new Date().toString(),
      input1: inputRef1.current.value,
      input2: inputRef2.current.value,
      input3: inputRef3.current.value,
      input4: inputRef4.current.value,
      input5: inputRef5.current.value,
      input6: inputRef6.current.value,
      input7: inputRef7.current.value,
      input8: inputRef8.current.value,
      input9: inputRef9.current.value,
      input10: inputRef10.current.value,
      input11: inputRef11.current.value,
    };
  };
  return (
    <div>
      <Modal
        title={
          <h3 style={{ fontSize: "30px" }}>
            Phiếu điểm tháng {new Date(ArrdataIndex.time).getMonth() + 1} /{" "}
            {new Date(ArrdataIndex.time).getFullYear()}
          </h3>
        }
        open={isModalOpen}
        width={900}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}>
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
        <table className="table table-bordered border-black">
          <thead>
            <tr>
              <th className="fw-bold">TT</th>
              <th className="fw-bold">Tiêu chí</th>
              <th className="fw-bold text-center">Hệ số</th>
              <th className="fw-bold text-center">Nhân viên chấm điểm</th>
              <th className="fw-bold">Quản lý chấm điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold">1</td>
              <td className="fw-bold">Năng suất làm việc</td>
              <td className="text-center">60</td>
              <td className="text-center">{ArrdataIndex.input1}</td>
              <td className="text-center">
                <input ref={inputRef1} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">2</td>
              <td className="fw-bold">Chất lượng chuyên môn</td>
              <td className="text-center">60</td>
              <td className="text-center">{ArrdataIndex.input2}</td>
              <td className="text-center">
                <input ref={inputRef2} className="border  w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">3</td>
              <td className="fw-bold">Đào tạo nhân viên hỗ trợ đồng nghiệp</td>
              <td className="text-center">40</td>
              <td className="text-center">{ArrdataIndex.input3}</td>
              <td className="text-center">
                <input ref={inputRef3} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">4</td>
              <td className="fw-bold">Làm việc nhóm</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input4}</td>
              <td className="text-center">
                <input ref={inputRef4} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">5</td>
              <td className="fw-bold">Tuân thủ nội quy</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input5} </td>
              <td className="text-center">
                <input ref={inputRef5} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">6</td>
              <td className="fw-bold">Văn hoá ứng xử với KH, đồng nghiệp</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input6}</td>
              <td className="text-center">
                <input ref={inputRef6} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">7</td>
              <td className="fw-bold">Tính tự giác,chủ động công việc</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input7}</td>
              <td className="text-center">
                <input ref={inputRef7} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">8</td>
              <td className="fw-bold">Ý kiến sáng tạo cải tiến công việc</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input8}</td>
              <td className="text-center">
                <input ref={inputRef8} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">9</td>
              <td className="fw-bold">Học tập nâng cao chuyên môn</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input9}</td>
              <td className="text-center">
                <input ref={inputRef9} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td className="fw-bold">10</td>
              <td className="fw-bold">Thực hành 5s Kaizen</td>
              <td className="text-center">20</td>
              <td className="text-center">{ArrdataIndex.input10}</td>
              <td className="text-center">
                <input ref={inputRef10} className="border w-10" type="number" />
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="fw-bold">Tổng điểm</td>
              <td className="text-center fw-bold">300</td>
              <td className="text-center fw-bold">
                {Number(ArrdataIndex.input10) +
                  Number(ArrdataIndex.input9) +
                  Number(ArrdataIndex.input8) +
                  Number(ArrdataIndex.input7) +
                  Number(ArrdataIndex.input6) +
                  Number(ArrdataIndex.input5) +
                  Number(ArrdataIndex.input4) +
                  Number(ArrdataIndex.input3) +
                  Number(ArrdataIndex.input2) +
                  Number(ArrdataIndex.input1)}
              </td>
              <td className="text-center fw-bold">...</td>
            </tr>
          </tbody>
        </table>
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
            ref={inputRef11}
            rows="3"></textarea>
        </div>
      </Modal>
    </div>
  );
};

export default ModalScores;
