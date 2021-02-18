import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Messages = ({ messages }) => {
  const chatMessages = messages.map((chat) => {
    return <p>{chat.text}</p>;
  });

  return (
  <div className="col-md-6 pl-0">
    <div className="card card-bordered">
      <div className="card-header">
        <h4 className="card-title">
          <strong>Chat</strong>
        </h4>
      </div>

      <div
        className="ps-container ps-theme-default ps-active-y"
        id="chat-content"
        style={{
          overflow: "scroll !important",
          height: "400px !important",
        }}
      >
        <div className="media media-chat">
          <div className="media-body">
            <p>{chatMessages}</p>

            <p className="meta"></p>
          </div>
        </div>

        <div className="media media-chat media-chat-reverse">
          <div className="media-body">
            <p></p>
            <p className="meta"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )};

export default Messages;
