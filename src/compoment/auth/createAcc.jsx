import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../../config";
import { MyContext } from "../../usecontex/usecontex1";
import { UserContext } from "../../usecontex/usecontex";
function Sigup() {
  const { writeDatabase } = useContext(UserContext);
  const { Messenger } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const [sdt, setSdt] = useState("");
  const [fullName, setFullName] = useState("");
  const [typeroom, setTypeRoom] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");

  const HanderSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      Messenger("error", "Vui lòng nhập email");
      return;
    } else if (password.trim() === "") {
      Messenger("error", "Vui lòng nhập password");
      return;
    } else if (sdt.trim() === "") {
      Messenger("error", "Vui lòng nhập sdt");
      return;
    } else if (fullName.trim() === "") {
      Messenger("error", "Vui lòng nhập fullName");
      return;
    } else if (typeroom.trim() === "") {
      Messenger("error", "Vui lòng chọn phòng");
      return;
    } else if (position.trim() === "") {
      Messenger("error", "Vui lòng chọn chức vụ");
      return;
    } else if (address.trim() === "") {
      Messenger("error", "Vui lòng nhập địa chỉ");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Messenger("success", `Tạo thành công user`);
        writeDatabase(`/user/${email.split("@")[0]}/titel`, {
          name: fullName,
          password: password,
          email: email,
          sdt: sdt,
          typerom: typeroom,
          position: position,
          address: address,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Messenger("error", `${errorMessage} mã lỗi ${errorCode}`);
        // ..
      });
  };

  return (
    <div>
      <form className="row">
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
          <label for="password" class="form-label">
            Mật khẩu :
          </label>
          <input
            value={password}
            type="email"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            class="form-control"
          />
        </div>
        <div class="mb-3 col-6">
          <label for="fullName" class="form-label">
            Họ và tên :
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            id="fullName"
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
        </div>{" "}
        <div class="mb-3 col-6">
          <label for="typeroom" class="form-label">
            Phòng:
          </label>
          <select
            value={typeroom}
            id="typeroom"
            class="form-select"
            onChange={(e) => setTypeRoom(e.target.value)}
            aria-label="Default select example">
            <option selected>Chọn phòng</option>
            <option value="Kỹ Thuật">Kỹ thuật</option>
            <option value="Kinh Doanh">Kinh Doanh</option>
          </select>
        </div>
        <div class="mb-3 col-6">
          <label for="position" class="form-label">
            Chức vụ:
          </label>
          <select
            id="position"
            value={position}
            class="form-select"
            onChange={(e) => setPosition(e.target.value)}
            aria-label="Default select example">
            <option selected>Chức vụ</option>
            <option value="Quản lý">Quản lý</option>
            <option value="Trưởng phòng">Trưởng phòng</option>
            <option value="Phó phòng">Phó phòng</option>
            <option value="Tổ trưởng">Tổ trưởng</option>
            <option value="Tổ phó">Tổ phó</option>
            <option value="Nhân viên">Nhân viên</option>
          </select>
        </div>
        <div class="mb-3 col-12">
          <label for="address" class="form-label">
            Địa chỉ :
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="address"
            class="form-control"
          />
        </div>{" "}
        <div>
          <button
            onClick={(e) => HanderSubmit(e)}
            type="submit"
            class="btn btn-primary">
            Thêm tài khoản
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sigup;
