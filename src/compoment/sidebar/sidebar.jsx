import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GridOnIcon from "@mui/icons-material/GridOn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AppsIcon from "@mui/icons-material/Apps";

import ExtensionIcon from "@mui/icons-material/Extension";
const Sidebar = () => {
  const username = localStorage.getItem("user");

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
          {username === "admin" && (
            <li>
              <Link to="/" className="dashboard">
                <DashboardIcon />
                <span>Tổng quan</span>
              </Link>
            </li>
          )}

          {username === "admin" && (
            <li className="dropdown">
              <Link to="/events" data-toggle="collapse" aria-expanded="false">
                <AspectRatioIcon />
                <span>Sự kiện</span>
              </Link>
            </li>
          )}
          <li className="">
            <Link to="/calendar">
              <DateRangeIcon />
              <span>Lịch</span>
            </Link>
          </li>
          {username === "admin" && (
            <li className="dropdown">
              <Link to="/tables" data-toggle="collapse" aria-expanded="false">
                <GridOnIcon />
                <span>Bảng công</span>
              </Link>
            </li>
          )}
          {username === "admin" && (
            <li className="dropdown">
              <Link
                to="/form"
                href="#pageSubmenu2"
                data-toggle="collapse"
                aria-expanded="false">
                <AppsIcon />
                <span>Đơn hàng </span>
              </Link>
            </li>
          )}
          {/* <li className="dropdown">
            <Link to="/charts" data-toggle="collapse" aria-expanded="false">
              <EqualizerIcon />

              <span>Biểu đồ</span>
            </Link>
          </li> */}
          <li className="dropdown">
            <Link to="/table2" data-toggle="collapse" aria-expanded="false">
              <ExtensionIcon />
              <span>Bảng lương</span>
            </Link>
          </li>

          {username === "admin" && (
            <li className="dropdown">
              <Link to="/manage" data-toggle="collapse" aria-expanded="false">
                <BorderColorIcon />
                <span>Quản lý</span>
              </Link>
            </li>
          )}

          <li className="dropdown">
            <Link to="/myself" data-toggle="collapse" aria-expanded="false">
              <ContentCopyIcon />
              <span>Cá nhân</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
