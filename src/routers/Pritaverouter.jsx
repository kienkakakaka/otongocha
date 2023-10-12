import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Pritaverouter = ({ children }) => {
  const username = localStorage.getItem("user");

  //   if (!username) {
  //     history("/login");
  //   }
  return username ? <>{children}</> : <Navigate to="/login" />;
};

export default Pritaverouter;
