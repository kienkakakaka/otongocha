import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <nav id="sidebar" className={activeSidebar ? "active" : ""}>
        <div className="sidebar-header">
          <h3>
            {/* <img src="../../media/img/logo.png" className="img-fluid" /> */}
            <span>otongocha.vn</span>
          </h3>
        </div>
        <ul className="list-unstyled components">
          <li className="active">
            <Link to="/" className="dashboard">
              <i className="material-icons">dashboard</i>
              <span>Tổng quan</span>
            </Link>
          </li>

          <li className="dropdown">
            <Link to="/events" data-toggle="collapse" aria-expanded="false">
              <i className="material-icons">aspect_ratio</i>
              <span>Sự kiện</span>
            </Link>
          </li>
          <li className="">
            <Link to="/calendar">
              <i className="material-icons">date_range</i>
              <span>Lịch</span>
            </Link>
          </li>
          <li className="dropdown">
            <Link to="/tables" data-toggle="collapse" aria-expanded="false">
              <i className="material-icons">grid_on</i>
              <span>Bảng công</span>
            </Link>
          </li>
          <li className="dropdown">
            <Link
              to="/form"
              href="#pageSubmenu2"
              data-toggle="collapse"
              aria-expanded="false">
              <i className="material-icons">apps</i>
              <span>Biểu mẫu</span>
            </Link>
          </li>

          <li className="dropdown">
            <Link to="/charts" data-toggle="collapse" aria-expanded="false">
              <i className="material-icons">equalizer</i>

              <span>Biểu đồ</span>
            </Link>
          </li>
          <li className="dropdown">
            <a
              href="#pageSubmenu4"
              data-toggle="collapse"
              aria-expanded="false">
              <i className="material-icons">extension</i>
              <span>ui element</span>
            </a>
          </li>

          <li className="dropdown">
            <a
              href="#pageSubmenu5"
              data-toggle="collapse"
              aria-expanded="false">
              <i className="material-icons">border_color</i>
              <span>forms</span>
            </a>
          </li>

          <li className="dropdown">
            <a
              href="#pageSubmenu7"
              data-toggle="collapse"
              aria-expanded="false">
              <i className="material-icons">content_copy</i>
              <span>Pages</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
