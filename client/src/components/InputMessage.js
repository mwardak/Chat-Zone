import React from "react";

const InputMessage = ({textInputRef,handleSubmit}) => {
  return (
    <div className="row">
      <form className="text-center" onSubmit={handleSubmit}>
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
  );
};

export default InputMessage;


