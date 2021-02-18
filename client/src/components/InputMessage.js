import React from "react";


const InputMessage = ({ textInputRef, handleSubmit }) => {
  return (
    <div className="row">
      <form className="text-center" onSubmit={handleSubmit}>
        <input
          className="publisher-input"
          type="text"
          ref={textInputRef}
          required
          className="input"
          placeholder="Write a message..."
        ></input>{" "}
        <a className="publisher-btn text-info" href="#" data-abc="true">
          <button>SEND</button>
          <i className="fa fa-paper-plane"></i>
        </a>
      </form>
    </div>
  );
};

export default InputMessage;
