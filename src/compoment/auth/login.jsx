import React, { useState, useContext } from "react";
import { auth } from "../../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import style from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../usecontex/usecontex";
import { db } from "../../config";

import { set, ref, onValue } from "firebase/database";

function Logins() {
  const [userName, setUsername] = useState();
  const [passwords, setPassword] = useState();

  const history = useNavigate();
  const { setIsLogin, setUser, writeDatabase, logOut } =
    useContext(UserContext);

  const HanderSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, passwords)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem("user", user.email.split("@")[0]);
        history("/");
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        localStorage.setItem("isLogin", false);
        alert(errorMessage);
        console.log(errorMessage);
      });
  };

  return (
    <div className={style["form-container login-container"]}>
      <form className={style["form-lg"]}>
        <h1>Login here.</h1>
        <div className={style["form-control2"]}>
          <input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
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
        <button onClick={logOut}>logout</button>
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
