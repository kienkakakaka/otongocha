import React, { useContext } from "react";
import Sidebar from "../../compoment/sidebar/sidebar";
import Navbar from "../../compoment/navbar/Navbar";

import { UserContext } from "../../usecontex/usecontex";

import Library from "../../compoment/library/library";
import ImageUpload from "./uploadphoto";
import Renderlistimg from "./renderlistimg";

const Librarys = () => {
  const { activeSidebar } = useContext(UserContext);
  return (
    <div>
      <Sidebar />
      <div id="content" className={activeSidebar ? "active" : ""}>
        <Navbar />
        {/* <ImageUpload /> */}
        <Renderlistimg />
      </div>
    </div>
  );
};

export default Librarys;
