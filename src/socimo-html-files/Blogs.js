import React from "react";

import { Link } from "react-router-dom";

class Blogs extends React.Component {
  render() {
    return (
      <div className="theme-layout">
        <div className="responsive-header">
          <div className="logo res">
            <img src="images/logo.png" alt="" />
            <span>Socimo</span>
          </div>
          <div className="user-avatar mobile">
            <a href="profile.html" title="View Profile">
              <img alt="" src="images/resources/user.jpg" />
            </a>
            <div className="name">
              <h4>Danial Cardos</h4>
              <span>Ontario, Canada</span>
            </div>
          </div>
          <div className="right-compact">
            <div className="sidemenu">
              <i>
                <svg
                  id="side-menu2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu"
                >
                  <line x1={3} y1={12} x2={21} y2={12} />
                  <line x1={3} y1={6} x2={21} y2={6} />
                  <line x1={3} y1={18} x2={21} y2={18} />
                </svg>
              </i>
            </div>
            <div className="res-search">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx={11} cy={11} r={8} />
                  <line x1={21} y1={21} x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>
          <div className="restop-search">
            <span className="hide-search">
              <i className="icofont-close-circled" />
            </span>
            <form method="post">
              <input type="text" placeholder="Search..." />
            </form>
          </div>
        </div>
        {/* responsive header */}
        <header className>
          <div className="topbar stick">
            <div className="logo">
              <img src="images/logo.png" alt="" />
              <span>Socimo</span>
            </div>
            <div className="searches">
              <form method="post">
                <input type="text" placeholder="Search..." />
                <button type="submit">
                  <i className="icofont-search" />
                </button>
                <span className="cancel-search">
                  <i className="icofont-close" />
                </span>
                <div className="recent-search">
                  <h4 className="recent-searches">Your's Recent Search</h4>
                  <ul className="so-history">
                    <li>
                      <div className="searched-user">
                        <figure>
                          <img src="images/resources/user1.jpg" alt="" />
                        </figure>
                        <span>Danial Carabal</span>
                      </div>
                      <span className="trash">
                        <i className="icofont-close-circled" />
                      </span>
                    </li>
                    <li>
                      <div className="searched-user">
                        <figure>
                          <img src="images/resources/user2.jpg" alt="" />
                        </figure>
                        <span>Maria K</span>
                      </div>
                      <span className="trash">
                        <i className="icofont-close-circled" />
                      </span>
                    </li>
                    <li>
                      <div className="searched-user">
                        <figure>
                          <img src="images/resources/user3.jpg" alt="" />
                        </figure>
                        <span>Fawad Khan</span>
                      </div>
                      <span className="trash">
                        <i className="icofont-close-circled" />
                      </span>
                    </li>
                    <li>
                      <div className="searched-user">
                        <figure>
                          <img src="images/resources/user4.jpg" alt="" />
                        </figure>
                        <span>Danial Sandos</span>
                      </div>
                      <span className="trash">
                        <i className="icofont-close-circled" />
                      </span>
                    </li>
                    <li>
                      <div className="searched-user">
                        <figure>
                          <img src="images/resources/user5.jpg" alt="" />
                        </figure>
                        <span>Jack Carter</span>
                      </div>
                      <span className="trash">
                        <i className="icofont-close-circled" />
                      </span>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            <ul className="web-elements">
              <li>
                <div className="user-dp">
                  <a href="profile-page2.html" title>
                    <img alt="" src="images/resources/user.jpg" />
                    <div className="name">
                      <h4>Danial Cardos</h4>
                    </div>
                  </a>
                </div>
              </li>
              <li className="go-live">
                <a
                  href="live-stream.html"
                  title="Go Live"
                  data-toggle="tooltip"
                >
                  <i>
                    <svg
                      fill="#f00"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="18px"
                      height="18px"
                    >
                      <path d="M 6.1015625 6.1015625 C 3.5675625 8.6345625 2 12.134 2 16 C 2 19.866 3.5675625 23.365437 6.1015625 25.898438 L 7.5195312 24.480469 C 5.3465312 22.307469 4 19.308 4 16 C 4 12.692 5.3465312 9.6925313 7.5195312 7.5195312 L 6.1015625 6.1015625 z M 25.898438 6.1015625 L 24.480469 7.5195312 C 26.653469 9.6925312 28 12.692 28 16 C 28 19.308 26.653469 22.307469 24.480469 24.480469 L 25.898438 25.898438 C 28.432437 23.365437 30 19.866 30 16 C 30 12.134 28.432437 8.6345625 25.898438 6.1015625 z M 9.6367188 9.6367188 C 8.0077188 11.265719 7 13.515 7 16 C 7 18.485 8.0077187 20.734281 9.6367188 22.363281 L 11.052734 20.947266 C 9.7847344 19.680266 9 17.93 9 16 C 9 14.07 9.7847344 12.319734 11.052734 11.052734 L 9.6367188 9.6367188 z M 22.363281 9.6367188 L 20.947266 11.052734 C 22.215266 12.319734 23 14.07 23 16 C 23 17.93 22.215266 19.680266 20.947266 20.947266 L 22.363281 22.363281 C 23.992281 20.734281 25 18.485 25 16 C 25 13.515 23.992281 11.265719 22.363281 9.6367188 z M 16 12 A 4 4 0 0 0 16 20 A 4 4 0 0 0 16 12 z" />
                    </svg>
                  </i>
                </a>
              </li>
              <li>
                <a href="index.html" title="Home" data-toggle="tooltip">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </i>
                </a>
              </li>
              <li>
                <a
                  className="mesg-notif"
                  href="#"
                  title="Messages"
                  data-toggle="tooltip"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-message-square"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </i>
                </a>
                <span />
              </li>
              <li>
                <a
                  className="mesg-notif"
                  href="#"
                  title="Notifications"
                  data-toggle="tooltip"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </i>
                </a>
                <span />
              </li>
              <li>
                <a
                  className="create"
                  href="#"
                  title="Add New"
                  data-toggle="tooltip"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                  </i>
                </a>
              </li>
              <li>
                <a href="#" title>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-grid"
                    >
                      <rect x={3} y={3} width={7} height={7} />
                      <rect x={14} y={3} width={7} height={7} />
                      <rect x={14} y={14} width={7} height={7} />
                      <rect x={3} y={14} width={7} height={7} />
                    </svg>
                  </i>
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="profile.html" title>
                      <i className="icofont-user-alt-3" /> Your Profile
                    </a>
                  </li>
                  <li>
                    <a href="add-new-course.html" title>
                      <i className="icofont-plus" /> New Course
                    </a>
                  </li>
                  <li>
                    <a className="invite-new" href="#" title>
                      <i className="icofont-brand-slideshare" /> Invite Collegue
                    </a>
                  </li>
                  <li>
                    <a href="pay-out.html" title>
                      <i className="icofont-price" /> Payout
                    </a>
                  </li>
                  <li>
                    <a href="price-plan.html" title>
                      <i className="icofont-flash" /> Upgrade
                    </a>
                  </li>
                  <li>
                    <a href="help-faq.html" title>
                      <i className="icofont-question-circle" /> Help
                    </a>
                  </li>
                  <li>
                    <a href="settings.html" title>
                      <i className="icofont-gear" /> Setting
                    </a>
                  </li>
                  <li>
                    <a href="privacy-n-policy.html" title>
                      <i className="icofont-notepad" /> Privacy
                    </a>
                  </li>
                  <li>
                    <a className="dark-mod" href="#" title>
                      <i className="icofont-moon" /> Dark Mode
                    </a>
                  </li>
                  <li className="logout">
                    <a href="sign-in.html" title>
                      <i className="icofont-power" /> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </header>
        {/* header */}
        <nav className="sidebar">
          <ul className="menu-slide">
            <li className="active menu-item-has-children">
              <a className href="#" title>
                <i>
                  <svg
                    id="icon-home"
                    className="feather feather-home"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </i>{" "}
                Home
              </a>
              <ul className="submenu">
                <li>
                  <a href="index.html" title>
                    Newsfeed
                  </a>
                </li>
                <li>
                  <a href="company-home.html" title>
                    Company Home
                  </a>
                </li>
                <li>
                  <a href="profile-page2.html" title>
                    User Profile
                  </a>
                </li>
                <li>
                  <a href="profile.html" title>
                    Student User Profile
                  </a>
                </li>
                <li>
                  <a href="groups.html" title>
                    Groups
                  </a>
                </li>
                <li>
                  <a href="group-detail.html" title>
                    Group Detail
                  </a>
                </li>
                <li>
                  <a href="post-detail.html" title>
                    Social Post Detail
                  </a>
                </li>
                <li>
                  <a href="messages.html" title>
                    Chat/Messages
                  </a>
                </li>
                <li>
                  <a href="notifications.html" title>
                    Notificatioins
                  </a>
                </li>
                <li>
                  <a href="search-result.html" title>
                    Search Result
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a className href="#" title>
                <i className>
                  <svg
                    id="ab7"
                    className="feather feather-zap"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </i>{" "}
                Features
              </a>
              <ul className="submenu">
                <li>
                  <a href="videos.html" title>
                    Videos
                  </a>
                </li>
                <li>
                  <a href="live-stream.html" title>
                    Live Stream
                  </a>
                </li>
                <li>
                  <a href="event-page.html" title>
                    Events Page
                  </a>
                </li>
                <li>
                  <a href="event-detail.html" title>
                    Event Detail
                  </a>
                </li>
                <li>
                  <a href="Q-A.html" title>
                    QA
                  </a>
                </li>
                <li>
                  <a href="Q-detail.html" title>
                    QA Detail
                  </a>
                </li>
                <li>
                  <a href="help-faq.html" title>
                    Support Help
                  </a>
                </li>
                <li>
                  <a href="help-faq-detail.html" title>
                    Support Detail
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a className href="#" title>
                <i className>
                  <svg
                    id="ab5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-bag"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1={3} y1={6} x2={21} y2={6} />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </i>{" "}
                Market Place
              </a>
              <ul className="submenu">
                <li>
                  <a href="books.html" title>
                    Books
                  </a>
                </li>
                <li>
                  <a href="book-detail.html" title>
                    Books Detail
                  </a>
                </li>
                <li>
                  <a href="courses.html" title>
                    Course
                  </a>
                </li>
                <li>
                  <a href="course-detail.html" title>
                    course Detail
                  </a>
                </li>
                <li>
                  <a href="add-new-course.html" title>
                    Add New Course
                  </a>
                </li>
                <li>
                  <a href="product-cart.html" title>
                    Cart Page
                  </a>
                </li>
                <li>
                  <a href="product-checkout.html" title>
                    Checkout
                  </a>
                </li>
                <li>
                  <a href="add-credits.html" title>
                    Add Credit
                  </a>
                </li>
                <li>
                  <a href="pay-out.html" title>
                    Payouts
                  </a>
                </li>
                <li>
                  <a href="price-plan.html" title>
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="invoice.html" title>
                    Invoice
                  </a>
                </li>
                <li>
                  <a href="thank-you.html" title>
                    Thank you Page
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a className href="#" title>
                <i className>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-coffee"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1={6} y1={1} x2={6} y2={4} />
                    <line x1={10} y1={1} x2={10} y2={4} />
                    <line x1={14} y1={1} x2={14} y2={4} />
                  </svg>
                </i>{" "}
                Blogs
              </a>
              <ul className="submenu">
                <li>
                  <a href="blog.html" title>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="blog-detail.html" title>
                    Blog Detail
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a className href="#" title>
                <i>
                  <svg
                    id="ab8"
                    className="feather feather-file"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </i>{" "}
                Featured Pages
              </a>
              <ul className="submenu">
                <li>
                  <a href="404.html" title>
                    Error 404
                  </a>
                </li>
                <li>
                  <a href="coming-soon.html" title>
                    Coming Soon
                  </a>
                </li>
                <li>
                  <a href="send-feedback.html" title>
                    Send Feedback
                  </a>
                </li>
                <li>
                  <a href="badges.html" title>
                    Badges
                  </a>
                </li>
                <li>
                  <a href="thank-you.html" title>
                    Thank You
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a className href="#" title>
                <i className>
                  <svg
                    id="ab9"
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-lock"
                  >
                    <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </i>{" "}
                Authentications
              </a>
              <ul className="submenu">
                <li>
                  <a href="sign-in.html" title>
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="signup.html" title>
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="forgot-password.html" title>
                    Forgot Password
                  </a>
                </li>
              </ul>
            </li>
            <li className>
              <a className href="about-university.html" title>
                <i>
                  <svg
                    id="ab1"
                    className="feather feather-users"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle r={4} cy={7} cx={9} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </i>{" "}
                University Profile
              </a>
            </li>
            <li className>
              <a className href="messages.html" title>
                <i className>
                  <svg
                    className="feather feather-message-square"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                    id="ab2"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      style={{ strokeDasharray: "68, 88", strokeDashoffset: 0 }}
                    />
                  </svg>
                </i>{" "}
                Live Chat
              </a>
            </li>
            <li className>
              <a className href="privacy-n-policy.html" title>
                <i className>
                  <svg
                    id="ab4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-airplay"
                  >
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                    <polygon points="12 15 17 21 7 21 12 15" />
                  </svg>
                </i>{" "}
                Privacy Polices
              </a>
            </li>
            <li className>
              <a className href="settings.html" title>
                <i className>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-settings"
                  >
                    <circle cx={12} cy={12} r={3} />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </i>{" "}
                Web Settings
              </a>
            </li>
            <li className="menu-item-has-children">
              <a className="#" href="#" title>
                <i className>
                  <svg
                    id="team"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-smile"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1={9} y1={9} x2="9.01" y2={9} />
                    <line x1={15} y1={9} x2="15.01" y2={9} />
                  </svg>
                </i>{" "}
                Development Tools
              </a>
              <ul className="submenu">
                <li>
                  <a href="widgets.html" title>
                    Widgets Collection
                  </a>
                </li>
                <li>
                  <a href="development-component.html" title>
                    Web Component
                  </a>
                </li>
                <li>
                  <a href="development-elements.html" title>
                    Web Elements
                  </a>
                </li>
                <li>
                  <a href="loader-spiners.html" title>
                    Loader Spiners
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* nav sidebar */}
        <section>
          <div className="white-bg">
            <div className="container-fluid">
              <div className="menu-caro">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="sidemenu">
                      <i>
                        <svg
                          id="side-menu"
                          xmlns="http://www.w3.org/2000/svg"
                          width={26}
                          height={26}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-menu"
                        >
                          <line x1={3} y1={12} x2={21} y2={12} />
                          <line x1={3} y1={6} x2={21} y2={6} />
                          <line x1={3} y1={18} x2={21} y2={18} />
                        </svg>
                      </i>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <h1
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Blogs
                    </h1>
                  </div>
                  <div className="col-lg-2">
                    <div className="user-inf">
                      <div className="folowerz">Followers: 204</div>
                      <ul className="stars">
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                        <li>
                          <i className="icofont-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* carousel menu */}
        <section>
          <div className="gap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div id="page-contents" className="row merged20">
                    <div className="col-lg-9">
                      <div className="main-wraper">
                        <div className="main-title">Blog Posts</div>
                        <div className="blog-posts">
                          <figure>
                            <img
                              src="images/resources/blog-list-1.jpg"
                              alt=""
                            />
                          </figure>
                          <div className="blog-post-meta">
                            <ul>
                              <li>
                                <i className="icofont-read-book" />
                                <a title="Reads" href="#">
                                  93k
                                </a>
                              </li>
                              <li>
                                <i className="icofont-comment" />
                                <a title="comments" href="#">
                                  33
                                </a>
                              </li>
                            </ul>
                            <h4>Love is always the happiness of a heart.</h4>
                            <p>
                              Our online class is an affordable alternative to
                              private therapy and coaching, and teaches day
                              Lorem ipsum dolor sit amet.
                            </p>
                            <span>
                              <i className="icofont-clock-time" /> january 23,
                              2021
                            </span>
                            <a
                              href="blog-detail.html"
                              title
                              className="button primary circle"
                            >
                              read more
                            </a>
                          </div>
                        </div>
                        <div className="blog-posts">
                          <figure>
                            <img
                              src="images/resources/blog-list-2.jpg"
                              alt=""
                            />
                          </figure>
                          <div className="blog-post-meta">
                            <ul>
                              <li>
                                <i className="icofont-read-book" />
                                <a title="Reads" href="#">
                                  93k
                                </a>
                              </li>
                              <li>
                                <i className="icofont-comment" />
                                <a title="comments" href="#">
                                  33
                                </a>
                              </li>
                            </ul>
                            <h4>Love is always the happiness of a heart.</h4>
                            <p>
                              Our online class is an affordable alternative to
                              private therapy and coaching, and teaches day
                              Lorem ipsum dolor sit amet.
                            </p>
                            <span>
                              <i className="icofont-clock-time" /> january 23,
                              2021
                            </span>
                            <a
                              href="blog-detail.html"
                              title
                              className="button primary circle"
                            >
                              read more
                            </a>
                          </div>
                        </div>
                        <div className="blog-posts">
                          <figure>
                            <img
                              src="images/resources/blog-list-3.jpg"
                              alt=""
                            />
                          </figure>
                          <div className="blog-post-meta">
                            <ul>
                              <li>
                                <i className="icofont-read-book" />
                                <a title="Reads" href="#">
                                  93k
                                </a>
                              </li>
                              <li>
                                <i className="icofont-comment" />
                                <a title="comments" href="#">
                                  33
                                </a>
                              </li>
                            </ul>
                            <h4>
                              Compare Prices Find The Best Computer Accessory
                            </h4>
                            <p>
                              Our online class is an affordable alternative to
                              private therapy and coaching, and teaches day
                              Lorem ipsum dolor sit amet.
                            </p>
                            <span>
                              <i className="icofont-clock-time" /> january 23,
                              2021
                            </span>
                            <a
                              href="blog-detail.html"
                              title
                              className="button primary circle"
                            >
                              read more
                            </a>
                          </div>
                        </div>
                        <div className="blog-posts">
                          <figure>
                            <img
                              src="images/resources/blog-list-4.jpg"
                              alt=""
                            />
                          </figure>
                          <div className="blog-post-meta">
                            <ul>
                              <li>
                                <i className="icofont-read-book" />
                                <a title="Reads" href="#">
                                  93k
                                </a>
                              </li>
                              <li>
                                <i className="icofont-comment" />
                                <a title="comments" href="#">
                                  33
                                </a>
                              </li>
                            </ul>
                            <h4>
                              Will The Democrats Be Able To Reverse The Online
                              Gambling Ban
                            </h4>
                            <p>
                              Our online class is an affordable alternative to
                              private therapy and coaching, and teaches day
                              Lorem ipsum dolor sit amet.
                            </p>
                            <span>
                              <i className="icofont-clock-time" /> january 23,
                              2021
                            </span>
                            <a
                              href="blog-detail.html"
                              title
                              className="button primary circle"
                            >
                              read more
                            </a>
                          </div>
                        </div>
                        <div className="blog-posts">
                          <figure>
                            <img
                              src="images/resources/blog-list-5.jpg"
                              alt=""
                            />
                          </figure>
                          <div className="blog-post-meta">
                            <ul>
                              <li>
                                <i className="icofont-read-book" />
                                <a title="Reads" href="#">
                                  93k
                                </a>
                              </li>
                              <li>
                                <i className="icofont-comment" />
                                <a title="comments" href="#">
                                  33
                                </a>
                              </li>
                            </ul>
                            <h4>Love is always the happiness of a heart.</h4>
                            <p>
                              Our online class is an affordable alternative to
                              private therapy and coaching, and teaches day
                              Lorem ipsum dolor sit amet.
                            </p>
                            <span>
                              <i className="icofont-clock-time" /> january 23,
                              2021
                            </span>
                            <a
                              href="blog-detail.html"
                              title
                              className="button primary circle"
                            >
                              read more
                            </a>
                          </div>
                        </div>
                        <div className="load mt-5 mb-4">
                          <ul className="pagination">
                            <li>
                              <a href="#" title>
                                <i className="icofont-arrow-left" />
                              </a>
                            </li>
                            <li>
                              <a className="active" href="#" title>
                                1
                              </a>
                            </li>
                            <li>
                              <a href="#" title>
                                2
                              </a>
                            </li>
                            <li>
                              <a href="#" title>
                                3
                              </a>
                            </li>
                            <li>
                              <a href="#" title>
                                4
                              </a>
                            </li>
                            <li>
                              <a href="#" title>
                                5
                              </a>
                            </li>
                            <li>....</li>
                            <li>
                              <a href="#" title>
                                10
                              </a>
                            </li>
                            <li>
                              <a href="#" title>
                                <i className="icofont-arrow-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <aside className="sidebar static right">
                        <div className="widget">
                          <h4 className="widget-title">Popular Books</h4>
                          <div className="popular-book">
                            <figure>
                              <img src="images/resources/book10.jpg" alt="" />
                            </figure>
                            <div className="book-about">
                              <h6>
                                <a href="#" title>
                                  Vu.js 2 Basics
                                </a>
                              </h6>
                              <span>Richard Ali</span>
                              <a href="#" title>
                                <i className="icofont-book-mark" />
                              </a>
                            </div>
                          </div>
                          <div className="popular-book">
                            <figure>
                              <img src="images/resources/book9.jpg" alt="" />
                            </figure>
                            <div className="book-about">
                              <h6>
                                <a href="#" title>
                                  Css3 for Bigners
                                </a>
                              </h6>
                              <span>Richard Ali</span>
                              <a href="#" title>
                                <i className="icofont-book-mark" />
                              </a>
                            </div>
                          </div>
                          <div className="popular-book">
                            <figure>
                              <img src="images/resources/book5.jpg" alt="" />
                            </figure>
                            <div className="book-about">
                              <h6>
                                <a href="#" title>
                                  Technology Wants 2020
                                </a>
                              </h6>
                              <span>Richard Ali</span>
                              <a href="#" title>
                                <i className="icofont-book-mark" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="widget">
                          <h4 className="widget-title">
                            Ask Research Question?
                          </h4>
                          <div className="ask-question">
                            <i className="icofont-question-circle" />
                            <h6>
                              Ask questions in Q&amp;A to get help from experts
                              in your field.
                            </h6>
                            <a className="ask-qst" href="#" title>
                              Ask a question
                            </a>
                          </div>
                        </div>
                        <div className="widget">
                          <h4 className="widget-title">
                            Explor Events{" "}
                            <a className="see-all" href="#" title>
                              See All
                            </a>
                          </h4>
                          <div className="rec-events bg-purple">
                            <i className="icofont-gift" />
                            <h6>
                              <a title href>
                                BZ University good night event in columbia
                              </a>
                            </h6>
                            <img alt="" src="images/clock.png" />
                          </div>
                          <div className="rec-events bg-blue">
                            <i className="icofont-microphone" />
                            <h6>
                              <a title href>
                                The 3rd International Conference 2020
                              </a>
                            </h6>
                            <img alt="" src="images/clock.png" />
                          </div>
                        </div>
                        <div className="widget stick-widget">
                          <h4 className="widget-title">Who's follownig</h4>
                          <ul className="followers">
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/friend-avatar.jpg"
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a title href="time-line.html">
                                    Kelly Bill
                                  </a>
                                  <span>Dept colleague</span>
                                </h4>
                                <a className="underline" title href="#">
                                  Follow
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/friend-avatar2.jpg"
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a title href="time-line.html">
                                    Issabel
                                  </a>
                                  <span>Dept colleague</span>
                                </h4>
                                <a className="underline" title href="#">
                                  Follow
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/friend-avatar3.jpg"
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a title href="time-line.html">
                                    Andrew
                                  </a>
                                  <span>Dept colleague</span>
                                </h4>
                                <a className="underline" title href="#">
                                  Follow
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/friend-avatar4.jpg"
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a title href="time-line.html">
                                    Sophia
                                  </a>
                                  <span>Dept colleague</span>
                                </h4>
                                <a className="underline" title href="#">
                                  Follow
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/friend-avatar5.jpg"
                                />
                              </figure>
                              <div className="friend-meta">
                                <h4>
                                  <a title href="time-line.html">
                                    Allen
                                  </a>
                                  <span>Dept colleague</span>
                                </h4>
                                <a className="underline" title href="#">
                                  Follow
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <figure className="bottom-mockup">
          <img src="images/footer.png" alt="" />
        </figure>
        <div className="bottombar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <span className>
                  © copyright All rights reserved by Socimo 2020
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* bottombar */}
        <div className="wraper-invite">
          <div className="popup">
            <span className="popup-closed">
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </i>{" "}
                  Invite Colleagues
                </h5>
              </div>
              <div className="invitation-meta">
                <p>
                  Enter an email address to invite a colleague or co-author to
                  join you on socimo. They will receive an email and, in some
                  cases, up to two reminders.
                </p>
                <form method="post" className="c-form">
                  <input type="text" placeholder="Enter Email" />
                  <button type="submit" className="main-btn">
                    Invite
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* invite colleague popup */}
        <div className="popup-wraper">
          <div className="popup">
            <span className="popup-closed">
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <i>
                    <svg
                      className="feather feather-message-square"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      height={24}
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </i>{" "}
                  Send Message
                </h5>
              </div>
              <div className="send-message">
                <form method="post" className="c-form">
                  <input type="text" placeholder="Enter Name.." />
                  <input type="text" placeholder="Subject" />
                  <textarea placeholder="Write Message" defaultValue={""} />
                  <div className="uploadimage">
                    <i className="icofont-file-jpg" />
                    <label className="fileContainer">
                      <input type="file" />
                      Attach file
                    </label>
                  </div>
                  <button type="submit" className="main-btn">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* send message popup */}
        <div className="side-slide">
          <span className="popup-closed">
            <i className="icofont-close" />
          </span>
          <div className="slide-meta">
            <ul className="nav nav-tabs slide-btns">
              <li className="nav-item">
                <a className="active" href="#messages" data-toggle="tab">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className href="#notifications" data-toggle="tab">
                  Notifications
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active fade show" id="messages">
                <h4>
                  <i className="icofont-envelope" /> messages
                </h4>
                <a
                  href="#"
                  className="send-mesg"
                  title="New Message"
                  data-toggle="tooltip"
                >
                  <i className="icofont-edit" />
                </a>
                <ul className="new-messages">
                  <li>
                    <figure>
                      <img src="images/resources/user1.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Ibrahim Ahmed</span>
                      <a href="#" title>
                        Helo dear i wanna talk to you
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user2.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Fatima J.</span>
                      <a href="#" title>
                        Helo dear i wanna talk to you
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user3.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Fawad Ahmed</span>
                      <a href="#" title>
                        Helo dear i wanna talk to you
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user4.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Saim Turan</span>
                      <a href="#" title>
                        Helo dear i wanna talk to you
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user5.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        Helo dear i wanna talk to you
                      </a>
                    </div>
                  </li>
                </ul>
                <a href="#" title className="main-btn" data-ripple>
                  view all
                </a>
              </div>
              <div className="tab-pane fade" id="notifications">
                <h4>
                  <i className="icofont-bell-alt" /> notifications
                </h4>
                <ul className="notificationz">
                  <li>
                    <figure>
                      <img src="images/resources/user5.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        recommend your post
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user4.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        share your post <strong>a good time today!</strong>
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user2.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        recommend your post
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user1.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        share your post <strong>a good time today!</strong>
                      </a>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <img src="images/resources/user3.jpg" alt="" />
                    </figure>
                    <div className="mesg-info">
                      <span>Alis wells</span>
                      <a href="#" title>
                        recommend your post
                      </a>
                    </div>
                  </li>
                </ul>
                <a href="#" title className="main-btn" data-ripple>
                  view all
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* side slide message & popup */}
        <div className="post-new-popup">
          <div className="popup" style={{ width: "800px" }}>
            <span className="popup-closed">
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                  </i>
                  Create New Post
                </h5>
              </div>
              <div className="post-new">
                <div className="post-newmeta">
                  <ul className="post-categoroes">
                    <li>
                      <i className="icofont-camera" /> Photo / Video
                    </li>
                    <li>
                      <i className="icofont-google-map" /> Post Location
                    </li>
                    <li>
                      <i className="icofont-file-gif" /> Post Gif
                    </li>
                    <li>
                      <i className="icofont-ui-tag" /> Tag to Friend
                    </li>
                    <li>
                      <i className="icofont-users" /> Share in Group
                    </li>
                    <li>
                      <i className="icofont-link" /> Share Link
                    </li>
                    <li>
                      <i className="icofont-video-cam" /> Go Live
                    </li>
                    <li>
                      <i className="icofont-sale-discount" /> Post Online Course
                    </li>
                    <li>
                      <i className="icofont-read-book" /> Post A Book
                    </li>
                    <li>
                      <i className="icofont-globe" /> Post an Ad
                    </li>
                  </ul>
                  <form
                    method="post"
                    className="dropzone"
                    action="/upload-target"
                  >
                    <div className="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </form>
                </div>
                <form method="post" className="c-form">
                  <textarea
                    id="emojionearea1"
                    placeholder="What's On Your Mind?"
                    defaultValue={""}
                  />
                  <div className="activity-post">
                    <div className="checkbox">
                      <input type="checkbox" id="checkbox" defaultChecked />
                      <label htmlFor="checkbox">
                        <span>Activity Feed</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" id="checkbox2" defaultChecked />
                      <label htmlFor="checkbox2">
                        <span>My Story</span>
                      </label>
                    </div>
                  </div>
                  <div className="select-box">
                    <div className="select-box__current" tabIndex={1}>
                      <div className="select-box__value">
                        <input
                          className="select-box__input"
                          type="radio"
                          id={0}
                          defaultValue={1}
                          name="Ben"
                          defaultChecked="checked"
                        />
                        <p className="select-box__input-text">
                          <i className="icofont-globe-alt" /> Public
                        </p>
                      </div>
                      <div className="select-box__value">
                        <input
                          className="select-box__input"
                          type="radio"
                          id={1}
                          defaultValue={2}
                          name="Ben"
                          defaultChecked="checked"
                        />
                        <p className="select-box__input-text">
                          <i className="icofont-lock" /> Private
                        </p>
                      </div>
                      <div className="select-box__value">
                        <input
                          className="select-box__input"
                          type="radio"
                          id={2}
                          defaultValue={3}
                          name="Ben"
                          defaultChecked="checked"
                        />
                        <p className="select-box__input-text">
                          <i className="icofont-user" /> Specific Friend
                        </p>
                      </div>
                      <div className="select-box__value">
                        <input
                          className="select-box__input"
                          type="radio"
                          id={3}
                          defaultValue={4}
                          name="Ben"
                          defaultChecked="checked"
                        />
                        <p className="select-box__input-text">
                          <i className="icofont-star" /> Only Friends
                        </p>
                      </div>
                      <div className="select-box__value">
                        <input
                          className="select-box__input"
                          type="radio"
                          id={4}
                          defaultValue={5}
                          name="Ben"
                          defaultChecked="checked"
                        />
                        <p className="select-box__input-text">
                          <i className="icofont-users-alt-3" /> Joined Groups
                        </p>
                      </div>
                      <img
                        className="select-box__icon"
                        src="images/arrow-down.svg"
                        alt="Arrow Icon"
                        aria-hidden="true"
                      />
                    </div>
                    <ul className="select-box__list">
                      <li>
                        <label className="select-box__option" htmlFor={0}>
                          <i className="icofont-globe-alt" /> Public
                        </label>
                      </li>
                      <li>
                        <label className="select-box__option" htmlFor={1}>
                          <i className="icofont-lock" /> Private
                        </label>
                      </li>
                      <li>
                        <label className="select-box__option" htmlFor={2}>
                          <i className="icofont-user" /> Specific Friend
                        </label>
                      </li>
                      <li>
                        <label className="select-box__option" htmlFor={3}>
                          <i className="icofont-star" /> Only Friends
                        </label>
                      </li>
                      <li>
                        <label className="select-box__option" htmlFor={4}>
                          <i className="icofont-users-alt-3" /> Joined Groups
                        </label>
                      </li>
                    </ul>
                  </div>
                  <input
                    className="schedule-btn"
                    type="text"
                    id="datetimepicker"
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=vgvsuiFlA-Y&t=56s"
                  />
                  <button type="submit" className="main-btn">
                    Publish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* New post popup */}
        <div className="new-question-popup">
          <div className="popup">
            <span className="popup-closed">
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-help-circle"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1={12} y1={17} x2="12.01" y2={17} />
                    </svg>
                  </i>{" "}
                  Ask Question
                </h5>
              </div>
              <div className="post-new">
                <form method="post" className="c-form">
                  <input type="text" placeholder="Question Title" />
                  <textarea placeholder="Write Question" defaultValue={""} />
                  <select>
                    <option>Select Your Question Type</option>
                    <option>Article</option>
                    <option>Book</option>
                    <option>Chapter</option>
                    <option>Code</option>
                    <option>conference Paper</option>
                    <option>Cover Page</option>
                    <option>Data</option>
                    <option>Exprement Finding</option>
                    <option>Method</option>
                    <option>Poster</option>
                    <option>Preprint</option>
                    <option>Technicial Report</option>
                    <option>Thesis</option>
                    <option>Research</option>
                  </select>
                  <div className="uploadimage">
                    <i className="icofont-eye-alt-alt" />
                    <label className="fileContainer">
                      <input type="file" />
                      Upload File
                    </label>
                  </div>
                  <button type="submit" className="main-btn">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ask question */}
        <div className="share-wraper">
          <div className="share-options">
            <span className="close-btn">
              <i className="icofont-close-circled" />
            </span>
            <h5>
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-share"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1={12} y1={2} x2={12} y2={15} />
                </svg>
              </i>
              Share To!
            </h5>
            <form method="post">
              <textarea placeholder="Write Something" defaultValue={""} />
            </form>
            <ul>
              <li>
                <a title href="#">
                  Your Timeline
                </a>
              </li>
              <li className="friends">
                <a title href="#">
                  To Friends
                </a>
              </li>
              <li className="socialz">
                <a className="active" title href="#">
                  Social Media
                </a>
              </li>
            </ul>
            <div style={{ display: "block" }} className="social-media">
              <ul>
                <li>
                  <a title href="#" className="facebook">
                    <i className="icofont-facebook" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="twitter">
                    <i className="icofont-twitter" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="instagram">
                    <i className="icofont-instagram" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="pinterest">
                    <i className="icofont-pinterest" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="youtube">
                    <i className="icofont-youtube" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="dribble">
                    <i className="icofont-dribbble" />
                  </a>
                </li>
                <li>
                  <a title href="#" className="behance">
                    <i className="icofont-behance-original" />
                  </a>
                </li>
              </ul>
            </div>
            <div style={{ display: "none" }} className="friends-to">
              <div className="follow-men">
                <figure>
                  <img
                    className="mCS_img_loaded"
                    src="images/resources/user1.jpg"
                    alt=""
                  />
                </figure>
                <div className="follow-meta">
                  <h5>
                    <a href="#" title>
                      Jack Carter
                    </a>
                  </h5>
                  <span>family member</span>
                </div>
                <a href="#" title>
                  Share
                </a>
              </div>
              <div className="follow-men">
                <figure>
                  <img
                    className="mCS_img_loaded"
                    src="images/resources/user2.jpg"
                    alt=""
                  />
                </figure>
                <div className="follow-meta">
                  <h5>
                    <a href="#" title>
                      Xang Ching
                    </a>
                  </h5>
                  <span>Close Friend</span>
                </div>
                <a href="#" title>
                  Share
                </a>
              </div>
              <div className="follow-men">
                <figure>
                  <img
                    className="mCS_img_loaded"
                    src="images/resources/user3.jpg"
                    alt=""
                  />
                </figure>
                <div className="follow-meta">
                  <h5>
                    <a href="#" title>
                      Emma Watson
                    </a>
                  </h5>
                  <span>Matul Friend</span>
                </div>
                <a href="#" title>
                  Share
                </a>
              </div>
            </div>
            <button type="submit" className="main-btn">
              Publish
            </button>
          </div>
        </div>
        {/* share post */}
        <div className="cart-product">
          <a href="product-cart.html" title="View Cart" data-toggle="tooltip">
            <i className="icofont-cart-alt" />
          </a>
          <span>03</span>
        </div>
        {/* view cart button */}
        <div className="chat-live">
          <a
            className="chat-btn"
            href="#"
            title="Start Live Chat"
            data-toggle="tooltip"
          >
            <i className="icofont-facebook-messenger" />
          </a>
          <span>07</span>
        </div>
        {/* chat button */}
        <div className="chat-box">
          <div className="chat-head">
            <h4>New Messages</h4>
            <span className="clozed">
              <i className="icofont-close-circled" />
            </span>
            <form method="post">
              <input type="text" placeholder="To.." />
            </form>
          </div>
          <div className="user-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="active" href="#link1" data-toggle="tab">
                  All Friends
                </a>
              </li>
              <li className="nav-item">
                <a className href="#link2" data-toggle="tab">
                  Active
                </a>
                <em>3</em>
              </li>
              <li className="nav-item">
                <a className href="#link3" data-toggle="tab">
                  Groups
                </a>
              </li>
            </ul>
            {/* Tab panes */}
            <div className="tab-content">
              <div className="tab-pane active fade show " id="link1">
                <div className="friend">
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user1.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Oliver</span>
                    <i className>
                      <img src="images/resources/user1.jpg" alt="" />
                    </i>
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user2.jpg" alt="" />
                      <span className="status away" />
                    </figure>
                    <span>Amelia</span>
                    <i className="icofont-check-circled" />
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user3.jpg" alt="" />
                      <span className="status offline" />
                    </figure>
                    <span>George</span>
                    <i className>
                      <img src="images/resources/user3.jpg" alt="" />
                    </i>
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user4.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Jacob</span>
                    <i className="icofont-check-circled" />
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user5.jpg" alt="" />
                      <span className="status away" />
                    </figure>
                    <span>Poppy</span>
                    <i className="icofont-check-circled" />
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user6.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Sophia</span>
                    <i className>
                      <img src="images/resources/user6.jpg" alt="" />
                    </i>
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user7.jpg" alt="" />
                      <span className="status away" />
                    </figure>
                    <span>Leo king</span>
                    <i className>
                      <img src="images/resources/user7.jpg" alt="" />
                    </i>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="link2">
                <div className="friend">
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user1.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Samu Jane</span>
                    <i className>
                      <img src="images/resources/user1.jpg" alt="" />
                    </i>
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user6.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Tina Mark</span>
                    <i className>
                      <img src="images/resources/user6.jpg" alt="" />
                    </i>
                  </a>
                  <a href="#" title>
                    <figure>
                      <img src="images/resources/user7.jpg" alt="" />
                      <span className="status online" />
                    </figure>
                    <span>Ak William</span>
                    <i className>
                      <img src="images/resources/user7.jpg" alt="" />
                    </i>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="link3">
                <div className="friend">
                  <a href="#" title>
                    <figure className="group-chat">
                      <img src="images/resources/user5.jpg" alt="" />
                      <img
                        className="two"
                        src="images/resources/user3.jpg"
                        alt=""
                      />
                      <span className="status online" />
                    </figure>
                    <span>Boys World</span>
                    <i className="icofont-check-circled" />
                  </a>
                  <a href="#" title>
                    <figure className="group-chat">
                      <img src="images/resources/user2.jpg" alt="" />
                      <img
                        className="two"
                        src="images/resources/user3.jpg"
                        alt=""
                      />
                      <span className="status online" />
                    </figure>
                    <span>KK university Fellows</span>
                    <i className="icofont-check-circled" />
                  </a>
                  <a href="#" title>
                    <figure className="group-chat">
                      <img src="images/resources/user3.jpg" alt="" />
                      <img
                        className="two"
                        src="images/resources/user2.jpg"
                        alt=""
                      />
                      <span className="status away" />
                    </figure>
                    <span>Education World</span>
                    <i className="icofont-check-circled" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-card">
            <div className="chat-card-head">
              <img src="images/resources/user13.jpg" alt="" />
              <h6>George Floyd</h6>
              <div className="frnd-opt">
                <div className="more">
                  <div className="more-post-optns">
                    <i className>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-more-horizontal"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </i>
                    <ul>
                      <li>
                        <i className="icofont-pen-alt-1" />
                        Edit Post
                        <span>Edit This Post within a Hour</span>
                      </li>
                      <li>
                        <i className="icofont-ban" />
                        Hide Chat
                        <span>Hide This Post</span>
                      </li>
                      <li>
                        <i className="icofont-ui-delete" />
                        Delete Chat
                        <span>If inappropriate Post By Mistake</span>
                      </li>
                      <li>
                        <i className="icofont-flag" />
                        Report
                        <span>Inappropriate Chat</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <span className="close-mesage">
                  <i className="icofont-close" />
                </span>
              </div>
            </div>
            <div className="chat-list">
              <ul>
                <li className="me">
                  <div className="chat-thumb">
                    <img src="images/resources/chatlist1.jpg" alt="" />
                  </div>
                  <div className="notification-event">
                    <div className="chat-message-item">
                      <figure>
                        <img src="images/resources/album5.jpg" alt="" />
                      </figure>
                      <div className="caption">
                        4.5kb{" "}
                        <i className="icofont-download" title="Download" />
                      </div>
                    </div>
                    <span className="notification-date">
                      <time
                        dateTime="2004-07-24T18:18"
                        className="entry-date updated"
                      >
                        Yesterday at 8:10pm
                      </time>
                      <i>
                        <img src="images/d-tick.png" alt="" />
                      </i>
                    </span>
                  </div>
                </li>
                <li className="me">
                  <div className="chat-thumb">
                    <img src="images/resources/chatlist1.jpg" alt="" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Hi James! Please remember to buy the food for tomorrow!
                      I’m gonna be handling the gifts and Jake’s gonna get the
                      drinks
                    </span>
                    <span className="notification-date">
                      <time
                        dateTime="2004-07-24T18:18"
                        className="entry-date updated"
                      >
                        Yesterday at 8:10pm
                      </time>
                      <i>
                        <img src="images/d-tick.png" alt="" />
                      </i>
                    </span>
                  </div>
                </li>
                <li className="you">
                  <div className="chat-thumb">
                    <img src="images/resources/chatlist2.jpg" alt="" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Hi James! Please remember to buy the food for tomorrow!
                      I’m gonna be handling the gifts and Jake’s gonna get the
                      drinks
                    </span>
                    <span className="notification-date">
                      <time
                        dateTime="2004-07-24T18:18"
                        className="entry-date updated"
                      >
                        Yesterday at 8:10pm
                      </time>
                      <i>
                        <img src="images/d-tick.png" alt="" />
                      </i>
                    </span>
                  </div>
                </li>
                <li className="me">
                  <div className="chat-thumb">
                    <img src="images/resources/chatlist1.jpg" alt="" />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Hi James! Please remember to buy the food for tomorrow!
                      I’m gonna be handling the gifts and Jake’s gonna get the
                      drinks
                    </span>
                    <span className="notification-date">
                      <time
                        dateTime="2004-07-24T18:18"
                        className="entry-date updated"
                      >
                        Yesterday at 8:10pm
                      </time>
                      <i>
                        <img src="images/d-tick.png" alt="" />
                      </i>
                    </span>
                  </div>
                </li>
              </ul>
              <form className="text-box">
                <textarea placeholder="Write Mesage..." defaultValue={""} />
                <div className="add-smiles">
                  <span>
                    <img src="images/smiles/happy-3.png" alt="" />
                  </span>
                </div>
                <div className="smiles-bunch">
                  <i>
                    <img src="images/smiles/thumb.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/angry-1.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/angry.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/bored-1.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/confused-1.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/wink.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/weep.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/tongue-out.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/suspicious.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/crying-1.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/crying.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/embarrassed.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/emoticons.png" alt="" />
                  </i>
                  <i>
                    <img src="images/smiles/happy-2.png" alt="" />
                  </i>
                </div>
                <button type="submit">
                  <i className="icofont-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* chat box */}
      </div>
    );
  }
}

export default Blogs;
