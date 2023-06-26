
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Test from './socimo-html-files/Test';
import Achivement from './pages/Achivement/Achivement';
import ProcessType from './pages/ProcessType/ProcessType';
import ReportType from './pages/ReportType/ReportType';
import Login from './pages/Login/Login';
import { createBrowserHistory } from 'history'
import Role from './pages/Role/Role';
import Home from './pages/Home/Home';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
export const history = createBrowserHistory()

function App () {

  return (
    <Router history={history}>
      <Switch>
        {/* <AboutUniversity /> */}
        {/* <SignIn /> */}
        {/* <Home /> */}

        <AdminTemplate exact path="/achivement" Component={Achivement} />
        <AdminTemplate exact path="/processtype" Component={ProcessType} />
        <AdminTemplate exact path="/reporttype" Component={ReportType} />
        <AdminTemplate exact path="/role" Component={Role} />
        {/* <AdminTemplate exact path="/table" Component={Admin} /> */}
        <UserTemplate exact path="/home" Component={Home} />
        <Route exact path="/" component={Login} />

      </Switch>
    </Router>
  );
}

export default App;
