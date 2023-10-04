import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { db } from "../../config";

import { set, ref, onValue } from "firebase/database";
const MyProfile = () => {
  const username = localStorage.getItem("user");

  const { writeDatabase } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [sdt, setSdt] = useState();
  const [fullName, setFullName] = useState();
  const [typeroom, setTypeRoom] = useState();
  const handerClickUpdate = (e) => {
    e.preventDefault();
    writeDatabase(`/user/${username}/titel`, {
      name: fullName,
      email: email,
      sdt: sdt,
      typerom: typeroom,
    });
    alert("cập nhật thành công");
  };
  useEffect(() => {
    onValue(ref(db, `/user/${username}/titel`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null && data !== undefined) {
        setEmail(data.data.email);
        setSdt(data.data.sdt);
        setFullName(data.data.name);
        setTypeRoom(data.data.typerom);

        console.log(data.data.email);
      }
    });
  }, []);
  return (
    <div className="container">
      <form className="row">
        <div class="mb-3 col-6">
          <label for="exampleInputEmail1" class="form-label">
            Họ và tên :
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="exampleInputEmail1"
            class="form-control"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="exampleInputsdt" class="form-label">
            SDT :
          </label>
          <input
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            type="text"
            id="exampleInputsdt"
            class="form-control"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="exampleInputemail" class="form-label">
            Email :
          </label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="exampleInputemail"
            class="form-control"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="exampleInputemail" class="form-label">
            Phòng:
          </label>
          <select
            value={typeroom}
            class="form-select"
            onChange={(e) => setTypeRoom(e.target.value)}
            aria-label="Default select example">
            <option selected>Chọn phòng</option>
            <option value="Kỹ Thuật">Kỹ thuật</option>
            <option value="Kinh Doanh">Kinh Doanh</option>
          </select>
        </div>
        <div class="mb-3 col-6">
          <label for="formFile" class="form-label">
            Ảnh đại diện
          </label>
          <input class="form-control" type="file" id="formFile" />
        </div>
        <div>
          <button
            onClick={(e) => handerClickUpdate(e)}
            type="submit"
            class="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
