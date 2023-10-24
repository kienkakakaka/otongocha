import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../config";

import { set, ref, onValue } from "firebase/database";
export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const username = localStorage.getItem("user");
  const [indexArr, setIndexArr] = useState();
  const [indexItem, setIndexItem] = useState();
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

  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState();
  const [myuser, setmyUser] = useState();
  const [arrDate, setArrDate] = useState(() => {
    onValue(ref(db, `user/${username}/data`), (snapshot) => {
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
    console.log("set database");
    set(ref(db, `/${key}`), {
      data,
    });
  };
  const compare = (id) => {
    // setSearchText(id);
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
        setmyUser,
        myuser,
        indexArr,
        setIndexArr,
        indexItem,
        setIndexItem,
        searchText,
        setSearchText,
        compare,
      }}>
      {children}
    </UserContext.Provider>
  );
};
