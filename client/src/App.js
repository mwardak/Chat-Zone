import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Style from "./Style.css";
import Users from "./components/Users";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="page-content page-container" id="page-content">
    <div className="padding">
        <div className="row container d-flex justify-content-center">
            <div className="col-md-6">
                <div className="card card-bordered">
                    <div className="card-header">
                        <h4 className="card-title"><strong>Chat</strong></h4> <a className="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat App</a>
                    </div>
                    <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflow: "scroll !important", height:"400px !important"}}>
                        <div className="media media-chat"> 
                            <div className="media-body">
                                <p>Hi</p>
                                <p>How are you ...???</p>
                                <p>What are you doing tomorrow?<br></br> Can we come up a bar?</p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-meta-day">Today</div>
                        <div className="media media-chat media-chat-reverse">
                            <div className="media-body">
                                <p>Hiii, I'm good.</p>
                                <p>How are you doing?</p>
                                <p>Long time no see! Tomorrow office. will be free on sunday.</p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat"> 
                            <div className="media-body">
                                <p>Okay</p>
                                <p>We will go on sunday? </p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat media-chat-reverse">
                            <div className="media-body">
                                <p>That's awesome!</p>
                                <p>I will meet you Sandon Square sharp at 10 AM</p>
                                <p>Is that okay?</p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat"> 
                            <div className="media-body">
                                <p>Okay i will meet you on Sandon Square </p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat media-chat-reverse">
                            <div className="media-body">
                                <p>Do you have pictures of Matley Marriage?</p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat"> 
                            <div className="media-body">
                                <p>Sorry I don't have. i changed my phone.</p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="media media-chat media-chat-reverse">
                            <div className="media-body">
                                <p></p>
                                <p className="meta"></p>
                            </div>
                        </div>
                        <div className="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                            <div className="ps-scrollbar-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
                        </div>
                        <div className="ps-scrollbar-y-rail" style={{top: "0px", height: "0px", right: "2px"}}>
                            <div className="ps-scrollbar-y" tabIndex="0" style={{top: "0px", height: "2px"}}></div>
                        </div>
                    </div>
                    <div className="publisher bt-1 border-light"> <i className="fa fa-paper-plane"></i> </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
  );
};
export default App;
{/* // <Container>
    //   <Users users={users} />
    //   <Messages messages={messages} />
    //   <InputMessage handleSubmit={handleSubmit} textInputRef={textInputRef} />
    // </Container> */}