import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import HeaderPage from "./Header";
import "../css/groupdetail.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

function GroupDetails() {
  const momentDate = require("moment-timezone");
  let location = useLocation();
  const [eventPopup, setEventPopup] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userInfo = useSelector((state) => state.userReducer.user);
  const showEventPopup = () => {
    console.log(userInfo.infoDetail.name);
    setEventPopup(true);
  };
  const [imgNotSave, setimgNotSave] = useState([]);

  const initialState = {
    alumniCreatedId: userInfo.infoDetail.id,
    schoolId: userInfo.infoDetail.schoolId,
    startDate: "",
    endDate: "",
    name: "",
    description: "",
    ticketPrice: 0,
    createAt: "",
    hourStart: 0,
    minuteStart: 0,
    hourEnd: 0,
    minuteEnd: 0,
    activity: "",
    add: "",
    delete: "",
  };

  const onChange = (e) => {
    const { name, value, type } = e.target;

    setFormEvent({ ...formEvent, [name]: value });

    setErrorStart("");
    setErrorEnd("");
    setActivityError("");
  };

  useEffect(async () => {
    let query = new URLSearchParams(location.search);
    await getGroup(query.get("idGroup"));
    await getAlumniInGroupByGroupId(query.get("idGroup"));
  }, []);

  const [errorStart, setErrorStart] = useState("");
  const [errorEnd, setErrorEnd] = useState("");

  const [formEvent, setFormEvent] = useState(initialState);
  // const [imgSave, setImgSave] = useState([]);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [memberInGroup, setMemberInGroup] = useState([]);
  const [groupRecent, setGroupRecent] = useState({});
  const [dataContent, setDataContent] = useState([]);
  const [updateAPost, setUpdateAPost] = useState({});
  const [deleteAPost, setDeletePost] = useState(0);
  const [deleteAComment, setDeleteComment] = useState(-1);
  const [noti, setNoti] = useState("");
  const [postDetail, setPostDetail] = useState({});
  const [imgById, setImgById] = useState([]);
  const [updateCmt, setUpdateCmt] = useState(undefined);
  //const axios = require("axios").default;
  const [activityEvent, setActivityEvent] = useState([]);
  const moment = require("moment-timezone");

  const RenderActivity = ({ item, index }) => {
    // return activity.map((item,index) => {
    return (
      <div className="item-wrap">
        <span className="activity-name">{item} </span>
        <i
          name="delete"
          onClick={(e) => {
            deleteActivity(index);
            onChange(e);
          }}
          class="icofont-ui-close"
        ></i>
      </div>
    );
    // });
  };

  const deleteActivity = (index) => {
    const listActivity = activityEvent;
    listActivity.splice(index, 1);
    setActivityEvent(listActivity);
    console.log(index);
    console.log(activityEvent);
  };
  const [activityError, setActivityError] = useState("");
  const createEvent = async () => {
    const m = moment().tz("Asia/Ho_Chi_Minh").format();
    let hourStart = formEvent.hourStart.toString();
    let minuteStart = formEvent.minuteStart.toString();
    let hourEnd = formEvent.hourEnd.toString();
    let minuteEnd = formEvent.minuteEnd.toString();
    if (hourStart < 10) hourStart = "0" + hourStart;
    if (minuteStart < 10) minuteStart = "0" + minuteStart;
    if (hourEnd < 10) hourEnd = "0" + hourEnd;
    if (minuteEnd < 10) minuteEnd = "0" + minuteEnd;
    if (formEvent.startDate == "") {
      setErrorStart("Nhập ngày bắt đầu");
    }
    if (formEvent.endDate == "") {
      setErrorEnd("Nhập ngày kết thúc");
    }

    if (
      formEvent.startDate != "" ||
      formEvent.endDate != "" ||
      activityEvent.length == 0
    ) {
      const start = moment
        .tz(
          `${formEvent.startDate} ${hourStart}:${minuteStart}`,
          "Asia/Ho_Chi_Minh"
        )
        .format();
      const end = moment
        .tz(`${formEvent.endDate} ${hourEnd}:${minuteEnd}`, "Asia/Ho_Chi_Minh")
        .format();
      if (start < m) {
        console.log(start);
        setErrorStart(
          "Ngày bắt đầu và thời gian phải lớn hơn thời gian hiện tại"
        );
        return;
      }
      if (start >= end) {
        console.log(end);
        setErrorEnd(
          "Ngày kết thúc và thời gian phải lớn hơn thời gian bắt đầu"
        );
        return;
      }
      if (activityEvent.length == 0) {
        setActivityError("Thêm ít nhất 1 hoạt động ");
        return;
      }
    }

    const start = moment
      .tz(
        `${formEvent.startDate} ${hourStart}:${minuteStart}`,
        "Asia/Ho_Chi_Minh"
      )
      .format();
    const end = moment
      .tz(`${formEvent.endDate} ${hourEnd}:${minuteEnd}`, "Asia/Ho_Chi_Minh")
      .format();
    const data = {
      alumniCreatedId: formEvent.alumniCreatedId,
      schoolId: formEvent.schoolId,
      startDate: start,
      endDate: end,
      name: formEvent.name,
      description: formEvent.description,
      ticketPrice: formEvent.ticketPrice,
      createAt: m,
      schoolId: userInfo.SchoolId,
    };
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/events",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status == 200) {
        const dataImage = await saveImgEventInImgBB();
        console.log(dataImage);
        const eventId = parseInt(response.data);
        console.log(eventId);
        await saveEventImage(eventId, dataImage);
        await saveEventActivity(eventId);
        setEventPopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveEventActivity = async (eventId) => {
    try {
      if (activityEvent.length > 0) {
        for (let i = 0; i < activityEvent.length; i++) {
          const response = await axios.post(
            "https://truongxuaapp.online/api/v1/activities",
            {
              eventId: eventId,
              name: activityEvent[i],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userInfo.author,
              },
            }
          );
          console.log(eventId + "dass");
          console.log(activityEvent[i] + "ds");
          if (response.status === 200) console.log(activityEvent[0]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateAvaGroup = async (event) => {
    let body = new FormData();
    body.set("key", "71b6c3846105c92074f8e9a49b85887f");
    let img = event.target.files[0];
    body.append("image", img);
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      });
      if (response.status == 200) {
        await updateGroupAva(response.data.data.display_url);
        // newGroup.avataImg = response.data.data.display_url;
        // setGroupRecent(newGroup);
        // const dataImgSave = {
        //   name: response.data.data.title,
        //   url_display: response.data.data.display_url,
        // };
        // console.log(dataImgSave);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateGroupAva = async (newAvatar) => {
    console.log(newAvatar);
    try {
      const data = {
        name: groupRecent.name,
        schoolYearId: groupRecent.schoolYearId,
        policy: groupRecent.policy,
        backgroundImg: groupRecent.backgroundImg,
        avataImg: newAvatar,
        description: groupRecent.description,
        info: groupRecent.info,
        groupAdminId: groupRecent.groupAdminId,
      };
      const response = await axios.put(
        `https://truongxuaapp.online/api/v1/groups?id=${groupRecent.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        await getGroup();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCoverGroup = async (event) => {
    let body = new FormData();
    body.set("key", "71b6c3846105c92074f8e9a49b85887f");
    let img = event.target.files[0];
    body.append("image", img);
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      });
      if (response.status == 200) {
        await updateGroupCover(response.data.data.display_url);
        // newGroup.avataImg = response.data.data.display_url;
        // setGroupRecent(newGroup);
        // const dataImgSave = {
        //   name: response.data.data.title,
        //   url_display: response.data.data.display_url,
        // };
        // console.log(dataImgSave);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateGroupCover = async (newAvatar) => {
    try {
      const data = {
        name: groupRecent.name,
        schoolYearId: groupRecent.schoolYearId,
        policy: groupRecent.policy,
        backgroundImg: newAvatar,
        avataImg: groupRecent.avataImg,
        description: groupRecent.description,
        info: groupRecent.info,
        groupAdminId: groupRecent.groupAdminId,
      };
      const response = await axios.put(
        `https://truongxuaapp.online/api/v1/groups?id=${groupRecent.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        await getGroup();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const commentPost = async (event, idPost) => {
    event.preventDefault();
    await createComment(idPost);
  };
  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `https://truongxuaapp.online/api/v1/posts/comments/${deleteAComment}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        setDeleteComment(-1);
        await getAllComment();
        var element = document.getElementById("delete-comment");
        element.classList.remove("active");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const editComment = (element, idPost) => {
    const newComment = [...comment];

    for (let i = 0; i < newComment.length; i++) {
      if (newComment[i].id == element.id) {
        newComment[i].status = false;
        document.getElementById(idPost).value = newComment[i].content;
      }
    }
    setUpdateCmt(element);
    setComment(newComment);
  };
  function renderImgEvent() {
    if (imgEventNotSave.length > 0) {
      return imgEventNotSave.map((element, index) => {
        if (element.typeImg != "delete") {
          return (
            <div
              key={index}
              style={{
                display: "inline",
                paddingRight: 20,
                position: "relative",
              }}
            >
              <img
                src={
                  element.typeImg == undefined || element.typeImg == "new"
                    ? URL.createObjectURL(element.img)
                    : element.img
                }
                style={{
                  width: 150,
                  height: 120,
                  marginBottom: 10,
                }}
              ></img>
              <i
                style={{
                  position: "absolute",
                  fontSize: 24,
                  right: 25,
                  top: -50,
                  color: "black",
                }}
                onClick={() => deleteImgEvent(index)}
                className="icofont-close-circled"
              />
            </div>
          );
        }
      });
    }
  }

  const deleteImgEvent = async (index) => {
    let newNotSaveImg = [...imgEventNotSave];
    let img = newNotSaveImg[index];
    if (img.typeImg == "ImgApi") {
      img.typeImg = "delete";
    } else {
      newNotSaveImg.splice(index, 1);
    }
    setimgEventNotSave(newNotSaveImg);
  };

  const [imgEventNotSave, setimgEventNotSave] = useState([]);

  function uploadImageEvent(event) {
    let data = [];
    if (event.target.files.length == 1) {
      let imgNew = event.target.files[0];
      data[0] = { img: imgNew, typeImg: "new" };
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        let imgNew = event.target.files[i];
        data[i] = { img: imgNew, typeImg: "new" };
      }
    }
    console.log(data);
    if (imgEventNotSave.length > 0) {
      let oldImg = [...imgNotSave, ...data];
      setimgEventNotSave(oldImg);
    } else {
      setimgEventNotSave(data);
    }
  }

  const renderComment = (idPost) => {
    return comment.map((element, index) => {
      const d = new Date(element.createAt);

      if (idPost === element.postId && element.status == true) {
        return (
          <li key={index}>
            <figure>
              <img
                alt=""
                style={{
                  width: 25,
                  height: 25,
                }}
                src={element.comUser.img}
              />
            </figure>
            <div className="commenter">
              <h5>
                <a title href="#">
                  {element.comUser.name}
                </a>
              </h5>
              <span>
                {d.getDate() +
                  "/" +
                  d.getMonth() +
                  "/" +
                  d.getFullYear() +
                  " " +
                  d.getHours() +
                  " Giờ, " +
                  d.getMinutes() +
                  " Phút"}
              </span>
              <p> {element.content}</p>
              {userInfo.Id == element.alumniId ||
              userInfo.Id == groupRecent.groupAdminId ? (
                <div
                  style={{
                    zIndex: 10,
                    float: "right",
                  }}
                  className="more-post-optns"
                >
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
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: 400,
                    }}
                  >
                    {userInfo.Id == element.alumniId ? (
                      <li
                        style={{ margin: 0 }}
                        onClick={() => editComment(element, idPost)}
                      >
                        <i className="icofont-pen-alt-1" />
                        Chỉnh sửa bình luận
                        <span>Edit This Post within a Hour</span>
                      </li>
                    ) : (
                      ""
                    )}

                    <li
                      style={{ margin: 0 }}
                      onClick={() => {
                        var value = document.getElementById("delete-comment");
                        value.classList.add("active");
                        setDeleteComment(element.id);
                      }}
                    >
                      <i className="icofont-ban" />
                      Xóa bình luận
                      <span>Hide This Post</span>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <a title="Like" href="#">
              <i className="icofont-heart" />
            </a>
            <a title="Reply" href="#" className="reply-coment">
              <i className="icofont-reply" />
            </a>
          </li>
        );
      }
    });
  };

  const getAllComment = async () => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts/comments?sort=desc&pageNumber=1&pageSize=0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          const alumni = await findAlumniById(response.data[i].alumniId);
          response.data[i].comUser = alumni;
        }
        setComment(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createComment = async (idPost) => {
    try {
      const data = {
        alumniId: updateCmt === undefined ? userInfo.Id : updateCmt.alumniId,
        postId: updateCmt === undefined ? idPost : updateCmt.postId,
        content: document.getElementById(idPost).value,
        createAt: updateCmt === undefined ? new Date() : updateCmt.createAt,
        modifiedAt: updateCmt === undefined ? null : new Date(),
        status: true,
      };

      const response =
        updateCmt === undefined
          ? await axios.post(
              "https://truongxuaapp.online/api/v1/posts/comments",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            )
          : await axios.put(
              `https://truongxuaapp.online/api/v1/posts/comments/${updateCmt.id}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            );
      if (response.status === 200) {
        document.getElementById(idPost).value = "";
        setUpdateAPost(undefined);
        await getAllComment();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [stateFollow, setStateFollow] = useState([
    {
      content: "Chờ xác nhận từ bạn",
      status: true,
    },
    {
      content: "Đã gửi lời mời kết nối",
      status: false,
    },
    {
      content: "Đã kết nối",
      status: true,
    },
    {
      content: "Kết nối",
      status: false,
    },
  ]);
  const getFollowedById = async (idFollwed) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/followers/checkfollowed?alumniId=${idFollwed}&followerId=${userInfo.Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getFollowedByIdSwap = async (idFollwed) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/followers/checkfollowed?alumniId=${userInfo.Id}&followerId=${idFollwed}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const connectFollow = async (idAlum) => {
    if (idAlum != userInfo.Id) {
      try {
        const data = {
          alumniId: idAlum,
          followerAlumni: userInfo.Id,
          status: false,
        };
        const response = await axios.post(
          `https://truongxuaapp.online/api/v1/followers`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userInfo.author,
            },
          }
        );
        if (response.status === 200) {
          await getAlumniInGroupByGroupId(groupRecent.id);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getAlumniInGroupByGroupId = async (idGroup) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumniingroup/groupid?groupid=${idGroup}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        const member = [];
        for (let i = 0; i < response.data.length; i++) {
          //console.log(response.data[i])
          const alumniById = await findAlumniById(response.data[i].alumniId);
          const followed = await getFollowedById(response.data[i].alumniId);
          const followedSwap = await getFollowedByIdSwap(
            response.data[i].alumniId
          );
          if (followed == 0 && followedSwap == 0) {
            alumniById.followedUser = 3;
          } else {
            alumniById.followedUser = followed;
          }
          alumniById.followedUserSwap = followedSwap;
          member.push(alumniById);
        }

        setMemberInGroup(member);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const findAlumniById = async (idAlum) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${idAlum}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await getAllPost();
    setTimeout(() => getAllImg(), 3000);
    await getAllComment();
  }, [noti]);

  const getGroup = async (idGroup) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/groups/${idGroup}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status == 200) {
        setGroupRecent(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAllImg = async () => {
    await axios
      .get(
        "https://truongxuaapp.online/api/v1/images?pageNumber=1&pageSize=0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      )
      .then((response) => {
        setImgById(response.data);
      })
      .catch((err) => console.log("ngu"));
  };

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts?sort=desc&pageNumber=1&pageSize=0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          const alumni = await findAlumniById(response.data[i].alumniId);
          response.data[i].userPost = alumni;
        }
        setDataContent(response.data);
        return response.data[0].id;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const renderMember = () => {
    return memberInGroup.map((element, index) => {
      let url = "/profile/" + element.id;
      return (
        <li key={index}>
          <Link to={url}>
            <figure>
              <img
                style={{
                  width: 45,
                  height: 45,
                }}
                alt=""
                src={element.img}
              />
              <a href>{element.name}</a>
            </figure>
          </Link>

          <button
            onClick={() => {
              if (element.followedUser == 3) {
                connectFollow(element.id);
              } else {
                console.log("haha ga`");
              }
            }}
            style={{
              width: 54,
            }}
            className="sug-like"
          >
            <i className="invit">
              {element.id != userInfo.Id
                ? stateFollow[element.followedUser].content
                : ""}
            </i>
            <i className="icofont-check-alt" />
          </button>
        </li>
      );
    });
  };

  const findImageByPostId = async (id) => {
    if (id != []) {
      let imgData = [];
      for (let i = 0; i < id.length; i++) {
        try {
          const response = await axios.get(
            `https://truongxuaapp.online/api/v1/images/${id[i]}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userInfo.author,
              },
            }
          );
          if (response.status == 200) {
            imgData[i] = response.data;
            setNoti(response.config.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
      return imgData;
    }
  };
  const findIdToDelete = (id) => {
    const data = [];
    for (let i = 0; i < imgById.length; i++) {
      if (imgById[i].postId == id) {
        data.push(imgById[i].id);
      }
    }

    return data;
  };
  const deteleImageById = async (deleteOneImg) => {
    //console.log(deleteOneImg);
    if (deleteOneImg != undefined) {
      try {
        const response = await axios.delete(
          `https://truongxuaapp.online/api/v1/images/${deleteOneImg}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userInfo.author,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      let id = findIdToDelete(deleteAPost);
      if (id != []) {
        for (let i = 0; i < id.length; i++) {
          try {
            const response = await axios.delete(
              `https://truongxuaapp.online/api/v1/images/${id[i]}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            );
          } catch (err) {
            console.error(err);
          }
        }
        return 200;
      } else {
        return 200;
      }
    }
  };
  const findCommentById = async () => {
    try {
      const response = await axios.get(
        "https://truongxuaapp.online/api/v1/posts/comments?pageNumber=1&pageSize=0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status == 200) {
        let data = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].postId === deleteAPost) {
            data.push(response.data[i].id);
          }
        }
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteCommentByPostId = async () => {
    const idCom = await findCommentById();
    try {
      for (let i = 0; i < idCom.length; i++) {
        const response = await axios.delete(
          `https://truongxuaapp.online/api/v1/posts/comments/${idCom[i]}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userInfo.author,
            },
          }
        );
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };
  const deletePost = async () => {
    const statusDeImg = await deteleImageById();
    const deleteComment = await deleteCommentByPostId();
    if (statusDeImg === 200) {
      try {
        const response = await axios.delete(
          `https://truongxuaapp.online/api/v1/posts/${deleteAPost}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userInfo.author,
            },
          }
        );
        if (response.status == 200) {
          var element = document.getElementById("delete-post");
          element.classList.remove("active");
          setNoti(deleteAPost);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const renderImgInDB = (element) => {
    if (imgById != undefined) {
      return imgById.map((elementImg, indexImg) => {
        if (element.id === elementImg.postId) {
          return (
            <figure
              style={{
                display: "inline",
                marginRight: 20,
              }}
              key={indexImg}
              onClick={() => {
                setPostDetail(element);
              }}
            >
              <a
                data-toggle="modal"
                data-target="#img-comt"
                href="images/resources/album1.jpg"
              >
                <img
                  style={{
                    width: 250,
                    height: 225,
                    paddingBottom: 15,
                  }}
                  src={elementImg.imageUrl}
                  alt=""
                />
              </a>
            </figure>
          );
        }
      });
    }
  };
  const saveImgInImgBB = async () => {
    let dataImgSave = [];
    if (imgNotSave.length >= 1) {
      let body = new FormData();
      body.set("key", "71b6c3846105c92074f8e9a49b85887f");
      for (let i = 0; i < imgNotSave.length; i++) {
        if (imgNotSave[i].typeImg == "new") {
          let img = imgNotSave[i].img;
          body.append("image", img);
          try {
            const response = await axios({
              method: "POST",
              url: "https://api.imgbb.com/1/upload",
              data: body,
            });
            if (response.status == 200) {
              dataImgSave[i] = {
                name: response.data.data.title,
                url_display: response.data.data.display_url,
              };
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    return dataImgSave;
  };
  const saveImgEventInImgBB = async () => {
    let dataImgSave = [];
    if (imgEventNotSave.length >= 1) {
      let body = new FormData();
      body.set("key", "801bd3a925ecfac0e693d493198af86c");
      for (let i = 0; i < imgEventNotSave.length; i++) {
        if (imgEventNotSave[i].typeImg == "new") {
          let img = imgEventNotSave[i].img;
          body.append("image", img);
          try {
            const response = await axios({
              method: "POST",
              url: "https://api.imgbb.com/1/upload",
              data: body,
            });
            if (response.status == 200) {
              dataImgSave[i] = {
                name: response.data.data.title,
                url_display: response.data.data.display_url,
              };
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    return dataImgSave;
  };

  const saveEventImage = async (eventId, dataImage) => {
    if (dataImage.length > 0) {
      for (let i = 0; i < dataImage.length; i++) {
        const response = await axios.post(
          "https://truongxuaapp.online/api/v1/images",
          {
            eventId: eventId,
            imageUrl: dataImage[i].url_display,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userInfo.author,
            },
          }
        );
        if (response.status === 200) console.log(dataImage[i].url_display);
      }
      setimgEventNotSave([]);
    }
  };

  const updatePostApi = async () => {
    const updatePost = {
      // alumniId: updateAPost.alumniId,
      // content: document.getElementById("emojionearea1").value,
      // createAt: updateAPost.createAt,
      // modifiedAt: new Date(),
      // status: updateAPost.status,
      //id: updateAPost.id,

      alumniId: updateAPost.alumniId,
      groupId: groupRecent.id,
      content: document.getElementById("emojionearea1").value,
      createAt: updateAPost.createAt,
      modifiedAt: momentDate().tz("Asia/Ho_Chi_Minh").format(),
      status: true,
    };

    try {
      const response = await axios.put(
        `https://truongxuaapp.online/api/v1/posts?id=${updateAPost.id}`,
        updatePost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status == 200) {
        setUpdateAPost({});
        var element = document.getElementById("post-new");
        element.classList.remove("active");
        document.getElementById("emojionearea1").value = "";
        setimgNotSave([]);
        setNoti(response.config.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addPostApi = async () => {
    const dataAddPost = {
      alumniId: userInfo.Id,
      content: content,
      createAt: momentDate().tz("Asia/Ho_Chi_Minh").format(),
      modifiedAt: null,
      status: true,
      groupId: groupRecent.id,
    };
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/posts",
        dataAddPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status == 200) {
        var element = document.getElementById("post-new");
        element.classList.remove("active");
        document.getElementById("emojionearea1").value = "";
        setimgNotSave([]);
        setNoti(response.config.data);
        await getAlumniInGroup(groupRecent.id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getAlumniInGroup = async (groupId) => {
    try {
      const listStudentId = [];
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumniingroup/groupid?groupid=${groupId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.authorization,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            listStudentId.push(response.data[i].alumniId);
          }
        }
        await addNotiInFirebase(listStudentId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNotiInFirebase = async (listStudentId) => {
    const messagesRef = firebase.firestore().collection("notifications");
    console.log(userInfo.infoDetail);
    //const infoUser = decodeAuthor();
    //const school = await getSchoolRecent();
    for (let i = 0; i < listStudentId.length; i++) {
      //console.log(listStudentId[i]);
      await messagesRef
        .doc(listStudentId[i] + "")
        .collection("messages")
        .add({
          content:
            userInfo.infoDetail.name +
            " đã đăng bài trong nhóm " +
            groupRecent.name,
          img: userInfo.infoDetail.img,
          createAt: new Date(),
          idCreatePost: userInfo.Id,
        });
    }
  };
  const addImgApi = async (imgData) => {
    let id = 0;

    if (
      document.getElementById("popup-head-name").innerHTML !=
      "Chỉnh sửa bài đăng"
    ) {
      id = await getAllPost();
    } else {
      id = deleteAPost;
    }

    for (let i = 0; i < imgData.length; i++) {
      if (imgData[i] != undefined) {
        const dataImg = {
          postId: id,
          eventId: null,
          imageUrl: imgData[i].url_display,
        };
        try {
          const response = await axios.post(
            "https://truongxuaapp.online/api/v1/images",
            dataImg,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userInfo.author,
              },
            }
          );
          if (response == 200) {
            setimgNotSave([]);
            setNoti(response.config.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const updatePost = async (element) => {
    let classMove = document.getElementById("post-new");
    classMove.classList.add("active");
    let test = document.getElementById("popup-head-name");
    test.innerHTML = "Chỉnh sửa bài đăng";
    setUpdateAPost(element);
    document.getElementById("emojionearea1").value = element.content;
    setDeletePost(element.id);
    const idImg = findIdToDelete(element.id);
    const dataImg = await findImageByPostId(idImg);
    if (dataImg != []) {
      let imgUrl = [];
      for (let i = 0; i < dataImg.length; i++) {
        imgUrl[i] = {
          img: dataImg[i].imageUrl,
          typeImg: "ImgApi",
          idDelete: dataImg[i].id,
        };
      }
      setimgNotSave(imgUrl);
    }
  };

  const renderHome = () => {
    // alumni-alumniId-conmments-content-createAt-id-images-modifiedAt-postInGroups-status

    if (dataContent != undefined) {
      return dataContent.map((element, index) => {
        const d = new Date(element.createAt);
        if (groupRecent.id == element.groupId) {
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
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      alt=""
                      src={element.userPost.img}
                    />
                  </figure>
                  <div className="friend-name">
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
                          {userInfo.Id == element.alumniId ? (
                            <li onClick={() => updatePost(element)}>
                              <i className="icofont-pen-alt-1" />
                              Chỉnh sửa bài đăng
                              <span>Edit This Post within a Hour</span>
                            </li>
                          ) : (
                            ""
                          )}

                          <li>
                            <i className="icofont-ban" />
                            Ẩn bài đăng
                            <span>Hide This Post</span>
                          </li>
                          {userInfo.Id == element.alumniId ||
                          userInfo.Id == groupRecent.groupAdminId ? (
                            <li
                              onClick={() => {
                                var value =
                                  document.getElementById("delete-post");
                                value.classList.add("active");
                                setDeletePost(element.id);
                              }}
                            >
                              <i className="icofont-ui-delete" />
                              Xóa bài đăng
                              <span>If inappropriate Post By Mistake</span>
                            </li>
                          ) : (
                            ""
                          )}

                          <li>
                            <i className="icofont-flag" />
                            Báo cáo bài đăng
                            <span>Inappropriate content</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <ins>
                      <a title href="#">
                        {element.userPost.name}
                      </a>{" "}
                      Tạo bài đăng
                    </ins>
                    <span>
                      <i className="icofont-globe" /> Ngày đăng:{" "}
                      {d.getDate() +
                        "/" +
                        parseInt(d.getMonth()) +
                        1 +
                        "/" +
                        d.getFullYear() +
                        " " +
                        d.getHours() +
                        " Giờ, " +
                        d.getMinutes() +
                        " Phút"}
                    </span>
                  </div>
                  <div className="post-meta">
                    {/* <a href="post-detail.html" className="post-title">
                      Supervision as a Personnel Development Device
                    </a> */}
                    {renderImgInDB(element)}
                    <p
                      style={{
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {element.content}
                    </p>
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
                        <p>30+</p>
                      </div>
                    </div>
                    <div className="new-comment" style={{ display: "block" }}>
                      <form
                        onSubmit={(e) => commentPost(e, element.id)}
                        method="post"
                      >
                        <input
                          type="text"
                          id={element.id}
                          placeholder="Viết bình luận"
                        />
                        <button type="submit">
                          <i className="icofont-paper-plane" />
                        </button>
                      </form>
                      <div className="comments-area">
                        <ul>{renderComment(element.id)}</ul>
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
  };

  function renderImg() {
    if (imgNotSave.length > 0) {
      return imgNotSave.map((element, index) => {
        if (element.typeImg != "delete") {
          return (
            <div
              key={index}
              style={{
                display: "inline",
                paddingRight: 20,
                position: "relative",
              }}
            >
              <img
                src={
                  element.typeImg == undefined || element.typeImg == "new"
                    ? URL.createObjectURL(element.img)
                    : element.img
                }
                style={{
                  width: 150,
                  height: 120,
                  marginBottom: 10,
                }}
              ></img>
              <i
                style={{
                  position: "absolute",
                  fontSize: 24,
                  right: 25,
                  top: -50,
                  color: "black",
                }}
                onClick={() => deleteImg(index)}
                className="icofont-close-circled"
              />
            </div>
          );
        }
      });
    }
  }

  const deleteImg = async (index) => {
    let newNotSaveImg = [...imgNotSave];
    let img = newNotSaveImg[index];
    if (img.typeImg == "ImgApi") {
      img.typeImg = "delete";
    } else {
      newNotSaveImg.splice(index, 1);
    }
    setimgNotSave(newNotSaveImg);
  };

  function uploadImage(event) {
    let data = [];
    if (event.target.files.length == 1) {
      let imgNew = event.target.files[0];
      data[0] = { img: imgNew, typeImg: "new" };
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        let imgNew = event.target.files[i];
        data[i] = { img: imgNew, typeImg: "new" };
      }
    }
    console.log(data);
    if (imgNotSave.length > 0) {
      let oldImg = [...imgNotSave, ...data];
      setimgNotSave(oldImg);
    } else {
      setimgNotSave(data);
    }
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    if (updateAPost.id == undefined) {
      await addPostApi();
      // setimgNotSave([]);
      // setContent("");
      // document.getElementById("emojionearea1").value = "";
    } else {
      const update = await updatePostApi();
      if (imgNotSave.length > 0) {
        for (let i = 0; i < imgNotSave.length; i++) {
          if (imgNotSave[i].typeImg === "delete") {
            await deteleImageById(imgNotSave[i].idDelete);
          }
        }
      }
    }

    if (imgNotSave.length > 0) {
      const saveImg = await saveImgInImgBB();
      addImgApi(saveImg);
    } else {
      setimgNotSave([]);
    }
  };
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
              <input type="text" placeholder="Search..." />
            </form>
          </div>
        </div>
        {/* responsive header */}
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
                      style={{
                        strokeDasharray: "68, 88",
                        strokeDashoffset: 0,
                      }}
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
                      Truong Xua
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
                    <div className="col-lg-3">
                      <aside className="sidebar static left">
                        <div className="widget">
                          <h4 className="widget-title">Your Groups</h4>
                          <ul className="ak-groups">
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/your-group1.jpg"
                                />
                              </figure>
                              <div className="your-grp">
                                <h5>
                                  <a title href="group-detail.html">
                                    Good Group
                                  </a>
                                </h5>
                                <a title href="#">
                                  <i className="icofont-bell-alt" />
                                  Notifilactions <span>13</span>
                                </a>
                                <a
                                  className="promote"
                                  title
                                  href="group-feed.html"
                                >
                                  view feed
                                </a>
                              </div>
                            </li>
                            <li>
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/your-group2.jpg"
                                />
                              </figure>
                              <div className="your-grp">
                                <h5>
                                  <a title href="group-detail.html">
                                    E-course Group
                                  </a>
                                </h5>
                                <a title href="#">
                                  <i className="icofont-bell-alt" />
                                  Notifilactions <span>13</span>
                                </a>
                                <a
                                  className="promote"
                                  title
                                  href="group-feed.html"
                                >
                                  view feed
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="widget">
                          <h4 className="widget-title">Suggested Group</h4>
                          <div className="sug-caro">
                            <div className="friend-box">
                              <figure>
                                <img
                                  alt=""
                                  src="images/resources/sidebar-info.jpg"
                                />
                                <span>Members: 505K</span>
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
                                <span>Members: 505K</span>
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
                        <div className="widget">
                          <h4 className="widget-title">Điều khoản nhóm</h4>
                          <div className="grop-rules">
                            <p>{groupRecent.policy}</p>
                          </div>
                        </div>
                        {/* <div className="widget stick-widget">
                            <h4 className="widget-title">
                              Featured Universities{" "}
                              <a className="see-all" href="#" title>
                                See All
                              </a>
                            </h4>
                            <ul className="featured-comp">
                              <li>
                                <a
                                  href="#"
                                  title="Color Hands inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company1.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="Macrosoft inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company2.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="EBM inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company3.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="Boogle inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company4.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="Color Hands inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company5.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="Macrosoft inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company6.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="EBM inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company7.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  title="Boogle inc"
                                  data-toggle="tooltip"
                                >
                                  <img
                                    src="images/resources/company8.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                            </ul>
                          </div> */}
                        {/* feature universites logos */}
                      </aside>
                    </div>
                    <div className="col-lg-9">
                      <div className="group-feed">
                        <div className="group-avatar">
                          <img
                            style={{
                              width: 1130,
                              height: 400,
                            }}
                            src={groupRecent.backgroundImg}
                            alt=""
                          />
                          <a href="#" title>
                            <i className="icofont-check-circled" />
                            Joined
                          </a>
                          {userInfo.Id == groupRecent.groupAdminId ? (
                            <label for="imgCover">
                              <div className="wall">
                                <i class="icofont-camera"></i>
                                <span>Thay đổi ảnh bìa</span>
                                <input
                                  type="file"
                                  id="imgCover"
                                  style={{
                                    display: "none",
                                  }}
                                  onChange={(e) => updateCoverGroup(e)}
                                  name="image"
                                  accept="image/gif,image/jpeg,image/jpg,image/png"
                                />
                              </div>
                            </label>
                          ) : (
                            ""
                          )}

                          <figure className="group-dp">
                            <img src={groupRecent.avataImg} alt="" />
                            {userInfo.Id == groupRecent.groupAdminId ? (
                              <label for="imgAva">
                                <a className="icon-camera">
                                  <i class="icofont-camera"></i>
                                  <input
                                    type="file"
                                    id="imgAva"
                                    style={{
                                      display: "none",
                                    }}
                                    name="image"
                                    accept="image/gif,image/jpeg,image/jpg,image/png"
                                    onChange={(e) => updateAvaGroup(e)}
                                  />
                                </a>
                              </label>
                            ) : (
                              ""
                            )}
                          </figure>
                        </div>
                        <div className="grp-info">
                          <h4>{groupRecent.name}</h4>
                          <ul>
                            <li>
                              <span>Ngày tạo nhóm:</span> April 2020
                            </li>
                            <li>
                              <span>Thành viên:</span> {memberInGroup.length}
                            </li>
                            <li>
                              <span>Số bài đăng:</span> {dataContent.length}
                            </li>
                          </ul>
                        </div>
                        <div className="main-wraper">
                          <div className="grp-about">
                            <div className="row">
                              <div className="col-lg-8">
                                <h4>Giới Thiệu</h4>
                                <p>{groupRecent.info}</p>
                              </div>
                              <div className="col-lg-4">
                                <div className="share-article">
                                  <span>share this Group</span>
                                  <a href="#" title className="facebook">
                                    <i className="icofont-facebook" />
                                  </a>
                                  <a href="#" title className="pinterest">
                                    <i className="icofont-pinterest" />
                                  </a>
                                  <a href="#" title className="instagram">
                                    <i className="icofont-instagram" />
                                  </a>
                                  <a href="#" title className="twitter">
                                    <i className="icofont-twitter" />
                                  </a>
                                  <a href="#" title className="google">
                                    <i className="icofont-google-plus" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="main-wraper">
                              <span className="new-title">Tạo bài đăng</span>
                              <div className="new-post">
                                <form method="post">
                                  <i className="icofont-pen-alt-1" />
                                  <input
                                    type="text"
                                    placeholder="Đăng bài"
                                    onClick={() => {
                                      var element =
                                        document.getElementById("post-new");
                                      element.classList.add("active");
                                      let test =
                                        document.getElementById(
                                          "popup-head-name"
                                        );
                                      test.innerHTML = "Create New Post";
                                    }}
                                  />
                                </form>
                                <ul className="upload-media">
                                  <li>
                                    <a href="#" title>
                                      <i>
                                        <img src="images/image.png" alt="" />
                                      </i>
                                      <span>Photo/Video</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" title>
                                      <i>
                                        <img src="images/activity.png" alt="" />
                                      </i>
                                      <span>Feeling/Activity</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="live-stream.html" title>
                                      <i>
                                        <img
                                          src="images/live-stream.png"
                                          alt=""
                                        />
                                      </i>
                                      <span>Live Stream</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* create new post */}
                            {/* {userInfo.Id == groupRecent.groupAdminId ? (
                              <div
                                className="event-button"
                                onClick={showEventPopup}
                              >
                                <p className="">Tạo sự kiện mới</p>
                              </div>
                            ) : (
                              ""
                            )} */}

                            {/* <div
                              className="event-button"
                              onClick={showEventPopup}
                            >
                              <p className="">Tạo sự kiện mới</p>
                            </div> */}

                            {/* chat rooms */}

                            {/* suggested friends */}

                            {/* share post without image */}

                            {/* post sell book */}
                            <div>{renderHome()}</div>
                          </div>
                          <div className="col-lg-4">
                            <aside className="sidebar static left">
                              <div className="widget">
                                <h4 className="widget-title">
                                  Thành viên
                                  {/* <a title href="#" className="see-all">
                                    Xem thêm
                                  </a> */}
                                </h4>
                                <ul className="invitepage">{renderMember()}</ul>
                              </div>

                              {/* Suggested groups */}
                            </aside>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* content */}
        <figure className="bottom-mockup">
          <img alt="" src="images/footer.png" />
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
        <div className={`wraper-invite ${eventPopup === true ? "active" : ""}`}>
          <div className="popup">
            <span
              className="popup-closed"
              onClick={() => {
                setEventPopup(false);
              }}
            >
              <i className="icofont-close" />
            </span>
            <div className="popup-meta">
              <div className="popup-head">
                <h5>
                  <i class="icofont-megaphone-alt"></i>
                  Sự kiện mới
                </h5>
              </div>
              <div className="invitation-meta">
                <div className="imgWrap">
                  <label class="lablePhoto" for="photoEvent">
                    <i className="icofont-camera" /> Photo / Video
                  </label>
                  <input
                    type="file"
                    name="photoEvent"
                    className="photoEvent"
                    id="photoEvent"
                    onChange={uploadImageEvent}
                    accept="image/*"
                    multiple
                  />
                  <div id="imgBAdd" className="imgBeforeAdd">
                    {renderImgEvent()}
                  </div>
                </div>
                <form method="post" className="c-form">
                  <h6 className="event-name"> Tên sự kiện</h6>
                  <input
                    name="name"
                    type="text"
                    placeholder="Tên sự kiện"
                    {...register("name", {
                      required: "Nhập tên sự kiện ",
                    })}
                    onChange={onChange}
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message}</p>
                  )}
                  <h6 className="event-name"> Mô tả </h6>
                  <input
                    name="description"
                    type="text"
                    placeholder="Mô tả"
                    {...register("description", {
                      required: "Nhập mô tả ",
                    })}
                    onChange={onChange}
                  />
                  {errors.description && (
                    <p className="error">{errors.description.message}</p>
                  )}
                  <div className="datetime">
                    <div className="date">
                      <h6 className="event-name"> Ngày bắt đầu</h6>
                      <input name="startDate" type="date" onChange={onChange} />
                      <p className="error">{errorStart}</p>
                    </div>
                    <div className="time">
                      <div>
                        <h6 className="event-name"> Nhập giờ</h6>
                        <input
                          name="hourStart"
                          type="number"
                          placeholder="Giờ"
                          {...register("hourStart", {
                            max: {
                              value: 24,
                              message: "Giờ trong khoảng 0-24h ",
                            },
                            min: {
                              value: 0,
                              message: "Giờ trong khoảng 0-24h ",
                            },
                            required: "Nhập giờ ",
                          })}
                          onChange={onChange}
                        />
                        {errors.hourStart && (
                          <p className="error">{errors.hourStart.message}</p>
                        )}
                      </div>
                      <div>
                        <h6 className="event-name"> Nhập phút</h6>
                        <input
                          name="minuteStart"
                          type="number"
                          placeholder="Phút"
                          {...register("minuteStart", {
                            max: {
                              value: 60,
                              message: "Phút trong khoảng 0-60 phút ",
                            },
                            min: {
                              value: 0,
                              message: "Giờ trong khoảng 0-60 phút ",
                            },
                          })}
                          onChange={onChange}
                        />
                        {errors.minuteStart && (
                          <p className="error">{errors.minuteStart.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="datetime">
                    <div className="date">
                      <h6 className="event-name"> Ngày kết thúc</h6>
                      <input name="endDate" type="date" onChange={onChange} />
                      <p className="error">{errorEnd}</p>
                    </div>
                    <div className="time">
                      <div>
                        <h6 className="event-name"> Nhập giờ</h6>
                        <input
                          name="hourEnd"
                          type="number"
                          placeholder="Giờ"
                          {...register("hourEnd", {
                            max: {
                              value: 24,
                              message: "Giờ trong khoảng 0-24h ",
                            },
                            min: {
                              value: 0,
                              message: "Giờ trong khoảng 0-24h ",
                            },
                            required: "Nhập giờ ",
                          })}
                          onChange={onChange}
                        />
                        {errors.hourEnd && (
                          <p className="error">{errors.hourEnd.message}</p>
                        )}
                      </div>
                      <div>
                        <h6 className="event-name"> Nhập phút</h6>
                        <input
                          name="minuteEnd"
                          type="number"
                          placeholder="Phút"
                          {...register("minuteEnd", {
                            max: {
                              value: 60,
                              message: "Phút trong khoảng 0-60 phút ",
                            },
                            min: {
                              value: 0,
                              message: "Phút trong khoảng 0-60 phút ",
                            },
                          })}
                          onChange={onChange}
                        />
                        {errors.minuteEnd && (
                          <p className="error">{errors.minuteEnd.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="activity">
                    <h6 className="event-name"> Hoạt động sự kiện</h6>
                    <div className="activity-input">
                      <input
                        name="activity"
                        type="text"
                        placeholder="Hoạt động"
                        onChange={onChange}
                        value={formEvent.activity}
                      />
                      <span
                        className="add-activity"
                        name="add"
                        onClick={(e) => {
                          if (formEvent.activity != "") {
                            const listActivity = activityEvent;
                            listActivity.push(formEvent.activity);
                            setActivityEvent(listActivity);
                            onChange(e);
                            setFormEvent({ ...formEvent, activity: "" });
                          }
                        }}
                      >
                        Thêm
                      </span>
                    </div>
                    <p className="error">{activityError}</p>
                    <div className="activity-item">
                      {/* {RenderActivity()} */}
                      {activityEvent.map((item, index) => {
                        return (
                          <RenderActivity
                            key={item}
                            item={item}
                            index={index}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <h6 className="event-name"> Giá vé</h6>
                  <input
                    name="ticketPrice"
                    type="number"
                    placeholder="Giá vé"
                    onChange={onChange}
                  />

                  <button
                    type="submit"
                    onClick={handleSubmit(createEvent)}
                    className="main-btn"
                  >
                    Tạo
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
        <div id="post-new" className="post-new-popup">
          <div className="popup" style={{ width: "800px" }}>
            <span
              onClick={() => {
                var element = document.getElementById("post-new");
                setimgNotSave([]);
                element.classList.remove("active");
                document.getElementById("emojionearea1").value = "";
                setUpdateAPost({});
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
                    Đăng Bài
                  </p>
                </h5>
              </div>
              <div className="post-new">
                <div className="post-newmeta">
                  <ul className="post-categoroes">
                    <li>
                      <label class="lablePhoto" for="upload-photo">
                        <i className="icofont-camera" /> Hình Ảnh
                      </label>
                      <input
                        type="file"
                        name="photo"
                        id="upload-photo"
                        onChange={uploadImage}
                        accept="image/*"
                        multiple
                      />
                    </li>
                  </ul>
                  <div id="imgBAdd" className="imgBeforeAdd">
                    {renderImg()}
                  </div>
                </div>
                <form onSubmit={handleSubmitPost} className="c-form">
                  <textarea
                    id="emojionearea1"
                    placeholder="Bạn đang nghĩ gì?"
                    defaultValue={""}
                    style={{
                      height: 300,
                    }}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="main-btn">
                    Đăng bài
                  </button>
                </form>
              </div>
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
                  onClick={() => deletePost()}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="delete-comment" className="post-new-popup-delete">
          <div className="popup" style={{ width: "800px" }}>
            <span
              onClick={() => {
                var element = document.getElementById("delete-comment");
                element.classList.remove("active");
                setDeleteComment(-1);
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
                    Bạn có chắn muốn xóa bình luận này ?
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
                    var element = document.getElementById("delete-comment");
                    element.classList.remove("active");
                    setDeleteComment(-1);
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
                  onClick={() => deleteComment()}
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
        {/* share post */}
      </div>
    </div>
  );
}

export default GroupDetails;
