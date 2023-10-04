import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";

import { UserContext } from "../../usecontex/usecontex";
import MyProfile from "../../compoment/myProfile/MyProfile";

const MyProfiles = () => {
  const { activeSidebar, writeDatabase } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <MyProfile />
      </div>
    </div>
  );
};

export default MyProfiles;
