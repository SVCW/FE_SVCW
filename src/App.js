
import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./socimo-html-files/Admin";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Test from './socimo-html-files/Test';
import Achivement from './pages/Achivement/Achivement';
import ProcessType from './pages/ProcessType/ProcessType';
import ReportType from './pages/ReportType/ReportType';
function App () {
  return (
    <Router>
      <div>
        {/* <AboutUniversity /> */}
        {/* <SignIn /> */}
        {/* <Home /> */}

        <AdminTemplate exact path="/achivement" Component={Achivement} />
        <AdminTemplate exact path="/processtype" Component={ProcessType} />
        <AdminTemplate exact path="/reporttype" Component={ReportType} />
        {/* <AdminTemplate exact path="/table" Component={Admin} /> */}
        <Route exact path="/" component={Test} />

      </div>
    </Router>
  );
}

export default App;
