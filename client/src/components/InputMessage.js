import React from "react";

const InputMessage = ({ textInputRef, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="publisher bt-1 border-light">
        {" "}
        <input
          style={{
            width: 419,
            borderRadius: 5,
            marginTop: 2,
            borderBlockColor: "darkgray",
          }}
          ref={textInputRef}
          type="text"
          required
          className="publisher-input"
          placeholder="Write a message..."
        ></input>{" "}
        <a className="publisher-btn text-info" href="#" data-abc="true">
          <button style={{ borderRadius: 5 }}>SEND</button>
        </a>
      </div>
    </form>
  );
};

export default InputMessage;
