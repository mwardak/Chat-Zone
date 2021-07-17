import axios from "axios";
import React, { useState, useRef, useHistory, useEffect } from "react";
import Users from "./Users";
import Messages from "./Messages";
import InputMessage from "./InputMessage";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatPage = ({}) => {
  let history = useHistory();
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const [logout, setLogout] = useState(localStorage.getItem("logout"));
  

  const fetchUser = async () => {
    const userResponse1 = await axios.get("/api/users");

    // setUsers(userResponse1.data);
  };

  const fetchMessage = async () => {
    const messageResponse1 = await axios.get("/api/messages");

    // setMessages(messageResponse1.data);
  };

  // logout user from local storage
  
  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    history.push("/");
  }

  useEffect(() => {
    fetchUser();
    fetchMessage();
  }, []);

  let textInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([{ text: textInputRef.current.value, name: "Maher" }]);
    textInputRef.current.value = "";
  };
  return (
    <div className="page-content page-container" id="page-content">
      <div className="container d-flex justify-content-left">
        
        <button onClick={(e) => logoutUser(e)}>logout</button>

      </div>
      
      <div className="padding">
        <div className="container d-flex justify-content-center">
          <Users users={users} />
          <Messages messages={messages} />
        </div>

        <div className="container d-flex justify-content-center">
          <InputMessage handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
