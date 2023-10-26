import React from "react";
import { Routes, Route } from "react-router-dom";
import Pritaverouter from "./Pritaverouter";

import Dashboard from "../layout/Dashboard/Dashboard";
import Calendars from "../layout/calendar/Calendar";
import Logins from "../compoment/auth/login";
import Events from "../layout/Events/Events";
import Charts from "../layout/charts/charts";
import Tables from "../layout/tables/tables";
import MyProfiles from "../layout/myProfile/MyProfile";
import Forms from "../layout/forms/forms";
import Table2s from "../layout/table2/table2s";
import Myselfs from "../layout/myselfs/Myselfs";
import Manages from "../layout/manage/Manages";
import PritaverouterAdmin from "./Pritaverouter admin";
import Library from "../compoment/library/library";
import Librarys from "../layout/librarys/Library";

const Approuters = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PritaverouterAdmin>
              <Forms />
            </PritaverouterAdmin>
          }
        />
        <Route path="/login" element={<Logins />} />
        <Route path="/library" element={<Librarys />} />
        <Route
          path="/events"
          element={
            <PritaverouterAdmin>
              <Events />
            </PritaverouterAdmin>
          }
        />
        <Route
          path="/calendar"
          element={
            <Pritaverouter>
              <Calendars />
            </Pritaverouter>
          }
        />
        <Route
          path="/charts"
          element={
            <PritaverouterAdmin>
              <Charts />
            </PritaverouterAdmin>
          }
        />
        <Route
          path="/tables"
          element={
            <PritaverouterAdmin>
              <Tables />
            </PritaverouterAdmin>
          }
        />
        <Route
          path="/myprofile"
          element={
            <Pritaverouter>
              <MyProfiles />
            </Pritaverouter>
          }
        />
        <Route
          path="/kpi"
          element={
            <Pritaverouter>
              <Dashboard />
            </Pritaverouter>
          }
        />
        <Route
          path="/table2"
          element={
            <Pritaverouter>
              <Table2s />
            </Pritaverouter>
          }
        />
        <Route
          path="/myself"
          element={
            <Pritaverouter>
              <Myselfs />
            </Pritaverouter>
          }
        />
        <Route
          path="/manage"
          element={
            <PritaverouterAdmin>
              <Manages />
            </PritaverouterAdmin>
          }
        />
      </Routes>
    </>
  );
};

export default Approuters;
