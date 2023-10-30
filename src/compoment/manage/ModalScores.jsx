import { Modal, Button } from "antd";
import React, { useContext, useRef, useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { MyContext } from "../../usecontex/usecontex1";
import { UserContext } from "../../usecontex/usecontex";
import { useEffect } from "react";
const ModalScores = ({
  setIsModalOpen,
  isModalOpen,
  // ArrdataIndex,
  user,
  name,
}) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const { pushToDatabase, Messenger } = useContext(MyContext);
  const { readDatabase } = useContext(UserContext);
  const [Arrdata, setArrdata] = useState([]);
  const username = localStorage.getItem("user");
  const Arr_item_scores = Arrdata && Object.values(Arrdata);

  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");
  const inputRef4 = useRef("");
  const inputRef5 = useRef("");
  const inputRef6 = useRef("");
  const inputRef7 = useRef("");
  const inputRef8 = useRef("");
  const inputRef9 = useRef("");
  const inputRef10 = useRef("");
  const inputRef11 = useRef("");

  const Arr_item =
    Arr_item_scores &&
    Arr_item_scores.findIndex(
      (item) =>
        item.name === name &&
        item.type === "user" &&
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year
    );
  const Arr_item_admin =
    Arr_item_scores &&
    Arr_item_scores.findIndex(
      (item) =>
        item.name === name &&
        item.type === "admin" &&
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year
    );
  const Arr_item_super_admin =
    Arr_item_scores &&
    Arr_item_scores.findIndex(
      (item) =>
        item.name === name &&
        item.type === "superadmin" &&
        new Date(item.time).getMonth() === month &&
        new Date(item.time).getFullYear() === year
    );
  useEffect(() => {
    readDatabase("/scores", setArrdata);
  }, []);
  let userScores_admin;
  let userScores_super_admin;
  let ArrdataIndex;
  if (Arr_item_admin !== -1) userScores_admin = Arr_item_scores[Arr_item_admin];
  if (Arr_item_super_admin !== -1)
    userScores_super_admin = Arr_item_scores[Arr_item_super_admin];
  if (Arr_item !== -1) ArrdataIndex = Arr_item_scores[Arr_item];
  const AddEvent = (type) => {
    console.log(type);
    const list_input = {
      type: type,
      name: ArrdataIndex.name,
      useradmin: username,
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

    if (username !== "giamdoc") {
      Messenger("success", "Đã duyệt phiếu điểm và gửi lên giám đốc");
    } else {
      Messenger("success", "Đã duyệt phiếu điểm thành công");
    }
  };
  if (!user) return;
  return (
    <div>
      <Modal
        title={
          <h3 style={{ fontSize: "30px" }}>
            Phiếu điểm tháng{" "}
            {ArrdataIndex && new Date(ArrdataIndex.time).getMonth() + 1} /{" "}
            {ArrdataIndex && new Date(ArrdataIndex.time).getFullYear()}
          </h3>
        }
        open={isModalOpen}
        width={1000}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}>
        <div className="d-flex  justify-content-between">
          {user && (
            <>
              <div>
                <p>
                  Họ và tên: <i className="fw-bold">{user.data.name}</i>
                </p>
                <p>
                  Bộ phận:<i className="fw-bold">{user.data.typerom}</i>
                </p>
              </div>
              <div>
                <p>Mã số nhân viên</p>
                <p>
                  Chức vụ: <i className="fw-bold">{user.data.position}</i>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="wrapper">
          {" "}
          <table className="table table-bordered border-black">
            <thead>
              <tr>
                <th className="fw-bold">TT</th>
                <th className="fw-bold">Tiêu chí</th>
                <th className="fw-bold text-center">Hệ số</th>
                <th className="fw-bold text-center">Nhân viên chấm điểm</th>
                {user.data.position !== "Trưởng phòng" && (
                  <th className="fw-bold text-center">Quản lý chấm điểm</th>
                )}

                {userScores_admin && (
                  <th className="fw-bold text-center">Giám đốc chấm điểm</th>
                )}
              </tr>
            </thead>
            {ArrdataIndex && (
              <tbody>
                <tr>
                  <td className="fw-bold">1</td>
                  <td className="fw-bold">Năng suất làm việc</td>
                  <td className="text-center">60</td>
                  <td className="text-center">{ArrdataIndex.input1}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input1}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input1}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef1}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef1}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">2</td>
                  <td className="fw-bold">Chất lượng chuyên môn</td>
                  <td className="text-center">60</td>
                  <td className="text-center">{ArrdataIndex.input2}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input2}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input2}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef2}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef2}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">3</td>
                  <td className="fw-bold">
                    Đào tạo nhân viên hỗ trợ đồng nghiệp
                  </td>
                  <td className="text-center">40</td>
                  <td className="text-center">{ArrdataIndex.input3}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input3}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input3}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef3}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef3}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">4</td>
                  <td className="fw-bold">Làm việc nhóm</td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input4}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input4}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input4}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef4}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef4}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">5</td>
                  <td className="fw-bold">Tuân thủ nội quy</td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input5} </td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input5}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input5}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef5}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef5}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">6</td>
                  <td className="fw-bold">
                    Văn hoá ứng xử với KH, đồng nghiệp
                  </td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input6}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input6}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input6}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef6}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef6}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">7</td>
                  <td className="fw-bold">Tính tự giác,chủ động công việc</td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input7}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input7}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input7}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef7}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef7}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">8</td>
                  <td className="fw-bold">
                    Ý kiến sáng tạo cải tiến công việc
                  </td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input8}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input8}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input8}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef8}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef8}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">9</td>
                  <td className="fw-bold">Học tập nâng cao chuyên môn</td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input9}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input9}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input9}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef9}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef9}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
                </tr>
                <tr>
                  <td className="fw-bold">10</td>
                  <td className="fw-bold">Thực hành 5s Kaizen</td>
                  <td className="text-center">20</td>
                  <td className="text-center">{ArrdataIndex.input10}</td>
                  {userScores_admin ? (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <td className="text-center">
                          {userScores_admin.input10}
                        </td>
                      )}

                      {userScores_super_admin ? (
                        <td className="text-center">
                          {userScores_super_admin.input10}
                        </td>
                      ) : (
                        <td className="text-center">
                          {username === "giamdoc" ? (
                            <input
                              ref={inputRef10}
                              className="border w-10"
                              type="number"
                            />
                          ) : (
                            <td></td>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      {username !== "giamdoc" ? (
                        <td className="text-center">
                          <input
                            ref={inputRef10}
                            className="border w-10"
                            type="number"
                          />
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </>
                  )}
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

                  {userScores_admin &&
                    user.data.position !== "Trưởng phòng" && (
                      <td className="text-center fw-bold">
                        {Number(userScores_admin.input10) +
                          Number(userScores_admin.input9) +
                          Number(userScores_admin.input8) +
                          Number(userScores_admin.input7) +
                          Number(userScores_admin.input6) +
                          Number(userScores_admin.input5) +
                          Number(userScores_admin.input4) +
                          Number(userScores_admin.input3) +
                          Number(userScores_admin.input2) +
                          Number(userScores_admin.input1)}
                      </td>
                    )}
                  {userScores_super_admin && (
                    <td className="text-center fw-bold">
                      {Number(userScores_super_admin.input10) +
                        Number(userScores_super_admin.input9) +
                        Number(userScores_super_admin.input8) +
                        Number(userScores_super_admin.input7) +
                        Number(userScores_super_admin.input6) +
                        Number(userScores_super_admin.input5) +
                        Number(userScores_super_admin.input4) +
                        Number(userScores_super_admin.input3) +
                        Number(userScores_super_admin.input2) +
                        Number(userScores_super_admin.input1)}
                    </td>
                  )}
                </tr>
              </tbody>
            )}
          </table>
        </div>
        {ArrdataIndex && (
          <>
            {" "}
            <div class="mb-3">
              <p>
                <i className="fw-bold">Đề xuất, góp ý:</i>
                {ArrdataIndex.input11}
              </p>
            </div>
            <div class="mb-3">
              {userScores_admin ? (
                <>
                  {user.data.position !== "Trưởng phòng" && (
                    <p>
                      <i className="fw-bold">Nhận xét của quản lí:</i>
                      {userScores_admin.input11}
                    </p>
                  )}

                  {userScores_super_admin ? (
                    <p>
                      <i className="fw-bold">Nhận xét của giám đốc:</i>
                      {userScores_super_admin.input11}
                    </p>
                  ) : (
                    <>
                      {username === "giamdoc" && (
                        <>
                          <label
                            className="fw-bold"
                            for="exampleFormControlTextarea1"
                            class="form-label">
                            Nhận xét của giám đốc
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            ref={inputRef11}
                            rows="3"></textarea>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {username !== "giamdoc" && (
                    <>
                      {user.data.position !== "Trưởng phòng" && (
                        <>
                          {" "}
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
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {!userScores_admin && (
          <>
            {username !== "giamdoc" && (
              <Button onClick={() => AddEvent("admin")} type="primary">
                Duyệt phiếu điểm
              </Button>
            )}

            {/* {!userScores_super_admin&&}
            <Button onClick={AddEvent("superadmin")} type="primary">
              Duyệt phiếu điểm
            </Button> */}
          </>
        )}{" "}
        {userScores_admin &&
          !userScores_super_admin &&
          username === "giamdoc" && (
            <Button onClick={() => AddEvent("superadmin")} type="primary">
              Giám đốc chấm
            </Button>
          )}
      </Modal>
    </div>
  );
};

export default ModalScores;
