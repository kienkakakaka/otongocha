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
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ExtensionIcon from "@mui/icons-material/Extension";
import photo from "../../media/img/logo.png";
const Sidebar = () => {
  const username = localStorage.getItem("user");
  const position = localStorage.getItem("position");
  const { setSearchText } = useContext(UserContext);
  const { activeSidebar, setActiveSidebar } = useContext(UserContext);
  const admin = position === "Trưởng phòng" || position === "Quản lý";
  return (
    <div>
      <nav id="sidebar" className={activeSidebar ? "active" : ""}>
        <div className="sidebar-header">
          <img src={photo} className="img-fluid" />
        </div>
        <ul className="list-unstyled components">
          {admin && (
            <li onClick={() => setActiveSidebar((pre) => !pre)}>
              <Link to="/" className="dashboard">
                <DashboardIcon />
                <span>Tổng quan</span>
              </Link>
            </li>
          )}
          {admin && (
            <li
              onClick={() => {
                setSearchText("");
                setActiveSidebar((pre) => !pre);
              }}
              className="dropdown">
              <Link to="/events" data-toggle="collapse" aria-expanded="false">
                <AspectRatioIcon />
                <span>Sự kiện</span>
              </Link>
            </li>
          )}
          {username !== "giamdoc" && (
            <li onClick={() => setActiveSidebar((pre) => !pre)} className="">
              <Link to="/calendar">
                <DateRangeIcon />
                <span>Lịch</span>
              </Link>
            </li>
          )}

          {admin && (
            <li
              onClick={() => setActiveSidebar((pre) => !pre)}
              className="dropdown">
              <Link to="/tables" data-toggle="collapse" aria-expanded="false">
                <GridOnIcon />
                <span>Bảng công</span>
              </Link>
            </li>
          )}

          <li
            onClick={() => {
              setSearchText("");
              setActiveSidebar((pre) => !pre);
            }}
            className="dropdown">
            <Link
              to="/kpi"
              href="#pageSubmenu2"
              data-toggle="collapse"
              aria-expanded="false">
              <AppsIcon />
              <span>KPI chỉ tiêu</span>
            </Link>
          </li>

          {/* <li className="dropdown">
            <Link to="/charts" data-toggle="collapse" aria-expanded="false">
              <EqualizerIcon />

              <span>Biểu đồ</span>
            </Link>
          </li> */}
          {username !== "giamdoc" && (
            <li
              onClick={() => setActiveSidebar((pre) => !pre)}
              className="dropdown">
              <Link to="/table2" data-toggle="collapse" aria-expanded="false">
                <ExtensionIcon />
                <span>Bảng lương</span>
              </Link>
            </li>
          )}

          {admin && (
            <li
              onClick={() => setActiveSidebar((pre) => !pre)}
              className="dropdown">
              <Link to="/manage" data-toggle="collapse" aria-expanded="false">
                <BorderColorIcon />
                <span>Quản lý</span>
              </Link>
            </li>
          )}
          {username !== "giamdoc" && (
            <li
              onClick={() => setActiveSidebar((pre) => !pre)}
              className="dropdown">
              <Link to="/myself" data-toggle="collapse" aria-expanded="false">
                <ContentCopyIcon />
                <span>Cá nhân</span>
              </Link>
            </li>
          )}

          <li
            onClick={() => setActiveSidebar((pre) => !pre)}
            className="dropdown">
            <Link to="/library" data-toggle="collapse" aria-expanded="false">
              <PhotoLibraryIcon />
              <span>Thư viện</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
