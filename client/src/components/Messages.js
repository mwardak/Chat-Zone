import React from "react";



const Messages = ({ messages }) => {
  const chatMessages = messages.map((chat) => {
    return <p>{chat.text}</p>;
  });

  return <div className="chatscreen">{chatMessages}</div>;
};

export default Messages;
