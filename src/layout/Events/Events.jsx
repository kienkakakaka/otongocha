import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Event from "../../compoment/envent/Event";
import { UserContext } from "../../usecontex/usecontex";

const Events = () => {
  const { activeSidebar } = useContext(UserContext);

  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Event />
      </div>
    </div>
  );
};

export default Events;
