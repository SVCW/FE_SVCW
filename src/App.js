import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutUniversity from "./socimo-html-files/AboutUniversity";
import BlogDetail from "./socimo-html-files/BlogDetail";
import Blogs from "./socimo-html-files/Blogs";
import EventDetail from "./socimo-html-files/EventDetail";
import Events from "./socimo-html-files/Events";
import GroupDetails from "./socimo-html-files/Group_Details";
import Home from "./socimo-html-files/Home";
import Invoice from "./socimo-html-files/Invoice";
import LoadImg from "./socimo-html-files/LoadImage";
import Notifications from "./socimo-html-files/Notifications";
import Profile from "./socimo-html-files/Profile";
import SendFeedBack from "./socimo-html-files/SendFeedBack";
import Settings from "./socimo-html-files/Settings";
import SignIn from "./socimo-html-files/SignIn";
import SignUp from "./socimo-html-files/SignUp";
import AccountPopup from "./socimo-html-files/AccountPopup";
import Groups from "./socimo-html-files/Groups";
import Chat from "./socimo-html-files/Chat";
import axios from "axios";
import Test from "./socimo-html-files/Test";
import Admin from "./socimo-html-files/Admin";
import ProductsDemo from "./socimo-html-files/ProductsDemo";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(config);

function App () {
  return (
    <Router>
      <div>
        {/* <AboutUniversity /> */}
        {/* <SignIn /> */}
        {/* <Home /> */}
        <Route path="/" exact component={Test} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/table" exact component={ProductsDemo} />
        <Route path="/popup" component={AccountPopup} />
        <Route path="/groups" component={Groups} />
        <Route path="/chat" component={Chat} />
        <Route path="/aboutUniversity" component={AboutUniversity} />
        <Route path="/home" component={Home} />
        <Route path="/sendFeedBack" component={SendFeedBack} />
        <Route path="/groupDetails" component={GroupDetails} />
        <Route path="/setting" component={Settings} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/blogdetail" component={BlogDetail} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/events" component={Events} />
        <Route path="/eventDetail" component={EventDetail} />
        <Route path="/invoice" component={Invoice} />
        <Route path="/loadimg" component={LoadImg} />
      </div>
    </Router>
  );
}

export default App;
