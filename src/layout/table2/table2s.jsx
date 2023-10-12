import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Table from "../../compoment/table/table";
import { UserContext } from "../../usecontex/usecontex";
import Table2 from "../../compoment/table/table2";

const Table2s = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Table2 />
      </div>
    </div>
  );
};

export default Table2s;
