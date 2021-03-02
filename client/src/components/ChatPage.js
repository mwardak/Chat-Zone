
import React from "react";
import Users from "./components/Users";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatPage = ({  }) => {
  return (



<div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="container d-flex justify-content-center">
              <Users users={users} />
              <Messages messages={messages} />
            </div>

            <div className="container d-flex justify-content-center">
              <InputMessage
                handleSubmit={handleSubmit}
                textInputRef={textInputRef}
              />
            </div>
          </div>
        </div>
  )};

  export default ChatPage;