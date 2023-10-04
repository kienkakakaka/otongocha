import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { activeSidebar, setActiveSidebar } = useContext(UserContext);

  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isLogin", false);
    history("/login");
  };
  return (
    <div className="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            type="button"
            onClick={() => setActiveSidebar(!activeSidebar)}
            id="sidebarCollapse"
            className="d-xl-block d-lg-block d-md-mone d-none">
            <span className="material-icons">arrow_back_ios</span>
          </button>

          <button
            className="d-inline-block d-lg-none ml-auto more-button"
            type="button"
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
            <ul className="nav navbar-nav ml-auto">
              <li className="dropdown nav-item ">
                <a href="#" className="nav-link" data-toggle="dropdown">
                  <span className="material-icons">notifications</span>
                  <span className="notification">4</span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">You have 5 new messages</a>
                  </li>
                  <li>
                    <a href="#">You're now friend with Mike</a>
                  </li>
                  <li>
                    <a href="#">Wish Mary on her birthday!</a>
                  </li>
                  <li>
                    <a href="#">5 warnings in Server Console</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span className="material-icons">apps</span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/myprofile" className="nav-link" href="#">
                  <span className="material-icons">person</span>
                </Link>
              </li>
              <li className="nav-item">
                <li onClick={() => logout()} className="nav-link" href="#">
                  <span class="material-symbols-outlined">logout</span>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
