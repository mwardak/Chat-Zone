import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Style from "./Style.css";
import Users from "./components/Users";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";

const App = () => {
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const fetchUser = async () => {
    const userResponse1 = await axios.get("/api/users");

    setUsers(userResponse1.data);
  };

  const fetchMessage = async () => {
    const messageResponse1 = await axios.get("/api/messages");

    setMessages(messageResponse1.data);
  };

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
<Container>
<Users users={users} />
  <div className="page-content page-container" id="page-content">
    <div className="padding">
      <div className="container d-flex justify-content-center">
        <div
          className="ps-container ps-theme-default ps-active-y"
          id="chat-content"
          style={{
            overflow: "scroll !important",
            height: "400px !important",
          }}
        >
          
          <Messages messages={messages} />
          <InputMessage
            handleSubmit={handleSubmit}
            textInputRef={textInputRef}
          />
          <div className="media media-chat">
            <div className="media-body">
              <p className="meta"></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="ps-scrollbar-x-rail" style={{ left: "0px", bottom: "0px" }}>
      <div
        className="ps-scrollbar-x"
        tabIndex="0"
        style={{ left: "0px", width: "0px" }}
      ></div>
    </div>
    <div
      className="ps-scrollbar-y-rail"
      style={{ top: "0px", height: "0px", right: "2px" }}
    >
      <div
        className="ps-scrollbar-y"
        tabIndex="0"
        style={{ top: "0px", height: "2px" }}
      ></div>
    </div>
  </div>
</Container>
)};


export default App;