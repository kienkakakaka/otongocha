import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Navbar = () => {
  const { activeSidebar, setActiveSidebar } = useContext(UserContext);

  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isLogin", false);
    history("/login");
  };
  return (
    <div className="top-navbar bg-light">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            type="button"
            onClick={() => setActiveSidebar(!activeSidebar)}
            id="sidebarCollapse"
            className="d-xl-block d-lg-block d-md-mone d-none">
            <ArrowBackIosIcon />
          </button>

          <button
            className="d-inline-block d-lg-none ml-auto more-button"
            type="button"
            onClick={() => setActiveSidebar(!activeSidebar)}
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="material-icons">more_vert</span>
          </button>

          <div
            className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
            id="navbarSupportedContent">
            {" "}
            <input style={{ border: 0, borderRadius: "20px" }} type="text" />
            <ul className="nav navbar-nav ml-auto">
              <li className=" nav-item ">
                <a style={{ color: "black" }} href="#" data-toggle="dropdown">
                  <NotificationsNoneIcon />
                  <span className="notification">4</span>
                </a>
              </li>

              <li className="nav-item">
                <Link style={{ color: "black" }} to="/myprofile" href="#">
                  <PersonIcon />
                </Link>
              </li>
              <li className="nav-item">
                <a style={{ color: "black" }} onClick={() => logout()}>
                  <LogoutIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
