import React from "react";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/Navbar";
import Conten from "../contens/Conten";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div id="content">
        <Navbar />
        <Conten />
      </div>
    </div>
  );
};

export default Dashboard;
