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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendars />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/myprofile" element={<MyProfiles />} />
        <Route path="/form" element={<Forms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
