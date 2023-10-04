import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";

import { UserContext } from "../../usecontex/usecontex";
import Form from "../../compoment/form/form";

const Forms = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Form />
      </div>
    </div>
  );
};

export default Forms;
