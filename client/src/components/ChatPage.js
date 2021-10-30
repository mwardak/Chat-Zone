import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Users from "./Users";
import Messages from "./Messages";
import InputMessage from "./InputMessage";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";

const ChatPage = ({ setIsLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const socket = io();

  // useEffect(() => {
  //  console.log(users)
  // }, [users]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("receive-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("login", ({ activeUsers }) => {
      setUsers(activeUsers);
    });

    socket.on("logout", ({ activeUsers }) => {
      setUsers(activeUsers);
    });

    fetchUser();
    fetchMessage();
  }, []);

  const fetchUser = async () => {
    //create a header with  token from local storage to send to server
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const userResponse = await axios.get("/api/users/active", config);
    setUsers(userResponse.data.rows);
  };

  const fetchMessage = async () => {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const messageResponse1 = await axios.get("/api/messages", config);

    setMessages(messageResponse1.data);
  };

  // logout user from local storage

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      //get logged in user's email from local staorage
      const userEmail = localStorage.getItem("email");

      //send email to the server to logout user
      const response = await axios.post("/api/logout", { userEmail });

      //if the response is successfull, remove the token from local storage and set isLoggedIn to false
      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let textInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textInputRef.current.value;
    const token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    //get the correct firstname from token and add to message below

    const message = {
      text,
      id: decoded.userId,
      userName: decoded.firstName,
    };

    console.log(message);
    axios.post("/api/messages", message).then(() => {
      // setMessages([...messages, message]);
    });

    socket.emit("chatMessage", message);
    textInputRef.current.value = "";
  };

  return (
    <div className="page-content page-container" id="page-content">
      <div className="container d-flex justify-content-left">
        <button className="btn btn-success" onClick={logoutUser}>
          logout
        </button>
      </div>

      <div className="padding">
        <div className="container d-flex justify-content-center">
          <Users users={users} />
          <Messages
            setIsLoggedIn={setIsLoggedIn}
            messages={messages}
            users={users}
          />
        </div>

        <div className="container d-flex justify-content-center">
          <InputMessage
            textInputRef={textInputRef}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
