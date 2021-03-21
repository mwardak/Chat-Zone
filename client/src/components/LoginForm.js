import React from "react";
import axios from "axios";
import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({}) => {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send http reqeuest to server wit pasword/email to check and validate
    const authenticateUser = await axios.post("/api/loginform", {email: emailInputRef.current.value});

  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email..."
          ref={emailInputRef}
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password..."
          ref={passwordInputRef}
        ></input>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
