import React, { useState, useContext, useEffect } from "react";
import { auth } from "../../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import style from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../usecontex/usecontex";
import { user_super_admin, user_admin, user } from "../../data/user";
import photo from "../../media/img/logo.png";
function Logins() {
  const [userName, setUsername] = useState("");
  const [passwords, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [positionUser, setPositionUser] = useState("");

  const history = useNavigate();
  const { setIsLogin, writeDatabase, logOut, readDatabase } =
    useContext(UserContext);
  // useEffect(() => {
  //   readDatabase(`/user/${userName.split("@")[0]}/titel/data`, setPositionUser);
  // }, []);

  if (user) {
    localStorage.setItem("user", user);
    localStorage.setItem("position", positionUser);
    history("/kpi");
    window.location.reload();
  }

  const HanderSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, passwords)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.email.split("@")[0]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        localStorage.setItem("isLogin", false);
        alert(errorMessage);
        console.log(errorMessage);
      });
  };
  const changeUsername = (e) => {
    console.log(e.target.value);
    readDatabase(
      `/user/${e.target.value.split("@")[0]}/titel/data/position`,
      setPositionUser
    );
    // if (e.target.value !== "") {
    //
    // }

    setUsername(e.target.value);
  };

  return (
    <div
      className={`container mt-10 ${style["form-container login-container"]}`}>
      <form className={style["form-lg"]}>
        <img src={photo} alt="" />
        <div className={style["form-control2"]}>
          <input
            type="email"
            onChange={changeUsername}
            className={style["email-2"]}
            placeholder="Email"
          />
          <small className={style["email-error-2"]}></small>
          <span></span>
        </div>
        <div className={style["form-control2"]}>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={style["password-2"]}
            placeholder="Password"
          />
          <small className={style["password-error-2"]}></small>
          <span></span>
        </div>

        <div className={style["content"]}>
          <div className={style["checkbox"]}>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label for="">Remember me</label>
          </div>
          <div className={style["pass-link"]}>
            <a href="#">Forgot password</a>
          </div>
        </div>
        <button type="submit" value="submit" onClick={HanderSubmit}>
          Login
        </button>
        {/* <button onClick={logOut}>logout</button> */}
        <span>Or use your account</span>
        <div className={style["social-container"]}>
          <a href="#" className={style["social"]}>
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className={style["social"]}>
            <i className="fa-brands fa-google"></i>
          </a>
          <a href="#" className={style["social"]}>
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Logins;
