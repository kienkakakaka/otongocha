import { getDatabase, push, ref as dbRef, set } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../usecontex/usecontex1";
import { UserContext } from "../../usecontex/usecontex";
import { Modal } from "antd";

const Scores = ({ hinderTable, setHindertable }) => {
  const { pushToDatabase, Messenger } = useContext(MyContext);
  const { readDatabase } = useContext(UserContext);
  const [Arrdata, setArrdata] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const Arr_item_scores = Arrdata && Object.values(Arrdata);
  const username = localStorage.getItem("user");
  const Arr_item = Arrdata
    ? Arr_item_scores.findIndex(
        (item) =>
          item.name === username &&
          item.type === "user" &&
          new Date(item.time).getMonth() === month &&
          new Date(item.time).getFullYear() === year
      )
    : -1;
  useEffect(() => {
    readDatabase("/scores", setArrdata);
  }, []);
  const userScores = Arr_item_scores[Arr_item];
  console.log(userScores);
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
  const addEvent = () => {
    if (Arr_item !== -1) {
      Messenger("error", "Bạn đã nộp phiếu điểm, không thể gửi");
      return;
    }
    const list_input = {
      type: "user",
      name: username,
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
    if (
      list_input.input1 === "" ||
      list_input.input2 === "" ||
      list_input.input3 === "" ||
      list_input.input4 === "" ||
      list_input.input5 === "" ||
      list_input.input6 === "" ||
      list_input.input7 === "" ||
      list_input.input8 === "" ||
      list_input.input9 === "" ||
      list_input.input10 === ""
    ) {
      Messenger("error", "Vui lòng điền đầy đủ số điểm vào bảng");
      return;
    }
    pushToDatabase("score", list_input);
    inputRef1.current.value = "";
    inputRef2.current.value = "";
    inputRef3.current.value = "";
    inputRef4.current.value = "";
    inputRef5.current.value = "";
    inputRef6.current.value = "";
    inputRef7.current.value = "";
    inputRef8.current.value = "";
    inputRef9.current.value = "";
    inputRef10.current.value = "";
    inputRef11.current.value = "";
    Messenger("success", "Gửi phiếu điểm thành công");
  };

  return (
    <Modal
      title={
        <h3 style={{ fontSize: "30px" }}>
          {/* Phiếu điểm tháng {new Date(ArrdataIndex.time).getMonth() + 1} /{" "}
            {new Date(ArrdataIndex.time).getFullYear()} */}
        </h3>
      }
      open={hinderTable}
      width={900}
      onOk={() => setHindertable(false)}
      onCancel={() => setHindertable(false)}>
      <div>
        <h1 className="text-center text-4xl m-2 font-medium">
          Phiếm điểm tháng {month + 1}
        </h1>
        <table className="table table-bordered border-black bg-white">
          <thead>
            <tr>
              <th className="fw-bold">TT</th>
              <th className="fw-bold">Tiêu chí</th>
              <th className="fw-bold text-center">Hệ số</th>
              <th className="fw-bold text-center">Nhân viên chấm điểm</th>
              {Arr_item !== -1 && (
                <>
                  <th className="fw-bold text-center">Quản lý chấm điểm</th>
                  <th className="fw-bold text-center">
                    Giám đốc chấm điểm
                  </th>{" "}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-center">1</td>
              <td className="fw-bold">Năng suất làm việc</td>
              <td className="text-center">60</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input1}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef1}
                    className="w-25 border border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">2</td>
              <td className="fw-bold">Chất lượng chuyên môn</td>
              <td className="text-center">60</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input2}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef2}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">3</td>
              <td className="fw-bold">Đào tạo nhân viên hỗ trợ đồng nghiệp</td>
              <td className="text-center">40</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input3}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef3}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">4</td>
              <td className="fw-bold">Làm việc nhóm</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input4}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef4}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">5</td>
              <td className="fw-bold">Tuân thủ nội quy</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input5}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef5}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">6</td>
              <td className="fw-bold">Văn hoá ứng xử với KH, đồng nghiệp</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input6}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef6}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">7</td>
              <td className="fw-bold">Tính tự giác,chủ động công việc</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input7}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef7}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">8</td>
              <td className="fw-bold">Ý kiến sáng tạo cải tiến công việc</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input8}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef8}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">9</td>
              <td className="fw-bold">Học tập nâng cao chuyên môn</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input9}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef9}
                    className="w-25 border-inherit"
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td className="fw-bold text-center">10</td>
              <td className="fw-bold">Thực hành 5s Kaizen</td>
              <td className="text-center">20</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">{userScores.input10}</td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">
                  <input
                    ref={inputRef10}
                    className="w-25 border-inherit "
                    type="number"
                  />
                </td>
              )}
            </tr>
            <tr>
              <td></td>
              <td className="fw-bold">Tổng điểm</td>
              <td className="fw-bold text-center">300</td>
              {Arr_item !== -1 ? (
                <>
                  <td className="text-center">
                    {Number(userScores.input10) +
                      Number(userScores.input9) +
                      Number(userScores.input8) +
                      Number(userScores.input7) +
                      Number(userScores.input8) +
                      Number(userScores.input7) +
                      Number(userScores.input6) +
                      Number(userScores.input5) +
                      Number(userScores.input4) +
                      Number(userScores.input3) +
                      Number(userScores.input2) +
                      Number(userScores.input1)}
                  </td>
                  <td></td>
                  <td></td>
                </>
              ) : (
                <td className="text-center">...</td>
              )}
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
          {Arr_item !== -1 ? (
            <p
              style={{ minHeight: "100px" }}
              className="bg-white min-h-50 border-black w-full">
              {userScores.input11}
            </p>
          ) : (
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              ref={inputRef11}
              rows="3"></textarea>
          )}
        </div>
        {Arr_item === -1 && (
          <button
            onClick={() => addEvent()}
            className="btn btn-primary mb-3 mt-3">
            Gửi phiếu điểm
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Scores;
