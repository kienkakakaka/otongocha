import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";
import Calendar from "../../compoment/calendar/calendar";
import React, { useContext } from "react";
import { UserContext } from "../../usecontex/usecontex";

const Calendars = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        <Calendar />
      </div>
    </div>
  );
};

export default Calendars;
