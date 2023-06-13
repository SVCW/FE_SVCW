
import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./socimo-html-files/Admin";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Test from './socimo-html-files/Test';
function App () {
  return (
    <Router>
      <div>
        {/* <AboutUniversity /> */}
        {/* <SignIn /> */}
        {/* <Home /> */}

        <AdminTemplate exact path="/admin" Component={Admin} />
        {/* <AdminTemplate exact path="/table" Component={Admin} /> */}
        <Route exact path="/" component={Test} />

      </div>
    </Router>
  );
}

export default App;
