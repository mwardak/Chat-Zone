import React from "react";

const InputMessage = ({ textInputRef, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="publisher bt-1 border-light">
        {" "}
        <input
          ref={textInputRef}
          type="text"
          required
          className="publisher-input"
          placeholder="Write a message..."
        ></input>{" "}
        <a className="publisher-btn text-info" href="#" data-abc="true">
          <button>SEND</button>
          <i className="fa fa-paper-plane"></i>
        </a>
      </div>
    </form>
  );
};

export default InputMessage;
