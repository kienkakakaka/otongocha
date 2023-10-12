import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./layout/Dashboard/Dashboard";
import Calendars from "./layout/calendar/Calendar";
import Logins from "./compoment/auth/login";
import Events from "./layout/Events/Events";
import Charts from "./layout/charts/charts";
import Tables from "./layout/tables/tables";
import MyProfiles from "./layout/myProfile/MyProfile";
import Forms from "./layout/forms/forms";
import Table2s from "./layout/table2/table2s";
import Myselfs from "./layout/myselfs/Myselfs";
import Manages from "./layout/manage/Manages";
import Approuters from "./routers/Approuters";

function App() {
  return <Approuters />;
}

export default App;
