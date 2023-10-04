import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../config";

import { set, ref, onValue } from "firebase/database";
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const username = localStorage.getItem("user");

  const [isLogin, setIsLogin] = useState();
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [data, setdata] = useState([]);
  let arr = [];

  if (data !== null) {
    arr = Object.entries(data).map(([username, value]) => ({
      username,
      value,
    }));
  }

  const [user, setUser] = useState();
  const [arrDate, setArrDate] = useState(() => {
    onValue(ref(db, `/${username}/data`), (snapshot) => {
      return snapshot.val();
    });
  });
  const [valueCar, setValueCar] = useState([]);
  const readDatabase = (url, setkey) => {
    onValue(ref(db, `/${url}`), (snapshot) => {
      const data = snapshot.val();

      setkey(data);
    });
  };

  useEffect(() => {
    readDatabase(`user/${username}/value/data`, setArrDate);
    readDatabase(`eventCar/data`, setValueCar);
    readDatabase(`user`, setdata);
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
  };
  const writeDatabase = (key, data) => {
    set(ref(db, `/${key}`), {
      data,
    });
  };

  return (
    <UserContext.Provider
      value={{
        readDatabase,
        activeSidebar,
        setActiveSidebar,
        writeDatabase,
        setIsLogin,
        setUser,
        logOut,
        isLogin,
        arrDate,
        setArrDate,
        username,
        valueCar,
        arr,
      }}>
      {children}
    </UserContext.Provider>
  );
};
