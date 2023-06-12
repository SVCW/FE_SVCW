import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
function EventLoad(props) {
  const initialState = {
    name: "",
    img: "",
  };
  const userInfo = useSelector((state) => state.userReducer.user);
  const [donateComplete, setDonateComplete] = useState(false);
  const [imageEvent, setImageEvent] = useState([]);
  const [feedBackInEvent, setFeedBackInEvent] = useState([]);
  const [idUpdate, setIdUpdate] = useState(-1);
  const formatDate = (date) => {
    const dayTime = date.split("T");
    const day = dayTime[0].split("-").reverse();
    const time = dayTime[1].split(":");
    return `${day[0]}/${day[1]}/${day[2]} ${time[0]} giờ, ${time[1]} phút`;
  };
  const [priceToPayPal, isPriceToPalPal] = useState(
    (props.props.ticketPrice / 23000).toFixed(2)
  );
  const [profile, setProfile] = useState(initialState);

  const saveDonationInDb = async (data) => {
    try {
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/donates",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        await createAlumniInEvent();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const createAlumniInEvent = async () => {
    try {
      const data = {
        eventId: props.props.id,
        alumniId: userInfo.Id,
      };
      const response = await axios.post(
        "https://truongxuaapp.online/api/v1/eventinalumni",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        setDonateComplete(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getProfile = async (alumniCreatedId) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${alumniCreatedId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      initialState.name = response.data.name;
      initialState.img = response.data.img;
    } catch (error) {
      console.log(error);
    }
  };

  const getImageEvent = async (eventId) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/events/${eventId}/images`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      setImageEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFeedbackByEventId = async (eventID) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/events/${eventID}/feedbacks`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.length > 0) {
          let feedback = response.data;
          for (let i = 0; i < feedback.length; i++) {
            feedback[i].status = true;
            const profileAlum = await getProfileinComment(feedback[i].alumniId);
            feedback[i].profile = profileAlum;
          }
          setFeedBackInEvent(feedback);
        } else {
          setFeedBackInEvent(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getProfileinComment = async (alumId) => {
    try {
      const response = await axios.get(
        `https://truongxuaapp.online/api/v1/alumni/${alumId}`,
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
  const renderFeedBack = () => {
    return feedBackInEvent.map((element, index) => {
      if (element.status != undefined && element.status == true) {
        return (
          <li key={index}>
            <figure>
              <img
                style={{
                  width: 25,
                  height: 25,
                }}
                alt=""
                src={element.profile.img}
              />
            </figure>
            <div className="commenter">
              <h5>
                <a title href="#">
                  {element.profile.name}
                </a>
              </h5>
              <span>2 hours ago</span>
              <p>{element.content}</p>

              {element.profile.id == userInfo.Id ? (
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
                    <li
                      style={{ margin: 0 }}
                      onClick={() => {
                        //updateFeedback(element.id)
                        const newFeedback = [...feedBackInEvent];
                        newFeedback[index].status = false;
                        document.getElementById(props.props.id).value =
                          newFeedback[index].content;
                        setFeedBackInEvent(newFeedback);
                        setIdUpdate(element.id);
                      }}
                    >
                      <i className="icofont-pen-alt-1" />
                      Chỉnh sửa bình luận
                      <span>Edit This Post within a Hour</span>
                    </li>

                    <li
                      style={{ margin: 0 }}
                      onClick={() => {
                        deleteFeedback(element.id);
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
  const handelSubmit = async (e) => {
    e.preventDefault();
    await createFeedBack(props.props.id);
  };

  const updateFeedback = async (idComment) => {
    try {
      const data = {
        eventId: props.props.id,
        rateStart: 5,
        content: document.getElementById(props.props.id).value,
      };
      const response = await axios.put(
        `https://truongxuaapp.online/api/v1/feedbacks?id=${idComment}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        document.getElementById(props.props.id).value = "";
        await getFeedbackByEventId(props.props.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createFeedBack = async (id) => {
    try {
      const data = {
        eventId: id,
        rateStart: 5,
        content: document.getElementById(id).value,
        alumniId: userInfo.Id,
      };
      const response =
        idUpdate == -1
          ? await axios.post(
              "https://truongxuaapp.online/api/v1/feedbacks",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            )
          : await axios.put(
              `https://truongxuaapp.online/api/v1/feedbacks?id=${idUpdate}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.author,
                },
              }
            );
      if (response.status === 200) {
        document.getElementById(id).value = "";
        setIdUpdate(-1);
        await getFeedbackByEventId(props.props.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editFeedback = async (id) => {
    try {
      const data = {
        eventId: 0,
        rateStart: 0,
        content: "string",
      };
      const response = await axios.put(
        `https://truongxuaapp.online/api/v1/feedbacks?id=${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        //await getFeedBackInEvent(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      const response = await axios.delete(
        `https://truongxuaapp.online/api/v1/feedbacks/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userInfo.author,
          },
        }
      );
      if (response.status === 200) {
        await getFeedbackByEventId(props.props.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await getProfile(props.props.alumniCreatedId);
    await getImageEvent(props.props.id);
    await getFeedbackByEventId(props.props.id);
  }, []);

  return (
    <div className="main-wraper">
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
                  fill="#82828e"
                  stroke="#82828e"
                  d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
                />
              </svg>
            </em>
            <img alt="" src="images/resources/user2.jpg" />
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
                  <li>
                    <i className="icofont-pen-alt-1" />
                    Edit Post
                    <span>Edit This Post within a Hour</span>
                  </li>
                  <li>
                    <i className="icofont-ban" />
                    Hide Post
                    <span>Hide This Post</span>
                  </li>
                  <li>
                    <i className="icofont-ui-delete" />
                    Delete Post
                    <span>If inappropriate Post By Mistake</span>
                  </li>
                  <li>
                    <i className="icofont-flag" />
                    Report
                    <span>Inappropriate content</span>
                  </li>
                </ul>
              </div>
            </div>
            <ins>
              <a title href="time-line.html">
                {profile.name}
              </a>{" "}
              Người tạo
            </ins>
            <span>
              <i className="icofont-globe" /> phát hành :
              {formatDate(props.props.createAt)}
            </span>
          </div>
          <div className="post-meta">
            <figure className="premium-post">
              <img
                src={imageEvent.length > 0 ? imageEvent[0].imageUrl : ""}
                alt=""
              />
            </figure>
            <div className="premium">
              <a href="book-detail.html" className="post-title">
                {props.props.name}
              </a>
              <p>{props.description}</p>
              <p>
                Thời gian bắt đầu:
                {formatDate(props.props.startDate)}
              </p>
              <p>
                Thời gian kết thúc:
                {formatDate(props.props.endDate)}
              </p>
              <p>{props.props.ticketPrice}đ</p>
              {props.props.ticketPrice > 0 &&
              !props.props.statusDonate &&
              !donateComplete ? (
                <PayPalButton
                  amount={props.props.ticketPrice}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) => {
                    saveDonationInDb({
                      eventId: props.props.id,
                      alumniId: userInfo.Id,
                      dateDonante: new Date(),
                      paymentMethod: "Paypal",
                      amount: props.props.ticketPrice,
                    });

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderId: data.orderID,
                      }),
                    });
                  }}
                  options={{
                    clientId:
                      "AQcrdEu0mdkLrgpuAJ-sOCxqHcxTijxDi2DKptqPZVXnkAAcpzZeq9cFWJyP7mQ4TYzcEeZpS_AriCIx",
                  }}
                />
              ) : // <PayPalButton
              //   amount={(props.props.ticketPrice / 23000).toFixed(2)}
              //   // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              //   onSuccess={(details, data) => {
              //     saveDonationInDb({
              //       eventId: props.props.id,
              //       alumniId: userInfo.Id,
              //       dateDonante: new Date(),
              //       paymentMethod: "Paypal",
              //       amount: props.props.ticketPrice,
              //     });
              //     // OPTIONAL: Call your server to save the transaction
              //     return fetch("/paypal-transaction-complete", {
              //       method: "post",
              //       body: JSON.stringify({
              //         orderID: data.orderID,
              //       }),
              //     });
              //   }}
              // />
              !donateComplete && !props.props.statusDonate ? (
                <a
                  onClick={() => createAlumniInEvent()}
                  className="main-btn "
                  title
                  style={{
                    cursor: "default",
                  }}
                >
                  Tham gia
                </a>
              ) : (
                <a
                  className="main-btn purchase-btn"
                  title
                  style={{
                    cursor: "default",
                  }}
                >
                  <i class="icofont-verification-check" /> Đã Tham gia
                </a>
              )}
            </div>
            <div className="we-video-info">
              <Link to={`eventDetail?id=${props.props.id}`}>
                <a
                  href="#"
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: 10,
                    marginTop: 10,
                    display: "block",
                    textAlign: "center",
                    borderRadius: 20,
                  }}
                >
                  Xem chi tiết
                </a>
              </Link>
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
                      <img alt="" src="images/smiles/weep.png" /> Dislike
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
              <div className="new-comment" style={{ display: "block" }}>
                <form
                  style={{
                    display:
                      !donateComplete && !props.props.statusDonate
                        ? "none"
                        : "block",
                  }}
                  onSubmit={handelSubmit}
                  method="post"
                >
                  <input
                    id={props.props.id}
                    type="text"
                    placeholder="Cảm nhận về Event"
                  />
                  <button type="submit">
                    <i className="icofont-paper-plane" />
                  </button>
                </form>
                <div className="comments-area">
                  <ul>{renderFeedBack()}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventLoad;
