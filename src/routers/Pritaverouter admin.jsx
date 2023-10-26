import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PritaverouterAdmin = ({ children }) => {
  const position = localStorage.getItem("position");
  const admin = position === "Trưởng phòng" || position === "Quản lý";
  return admin ? <>{children}</> : <Navigate to="/kpi" />;
};

export default PritaverouterAdmin;
