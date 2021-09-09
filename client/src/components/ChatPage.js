import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Users from "./Users";
import Messages from "./Messages";
import InputMessage from "./InputMessage";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatPage = ({ setIsLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const socket = io();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect", socket.id)
    });
    socket.on("receive-message", (message) => {
      setMessages((messages) => [...messages, message]);
    } );
    socket.on("receive-users", (users) => {
      setUsers(users);
    });
    fetchUser();
    fetchMessage();
  }, []);

  const fetchUser = async () => {
    const userResponse1 = await axios.get("/api/users");

    setUsers(userResponse1.data);
  };

  const fetchMessage = async () => {
    const messageResponse1 = await axios.get("/api/messages");
    
    setMessages(messageResponse1.data);
  };

  // logout user from local storage

  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  

  let textInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textInputRef.current.value;
    const user = JSON.parse(localStorage.getItem("userId"));
    
    
    
    const message = {
      id: user.id,
      text: text 
    };

    

    axios.post("/api/messages", message).then(() => {
    // setMessages([...messages, message]);
    });
    

    // Emit message to server
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
          <Messages messages={messages} />
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
