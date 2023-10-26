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
    localStorage.removeItem("position");
    localStorage.setItem("isLogin", false);
    history("/login");
    // window.location.reload();
  };
  return (
    <nav className="flex justify-between m-2">
      <button
        type="button"
        onClick={() => setActiveSidebar(!activeSidebar)}
        id="sidebarCollapse"
        className="">
        <ArrowBackIosIcon />
      </button>

      <div>
        <ul className="flex ">
          <li className=" nav-item ">
            <a style={{ color: "black" }} href="#" data-toggle="dropdown">
              <NotificationsNoneIcon
                style={{ fontSize: "30px", marginLeft: "10px" }}
              />
              <span className="notification">4</span>
            </a>
          </li>

          <li className="nav-item">
            <Link style={{ color: "black" }} to="/myprofile" href="#">
              <PersonIcon style={{ fontSize: "30px", marginLeft: "10px" }} />
            </Link>
          </li>
          <li className="nav-item">
            <a style={{ color: "black" }} onClick={() => logout()}>
              <LogoutIcon style={{ fontSize: "30px", marginLeft: "10px" }} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
