import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountPopup from "./AccountPopup";
import Groups from "./Groups";
import HeaderPage from "./Header";
import EventLoad from "./EventLoad";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

function Home() {
  const userInfo = useSelector((state) => state.userReducer.user);
  const [clickGroups, setClickGroups] = useState(false);
  const [clickEvent, setClickEvent] = useState(false);
  const [clickHome, setClickHome] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [deleteAPost, setDeleteAPost] = useState(-1);
  const [img, setImg] = useState({});
  const [elementUpdate, setElementUpdate] = useState(undefined);
  const axios = require("axios").default;
  const [eventInSchool, setEventInSchool] = useState([]);

  const getAlumniInGroup = async (eventId) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/eventinalumni/${eventId}/alumni`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        //console.log(response.data);
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getEventInSchool = async () => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schools/${userInfo.infoDetail.schoolId}/events`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          const statusDo = await getAlumniInGroup(response.data[i].id);
          let flag = false;
          for (let j = 0; j < statusDo.length; j++) {
            if (statusDo[j] == userInfo.Id) {
              flag = true;
              response.data[i].statusDonate = true;
              break;
            }
          }
          if (flag == false) {
            response.data[i].statusDonate = false;
          }
        }
        //console.log(response.data);
      }
      setEventInSchool(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const test = async () => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumniingroup?sort=desc&pageNumber=0&pageSize=0`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await test();
  }, []);
  useEffect(async () => {
    await getEventInSchool();
  }, [userInfo]);

  useEffect(async () => {
    await getNewsInSchool();
  }, [deleteAPost, userInfo]);

  const updateImg = (event) => {
    setImg(event.target.files[0]);
    // if (event != undefined) {

    //   document.getElementById("fileUpdateImg").style.display = "none";
    //   document.getElementById("loadImg").insertAdjacentHTML(
    //     "beforeend",
    //     `<img style="width: 400px;
    //     height: 200px;
    //     margin-bottom: 20px;
    //     position: relative"
    //     src="${URL.createObjectURL(event.target.files[0])}" />
    //     <i
    //     style="
    //     position: absolute;
    //     font-size: 30px;
    //     color: black;
    //     left: 49%;
    //     top: 41%"
    //     class="icofont-close-circled"
    //     id="deleteImgInForm"
    //   />`
    //   );
    // }
  };
  // const deleteImgNotSave = () => {
  //   console.log("kaka");
  // };
  const changeSubmit = async (event) => {
    event.preventDefault();
    const addNews = await addNewsInApi();
  };
  const addNewsInApi = async () => {
    // console.log(
    //   document.getElementById("titleID").value +
    //     "-----" +
    //     document.getElementById("emojionearea1").value
    // );
    //emojionearea-editor
    //console.log(document.getElementById("emojionearea1").value);
    const body = {
      schoolId:
        elementUpdate == undefined ? userInfo.SchoolId : elementUpdate.schoolId,
      adminId: elementUpdate == undefined ? userInfo.Id : elementUpdate.adminId,
      title: document.getElementById("titleID").value,
      content: document.getElementById("emojionearea1").value,
      createAt:
        elementUpdate == undefined ? new Date() : elementUpdate.createAt,
      modifiedAt: elementUpdate == undefined ? null : new Date(),
      status: true,
    };
    try {
      const response =
        elementUpdate == undefined
          ? await axios.post("https://truongxuaapp.online/api/v1/news", body, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userInfo.author,
              },
            })
          : await axios.put(
              `https://truongxuaapp.online/api/v1/news?id=${elementUpdate.id}`,
              body,
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            );
      if (response.status == 200) {
        var element = document.getElementById("post-new");
        element.classList.remove("active");
        document.getElementById("emojionearea1").value = "";
        document.getElementById("titleID").value = null;
        //console.log(response.headers.date);
        setDeleteAPost(response.headers.date);
        setElementUpdate(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteANews = async () => {
    try {
      const response = axios.delete(
        `https://truongxuaapp.online/api/v1/news/${deleteAPost}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if ((await response).status === 200) {
        setDeleteAPost(-1);
        var value = document.getElementById("delete-post");
        value.classList.remove("active");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getNewsInSchool = async () => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/schools/${userInfo.SchoolId}/news`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        setDataContent(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // const saveImgInImgBB = async () => {
  //   let dataImgSave = {};

  //   let body = new FormData();
  //   body.set("key", "71b6c3846105c92074f8e9a49b85887f");

  //   body.append("image", img);
  //   try {
  //     const response = await axios({
  //       method: "POST",
  //       url: "https://api.imgbb.com/1/upload",
  //       data: body,
  //     });
  //     if (response.status == 200) {
  //       dataImgSave = {
  //         name: response.data.data.title,
  //         url_display: response.data.data.display_url,
  //       };
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   return dataImgSave;
  // };

  const changeNav = (e) => {
    const { id } = e.target;
    console.log(id);
    if (id === "home") {
      setClickHome(true);
      setClickGroups(false);
      setClickEvent(false);
    }
    if (id === "groups") {
      setClickGroups(true);
      setClickHome(false);
      setClickEvent(false);
    }
    if (id === "event") {
      setClickEvent(true);
      setClickHome(false);
      setClickGroups(false);
    }
  };

  function renderHome() {
    // alumni-alumniId-conmments-content-createAt-id-images-modifiedAt-postInGroups-status

    if (dataContent != undefined) {
      return dataContent.map((element, index) => {
        const d = new Date(element.createAt);
        if (userInfo.SchoolId == element.schoolId) {
          return (
            <div key={index} className="main-wraper">
              <div className="user-post">
                <div className="friend-info">
                  <figure>
                    <em>
                      <svg
                        style={{ verticalAlign: "middle" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#7fba00"
                          stroke="#7fba00"
                          d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
                        />
                      </svg>
                    </em>
                    <img
                      alt=""
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      src={userInfo.infoSchool.image}
                    />
                  </figure>
                  <div className="friend-name">
                    <ins>
                      <a title="verified" href="time-line.html">
                        {userInfo.infoSchool.name}
                      </a>{" "}
                      Đăng bài
                    </ins>
                    <span>
                      <i className="icofont-globe" /> Ngày tạo:{" "}
                      {d.getDate() +
                        "/" +
                        d.getMonth() +
                        "/" +
                        d.getFullYear() +
                        " " +
                        d.getHours() +
                        " Giờ, " +
                        d.getMinutes() +
                        " phút"}
                    </span>
                  </div>
                  <div className="post-meta">
                    <a href="post-detail.html" className="post-title">
                      {element.title}
                    </a>
                    <p>{element.content}</p>
                    <div className="we-video-info">
                      <ul>
                        <li>
                          <span title="views" className="views">
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
                                className="feather feather-eye"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx={12} cy={12} r={3} />
                              </svg>
                            </i>
                            <ins>1.2k</ins>
                          </span>
                        </li>
                        <li>
                          <span title="Comments" className="Recommend">
                            <i>
                              <svg
                                className="feather feather-message-square"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                height={16}
                                width={16}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                            </i>
                            <ins>54</ins>
                          </span>
                        </li>
                        <li>
                          <span title="follow" className="Follow">
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
                                className="feather feather-star"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </i>
                            <ins>5k</ins>
                          </span>
                        </li>
                        <li>
                          <span className="share-pst" title="Share">
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
                                className="feather feather-share-2"
                              >
                                <circle cx={18} cy={5} r={3} />
                                <circle cx={6} cy={12} r={3} />
                                <circle cx={18} cy={19} r={3} />
                                <line
                                  x1="8.59"
                                  y1="13.51"
                                  x2="15.42"
                                  y2="17.49"
                                />
                                <line
                                  x1="15.41"
                                  y1="6.51"
                                  x2="8.59"
                                  y2="10.49"
                                />
                              </svg>
                            </i>
                            <ins>205</ins>
                          </span>
                        </li>
                      </ul>
                      <a href="post-detail.html" title className="reply">
                        Reply <i className="icofont-reply" />
                      </a>
                    </div>
                    <div className="stat-tools">
                      <div className="box">
                        <div className="Like">
                          <a className="Like__link">
                            <i className="icofont-like" /> Like
                          </a>
                          <div className="Emojis">
                            <div className="Emoji Emoji--like">
                              <div className="icon icon--like" />
                            </div>
                            <div className="Emoji Emoji--love">
                              <div className="icon icon--heart" />
                            </div>
                            <div className="Emoji Emoji--haha">
                              <div className="icon icon--haha" />
                            </div>
                            <div className="Emoji Emoji--wow">
                              <div className="icon icon--wow" />
                            </div>
                            <div className="Emoji Emoji--sad">
                              <div className="icon icon--sad" />
                            </div>
                            <div className="Emoji Emoji--angry">
                              <div className="icon icon--angry" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box">
                        <div className="Emojis">
                          <div className="Emoji Emoji--like">
                            <div className="icon icon--like" />
                          </div>
                          <div className="Emoji Emoji--love">
                            <div className="icon icon--heart" />
                          </div>
                          <div className="Emoji Emoji--haha">
                            <div className="icon icon--haha" />
                          </div>
                          <div className="Emoji Emoji--wow">
                            <div className="icon icon--wow" />
                          </div>
                          <div className="Emoji Emoji--sad">
                            <div className="icon icon--sad" />
                          </div>
                          <div className="Emoji Emoji--angry">
                            <div className="icon icon--angry" />
                          </div>
                        </div>
                      </div>
                      <a title href="#" className="comment-to">
                        <i className="icofont-comment" /> Comment
                      </a>
                      <a title href="#" className="share-to">
                        <i className="icofont-share-alt" /> Share
                      </a>
                      <div className="emoji-state">
                        <div className="popover_wrapper">
                          <a className="popover_title" href="#" title>
                            <img alt="" src="images/smiles/thumb.png" />
                          </a>
                          <div className="popover_content">
                            <span>
                              <img alt="" src="images/smiles/thumb.png" /> Likes
                            </span>
                            <ul className="namelist">
                              <li>Jhon Doe</li>
                              <li>Amara Sin</li>
                              <li>Sarah K.</li>
                              <li>
                                <span>20+ more</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="popover_wrapper">
                          <a className="popover_title" href="#" title>
                            <img alt="" src="images/smiles/heart.png" />
                          </a>
                          <div className="popover_content">
                            <span>
                              <img alt="" src="images/smiles/heart.png" /> Love
                            </span>
                            <ul className="namelist">
                              <li>Amara Sin</li>
                              <li>Jhon Doe</li>
                              <li>
                                <span>10+ more</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="popover_wrapper">
                          <a className="popover_title" href="#" title>
                            <img alt="" src="images/smiles/smile.png" />
                          </a>
                          <div className="popover_content">
                            <span>
                              <img alt="" src="images/smiles/smile.png" /> Happy
                            </span>
                            <ul className="namelist">
                              <li>Sarah K.</li>
                              <li>Jhon Doe</li>
                              <li>Amara Sin</li>
                              <li>
                                <span>100+ more</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="popover_wrapper">
                          <a className="popover_title" href="#" title>
                            <img alt="" src="images/smiles/weep.png" />
                          </a>
                          <div className="popover_content">
                            <span>
                              <img alt="" src="images/smiles/weep.png" />{" "}
                              Dislike
                            </span>
                            <ul className="namelist">
                              <li>Danial Carbal</li>
                              <li>Amara Sin</li>
                              <li>Sarah K.</li>
                              <li>
                                <span>15+ more</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <p>10+</p>
                      </div>
                      <div className="new-comment" style={{ display: "none" }}>
                        <form method="post">
                          <input type="text" placeholder="write comment" />
                          <button type="submit">
                            <i className="icofont-paper-plane" />
                          </button>
                        </form>
                        <div className="comments-area">
                          <ul>
                            <li>
                              <figure>
                                <img alt="" src="images/resources/user1.jpg" />
                              </figure>
                              <div className="commenter">
                                <h5>
                                  <a title href="#">
                                    Jack Carter
                                  </a>
                                </h5>
                                <span>2 hours ago</span>
                                <p>
                                  i think that some how, we learn who we really
                                  are and then live with that decision, great
                                  post!
                                </p>
                                <span>
                                  you can view the more detail via link
                                </span>
                                <a
                                  title
                                  href="https://www.youtube.com/watch?v=HpZgwHU1GcI"
                                  target="_blank"
                                >
                                  https://www.youtube.com/watch?v=HpZgwHU1GcI
                                </a>
                              </div>
                              <a title="Like" href="#">
                                <i className="icofont-heart" />
                              </a>
                              <a
                                title="Reply"
                                href="#"
                                className="reply-coment"
                              >
                                <i className="icofont-reply" />
                              </a>
                            </li>
                            <li>
                              <figure>
                                <img alt="" src="images/resources/user2.jpg" />
                              </figure>
                              <div className="commenter">
                                <h5>
                                  <a title href="#">
                                    Ching xang
                                  </a>
                                </h5>
                                <span>2 hours ago</span>
                                <p>
                                  i think that some how, we learn who we really
                                  are and then live with that decision, great
                                  post!
                                </p>
                              </div>
                              <a title="Like" href="#">
                                <i className="icofont-heart" />
                              </a>
                              <a
                                title="Reply"
                                href="#"
                                className="reply-coment"
                              >
                                <i className="icofont-reply" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }

  return (
    <div>
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
              <input type="text" placeholder="Search Blog in Truong Xua..." />
            </form>
          </div>
        </div>
        {/* responsive header */}

        {userInfo.SchoolId == "" || userInfo.SchoolId == null ? (
          <AccountPopup />
        ) : (
          ""
        )}

        <HeaderPage />
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
                    {/* <h1
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Truong Xua
                    </h1> */}
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
                    <div className="col-lg-3">
                      <aside className="sidebar static left">
                        {/* <div className="widget">
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
                        </div> */}
                        {/* popular courses */}
                        <div className="widget">
                          <h4 className="widget-title">
                            Recent Blogs{" "}
                            <a className="see-all" href="#" title>
                              See All
                            </a>
                          </h4>
                          <ul className="recent-links">
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/recentlink-1.jpg"
                                />
                              </figure>
                              <div className="re-links-meta">
                                <h6>
                                  <a title href="#">
                                    Moira's fade reach much farther...
                                  </a>
                                </h6>
                                <span>2 weeks ago </span>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/recentlink-2.jpg"
                                />
                              </figure>
                              <div className="re-links-meta">
                                <h6>
                                  <a title href="#">
                                    Daniel asks The voice of doomfist...
                                  </a>
                                </h6>
                                <span>3 months ago </span>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/recentlink-3.jpg"
                                />
                              </figure>
                              <div className="re-links-meta">
                                <h6>
                                  <a title href="#">
                                    The socimo over watch scandals.
                                  </a>
                                </h6>
                                <span>1 day before</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* recent blog */}
                        <div className="widget">
                          <h4 className="widget-title">
                            Your profile has a new Experience section
                          </h4>
                          <p>
                            Showcase your professional experience and education
                            to help potential employers and collaborators find
                            and contact you about career opportunities.
                          </p>
                          <a
                            className="main-btn"
                            href="profile.html"
                            title
                            data-ripple
                          >
                            view profile
                          </a>
                        </div>
                      </aside>
                    </div>
                    <div className="col-lg-6">
                      <ul className="filtr-tabs">
                        <li>
                          <a
                            onClick={changeNav}
                            className={`${clickHome === true ? "active" : ""}`}
                            href="#"
                            id="home"
                            title
                          >
                            Bản tin trường
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={changeNav}
                            className={`${
                              clickGroups === true ? "active" : ""
                            }`}
                            id="groups"
                            href="#"
                            title
                          >
                            Nhóm
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={changeNav}
                            className={`${clickEvent === true ? "active" : ""}`}
                            id="event"
                            href="#"
                            title
                          >
                            Event của trường
                          </a>
                        </li>
                      </ul>
                      {/* tab buttons */}

                      {/* create new post */}
                      {/* <div className="story-card">
                          <div className="story-title">
                            <h5>Recent Stories</h5>
                            <a href="#" title>
                              See all
                            </a>
                          </div>
                          <div className="story-wraper ">
                            <img
                              src="images/resources/story-card5.jpg"
                              alt=""
                            />
                            <div className="users-dp">
                              <img src="images/resources/user3.jpg" alt="" />
                            </div>
                            <a className="add-new-stry" href="#" title>
                              <i className="icofont-plus" />
                            </a>
                            <span>Add Your Story</span>
                          </div>
                          <div className="story-wraper">
                            <img src="images/resources/story-card.jpg" alt="" />
                            <div className="users-dp">
                              <img src="images/resources/user6.jpg" alt="" />
                            </div>
                            <span>Tamana Bhatia</span>
                          </div>
                          <div className="story-wraper">
                            <img
                              src="images/resources/story-card2.jpg"
                              alt=""
                            />
                            <div className="users-dp">
                              <img src="images/resources/user7.jpg" alt="" />
                            </div>
                            <span>Emily Caros</span>
                          </div>
                          <div className="story-wraper">
                            <img
                              src="images/resources/story-card3.jpg"
                              alt=""
                            />
                            <div className="users-dp">
                              <img src="images/resources/user8.jpg" alt="" />
                            </div>
                            <span>Daniel Cardos</span>
                          </div>
                          <div className="story-wraper">
                            <img
                              src="images/resources/story-card4.jpg"
                              alt=""
                            />
                            <div className="users-dp">
                              <img src="images/resources/user4.jpg" alt="" />
                            </div>
                            <span>Emma Watson</span>
                          </div>
                        </div> */}
                      {/* stories */}
                      {/* <div className="main-wraper">
                          <div className="chatroom-title">
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
                                className="feather feather-tv"
                              >
                                <rect
                                  x={2}
                                  y={7}
                                  width={20}
                                  height={15}
                                  rx={2}
                                  ry={2}
                                />
                                <polyline points="17 2 12 7 7 2" />
                              </svg>
                            </i>
                            <span>
                              Chat Rooms <em>Video chat with friends</em>
                            </span>
                            <a className="create-newroom" href="#" title>
                              Create Room
                            </a>
                          </div>
                          <ul className="chat-rooms">
                            <li>
                              <div className="room-avatar">
                                <img src="images/resources/user2.jpg" alt="" />
                                <span className="status online" />
                              </div>
                              <span>Sara's Room</span>
                              <a className="join" href="#" title="Join Room">
                                Join
                              </a>
                              <a
                                className="say-hi send-mesg"
                                href="#"
                                title="Send Message"
                              >
                                <i className="icofont-facebook-messenger" />
                              </a>
                            </li>
                            <li>
                              <div className="room-avatar">
                                <img src="images/resources/user3.jpg" alt="" />
                                <span className="status offline" />
                              </div>
                              <span>jawad's Room</span>
                              <a className="join" href="#" title="Join Room">
                                Join
                              </a>
                              <a
                                className="say-hi send-mesg"
                                href="#"
                                title="Send Message"
                              >
                                <i className="icofont-facebook-messenger" />
                              </a>
                            </li>
                            <li>
                              <div className="room-avatar">
                                <img src="images/resources/user4.jpg" alt="" />
                                <span className="status away" />
                              </div>
                              <span>Jack's Room</span>
                              <a className="join" href="#" title="Join Room">
                                Join
                              </a>
                              <a
                                className="say-hi send-mesg"
                                href="#"
                                title="Send Message"
                              >
                                <i className="icofont-facebook-messenger" />
                              </a>
                            </li>
                            <li>
                              <div className="room-avatar">
                                <img src="images/resources/user5.jpg" alt="" />
                                <span className="status online" />
                              </div>
                              <span>jobidn's Room</span>
                              <a className="join" href="#" title="Join Room">
                                Join
                              </a>
                              <a
                                className="say-hi send-mesg"
                                href="#"
                                title="Send Message"
                              >
                                <i className="icofont-facebook-messenger" />
                              </a>
                            </li>
                            <li>
                              <div className="room-avatar">
                                <img src="images/resources/user6.jpg" alt="" />
                                <span className="status offline" />
                              </div>
                              <span>Emily's Room</span>
                              <a className="join" href="#" title="Join Room">
                                Join
                              </a>
                              <a
                                className="say-hi send-mesg"
                                href="#"
                                title="Send Message"
                              >
                                <i className="icofont-facebook-messenger" />
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      {/* chat rooms */}
                      {clickEvent &&
                        eventInSchool.map((event) => {
                          return <EventLoad props={event} />;
                        })}
                      {clickGroups && <Groups />}
                      {clickHome && (
                        <div className="blogsInSchool">
                          <div>{renderHome()}</div>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-3">
                      <aside className="sidebar static right">
                        <div className="widget">
                          <h4 className="widget-title">Your Groups</h4>
                          <ul className="ak-groups">
                            <li>
                              <figure>
                                <img
                                  src="images/resources/your-group1.jpg"
                                  alt=""
                                />
                              </figure>
                              <div className="your-grp">
                                <h5>
                                  <a href="group-detail.html" title>
                                    Good Group
                                  </a>
                                </h5>
                                <a href="#" title>
                                  <i className="icofont-bell-alt" />
                                  Notifilactions <span>13</span>
                                </a>
                                <a
                                  href="group-feed.html"
                                  title
                                  className="promote"
                                >
                                  view feed
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  src="images/resources/your-group2.jpg"
                                  alt=""
                                />
                              </figure>
                              <div className="your-grp">
                                <h5>
                                  <a href="group-detail.html" title>
                                    E-course Group
                                  </a>
                                </h5>
                                <a href="#" title>
                                  <i className="icofont-bell-alt" />
                                  Notifilactions <span>13</span>
                                </a>
                                <a
                                  href="group-feed.html"
                                  title
                                  className="promote"
                                >
                                  view feed
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* Your groups */}
                        <div className="widget">
                          <h4 className="widget-title">Suggested Group</h4>
                          <div className="sug-caro">
                            <div className="friend-box">
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/sidebar-info.jpg"
                                />
                                <span>Thành viên: 505K</span>
                              </figure>
                              <div className="frnd-meta">
                                <img
                                  alt=""
                                  src="images/resources/frnd-figure2.jpg"
                                />
                                <div className="frnd-name">
                                  <a title href="#">
                                    Social Research
                                  </a>
                                  <span>@biolabest</span>
                                </div>
                                <a className="main-btn2" href="#" title>
                                  Join Community
                                </a>
                              </div>
                            </div>
                            <div className="friend-box">
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/sidebar-info2.jpg"
                                />
                                <span>Thành viên: 505K</span>
                              </figure>
                              <div className="frnd-meta">
                                <img
                                  alt=""
                                  src="images/resources/frnd-figure3.jpg"
                                />
                                <div className="frnd-name">
                                  <a title href="#">
                                    Bio Labest Group
                                  </a>
                                  <span>@biolabest</span>
                                </div>
                                <a className="main-btn2" href="#" title>
                                  Join Community
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* suggested group */}
                        {/* <div className="widget">
                            <h4 className="widget-title">
                              Ask Research Question?
                            </h4>
                            <div className="ask-question">
                              <i className="icofont-question-circle" />
                              <h6>
                                Ask questions in Q&amp;A to get help from
                                experts in your field.
                              </h6>
                              <a className="ask-qst" href="#" title>
                                Ask a question
                              </a>
                            </div>
                          </div> */}
                        {/* ask question widget */}

                        {/* event widget */}
                        {/* <div className="widget">
                            <span>
                              <i className="icofont-globe" /> Sponsored
                            </span>
                            <ul className="sponsors-ad">
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/sponsor.jpg"
                                    alt=""
                                  />
                                </figure>
                                <div className="sponsor-meta">
                                  <h5>
                                    <a href="#" title>
                                      IQ Options Broker
                                    </a>
                                  </h5>
                                  <a href="#" title target="_blank">
                                    www.iqvie.com
                                  </a>
                                </div>
                              </li>
                              <li>
                                <figure>
                                  <img
                                    src="images/resources/sponsor2.jpg"
                                    alt=""
                                  />
                                </figure>
                                <div className="sponsor-meta">
                                  <h5>
                                    <a href="#" title>
                                      BM Fashion Designer
                                    </a>
                                  </h5>
                                  <a href="#" title target="_blank">
                                    www.abcd.com
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div> */}
                        {/* sponsord */}
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
                        {/* whos following */}
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content */}
        <figure className="bottom-mockup">
          <img src="images/footer.png" alt="" />
        </figure>
        <div className="bottombar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <span className>
                  © copyright All rights reserved by socimo 2020
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
              {/* <li className="nav-item">
                  <a className="active" href="#messages" data-toggle="tab">
                    Messages
                  </a>
                </li> */}
              <li className="nav-item">
                <a className href="#notifications" data-toggle="tab">
                  Notifications
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {/* <div className="tab-pane active fade show" id="messages">
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
                </div> */}
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
        <div id="post-new" className="post-new-popup">
          <div className="popup" style={{ width: "800px" }}>
            <span
              onClick={() => {
                var element = document.getElementById("post-new");
                element.classList.remove("active");
                document.getElementById("emojionearea1").value = "";
                document.getElementById("titleID").value = "";

                setElementUpdate(undefined);
              }}
              className="popup-closed"
            >
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
                  <p
                    style={{
                      display: "inline",
                      fontSize: 20,
                    }}
                    id="popup-head-name"
                  >
                    Tạo bài đăng của trường
                  </p>
                </h5>
              </div>
              <form
                onSubmit={changeSubmit}
                style={{ width: "100%" }}
                className="c-form"
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    alignItems: "baseline",
                  }}
                >
                  <p
                    style={{
                      marginRight: 20,
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    Tiêu đề:{" "}
                  </p>
                  <input
                    required
                    placeholder="Tiêu đề bài đăng"
                    style={{
                      width: "80%",
                      padding: 10,
                    }}
                    id="titleID"
                  />
                </div>
                <div className="post-new">
                  <p
                    style={{
                      marginRight: 20,
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    Nội dung
                  </p>

                  <textarea
                    id="emojionearea1"
                    placeholder="Nhập nội dung của bài đăng"
                    defaultValue={""}
                    style={{
                      height: 170,
                    }}
                    required
                  />

                  {/* <div id="loadImg"></div> */}
                  <button
                    style={{
                      fontSize: 24,
                      width: "100%",
                    }}
                    type="submit"
                    className="main-btn"
                  >
                    Đăng bài
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="delete-post" className="post-new-popup-delete">
          <div className="popup" style={{ width: "800px" }}>
            <span
              onClick={() => {
                var element = document.getElementById("delete-post");
                element.classList.remove("active");
              }}
              className="popup-closed"
            >
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <p
                    style={{
                      fontSize: 18,
                    }}
                    id="popup-head-name"
                  >
                    Bạn có chắn muốn xóa bài đăng này ?
                  </p>
                </h5>
              </div>
              <div className="post-new">
                <button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingLeft: 20,

                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#EFEFEF",
                    float: "right",
                    marginLeft: 10,
                  }}
                  onClick={() => {
                    var element = document.getElementById("delete-post");
                    element.classList.remove("active");
                    setDeleteAPost(-1);
                  }}
                >
                  Hủy
                </button>
                <button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingLeft: 20,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "red",
                    backgroundColor: "red",
                    float: "right",
                  }}
                  onClick={() => deleteANews()}
                >
                  Xóa
                </button>
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
        {/* <div className="auto-popup">
            <div className="popup-innner">
              <div className="popup-head">
                <h4>We want to hear from you!</h4>
              </div>
              <div className="popup-meta">
                <span>
                  What are you struggling with right now? what we can help you
                  with?
                </span>
                <form method="post" className="inquiry-about">
                  <input type="text" placeholder="Your Answer" />
                  <h5>How did you hear about us?</h5>
                  <label>
                    <input type="radio" name="hear" /> Facebook
                  </label>
                  <label>
                    <input type="radio" name="hear" /> instagram
                  </label>
                  <label>
                    <input type="radio" name="hear" /> Google Search
                  </label>
                  <label>
                    <input type="radio" name="hear" /> Twitter
                  </label>
                  <label>
                    <input type="radio" name="hear" /> Whatsapp
                  </label>
                  <label>
                    <input type="radio" name="hear" /> Other
                  </label>
                  <input type="text" placeholder="Writh Other" />

                  <button type="submit" className="primary button">
                    Submit
                  </button>
                  <button
                    className="canceled button outline-primary"
                    type="button"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>{" "} */}
        {/* auto popup */}
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
      </div>
    </div>
  );
}

export default Home;
