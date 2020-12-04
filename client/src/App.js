
import React, { useState, useRef } from "react";
import Users from "./components/Users";
import TypeMessage from "./components/TypeMessage";
import ChatScreen from "./components/ChatScreen";
import Style from "./Style.css";
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
  // const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  let textInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([
      {text: textInputRef.current.value, username: "Maher" },
    ]);
    textInputRef.current.value = "";
  };

  const chatMessages = messages.map(chat => {
    return (
      <p>
        {chat.text}({chat.username})
      </p>
    );
  });

  return (
    <div className="container">
      <div className="user">USERS</div>
      <div className="row">
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="chatscreen">{chatMessages}</div>
          <input
            ref={textInputRef}
            type="text"
            required
            className="input"
            placeholder="Write a message..."
          ></input>
          <button>SEND</button>
        </form>
      </div>
    </div>
  );

  //

  // return (
  //   <div className="container">
  //     <Users/>
  //     <TypeMessage/>
  //     <ChatScreen/>
  //   </div>
  // );
};
export default App;
