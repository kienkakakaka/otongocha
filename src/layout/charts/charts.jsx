import React from "react";
import Chart from "../../compoment/chart/Chart";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";
import Chart4 from "../../compoment/chart/chart4";

const Charts = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Chart4 />
      </div>
    </div>
  );
};

export default Charts;
