import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Style from "./Style.css";
import Users from "./components/Users";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// import {
//   Container,
//   Col,
//   Row,
//   InputGroup,
//   Button,
//   Form,
//   FormControl,
// } from "react-bootstrap";

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
    <Router>
      <Switch>
        <Route path="/" component={LoginForm} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
    </Router>
  );
};
export default App;
