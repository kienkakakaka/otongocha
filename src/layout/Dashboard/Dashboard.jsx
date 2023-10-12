import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Conten from "../../compoment/contens/Conten";
import { UserContext } from "../../usecontex/usecontex";
import AmazonLoader from "../../compoment/loadding/Loader";

const Dashboard = () => {
  const { activeSidebar, arrDate } = useContext(UserContext);
  return (
    <div>
      <Sidebar />

      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Conten />
      </div>

      {/* <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Conten />
      </div> */}
    </div>
  );
};

export default Dashboard;
