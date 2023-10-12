import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";

import { UserContext } from "../../usecontex/usecontex";
import Myself from "../../compoment/myself/Myself";

const Myselfs = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Myself />
      </div>
    </div>
  );
};

export default Myselfs;
