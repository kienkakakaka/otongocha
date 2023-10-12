import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PritaverouterAdmin = ({ children }) => {
  const username = localStorage.getItem("user");

  //   if (!username) {
  //     history("/login");
  //   }
  return username && username === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/calendar" />
  );
};

export default PritaverouterAdmin;
