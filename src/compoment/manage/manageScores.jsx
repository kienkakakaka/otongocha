import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../usecontex/usecontex";

const ManageScores = () => {
  // const { readDatabase } = useContext(UserContext);
  // const [Arrdata, setArrdata] = useState([]);

  // const [month, setMonth] = useState(new Date().getMonth());
  // const [year, setYear] = useState(new Date().getFullYear());
  // useEffect(() => {
  //   readDatabase("/scores", setArrdata);
  // }, []);
  // const Arr_item_scores = Arrdata && Object.values(Arrdata);
  // const Arr_item_filter = Arr_item_scores.filter(
  //   (item) =>
  //     new Date(item.time).getMonth() === month &&
  //     new Date(item.time).getFullYear() === year
  // );
  // console.log(Arr_item_filter);
  return <div>ManageScores</div>;
};

export default ManageScores;
