import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Table from "../../compoment/table/table";
import { UserContext } from "../../usecontex/usecontex";

const Tables = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Table />
      </div>
    </div>
  );
};

export default Tables;
