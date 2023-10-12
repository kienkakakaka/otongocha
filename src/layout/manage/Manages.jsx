import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Manage from "../../compoment/manage/Manage";

const Manages = () => {
  const { activeSidebar, writeDatabase } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Manage />
      </div>
    </div>
  );
};

export default Manages;
