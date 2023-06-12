import React, { useEffect, useRef, useState } from "react";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { useSelector } from "react-redux";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

//const firestore = firebase.firestore();

export default function Chat(props) {
  const [user] = useAuthState(firebase.auth());
  //console.log(props.idUser);
  return (
    <div className="App">
      <section>
        {" "}
        <ChatRoom userId={props.idUser} />
      </section>
      <section>
        <TestChatRoom userId={props.idUser} />
      </section>
    </div>
  );
}

function ChatRoom(props) {
  const userInfo = useSelector((state) => state.userReducer.user);
  const dummy = useRef();
  const chats =
    props.userId > userInfo.Id
      ? userInfo.Id + "-" + props.userId
      : props.userId + "-" + userInfo.Id;
  const messagesRef = firebase
    .firestore()
    .collection("chats")
    .doc(chats)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main
        style={{
          width: 800,
          height: 400,
          overflowY: "scroll",
        }}
      >
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>
    </>
  );
}
function ChatMessage(props) {
  const { text, photoURL, uid, user, createdAt } = props.message;
  const userInfo = useSelector((state) => state.userReducer.user);
  const messageClass =
    uid === firebase.auth().currentUser.uid ? "sent" : "received";

  return (
    <>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          width: "100%",
          paddingRight: 10,
          alignItems: "center",
          justifyContent:
            user.sentBy == userInfo.infoDetail.id ? "right" : "left",
        }}
        className={`message ${messageClass}`}
      >
        {user.sentBy == userInfo.infoDetail.id ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                marginRight: 10,
                marginTop: 20,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                color: "white",
                backgroundColor: "#3E4042",
                borderRadius: 10,
                fontWeight: "500",
              }}
            >
              {text}
              <p
                style={{
                  color: "white",
                }}
              >
                {createdAt.toDate().getDate() +
                  "/" +
                  createdAt.toDate().getMonth() +
                  "/" +
                  createdAt.toDate().getFullYear() +
                  " " +
                  createdAt.toDate().getHours() +
                  " Giờ, " +
                  createdAt.toDate().getMinutes() +
                  " Phút"}
              </p>
            </p>
            <img
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
              src={photoURL}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
              src={photoURL}
            />
            <p
              style={{
                marginTop: 20,
                marginRight: 10,
                marginTop: 20,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                color: "white",
                backgroundColor: "#3E4042",
                borderRadius: 10,
                fontWeight: "500",
              }}
            >
              {text}
              <p
                style={{
                  color: "white",
                }}
              >
                {createdAt.toDate().getDate() +
                  "/" +
                  createdAt.toDate().getMonth() +
                  "/" +
                  createdAt.toDate().getFullYear() +
                  " " +
                  createdAt.toDate().getHours() +
                  " Giờ, " +
                  createdAt.toDate().getMinutes() +
                  " Phút"}
              </p>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function TestChatRoom(props) {
  const messagesRef = firebase.firestore().collection("chats");
  const userInfo = useSelector((state) => state.userReducer.user);
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    for (let i = 0; i < document.getElementsByClassName("post").length; i++) {
      document.getElementsByClassName("post")[i].style.display = "none";
    }
    const { uid } = firebase.auth().currentUser;
    const chats =
      props.userId > userInfo.Id
        ? userInfo.Id + "-" + props.userId
        : props.userId + "-" + userInfo.Id;
    console.log(props.userId);
    await messagesRef
      .doc(chats)
      .collection("messages")
      .add({
        text: formValue,
        createdAt: new Date(),
        uid,
        photoURL: userInfo.infoDetail.img,
        user: {
          _id: userInfo.infoDetail.email,
          avatar: userInfo.infoDetail.img,
          name: userInfo.infoDetail.name,
          sentBy: userInfo.infoDetail.id,
          sentTo: props.userId,
        },
      });

    setFormValue("");
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Aa"
          style={{
            borderRadius: 5,
            width: "95%",
            height: 40,
            marginTop: 20,
            paddingLeft: 10,
          }}
        />

        <button
          style={{
            height: 40,
          }}
          type="submit"
          disabled={!formValue}
        >
          🕊️
        </button>
      </form>
    </>
  );
}
