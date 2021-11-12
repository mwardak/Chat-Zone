import React, { useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chatzone from "../images/chatzone.png";

// import jwt_decode from "jwt-decode";

const LoginForm = ({ setIsLoggedIn }) => {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send http reqeuest to server with email & password to check and validate on the server
    const loginBody = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    const loginResponse = await axios.post("/api/loginform", loginBody);
    //if status is 400 return alert
    if (loginResponse.status === 400) {
      alert("Login failed. Please register.");
    }

    // store a response from the http request below in variable called response
    const user = loginResponse.data.token;

    // store userID in local  storage
    localStorage.setItem("token", user);

    //store email in local storage
    localStorage.setItem("email", loginResponse.data.email);

    //if user is logged in and exists in database, redirect to chatpage
    if (loginResponse.status === 200) {
      // redirect to chatpage
      setIsLoggedIn(true);
    }
  };

  return (
    <form
      className="container"
      style={{
        width: 400,
        marginTop: 100,
        border: "1px solid ",
        backgroundColor: "#cad5df",
        borderRadius: "5mm",
      }}
      onSubmit={handleSubmit}
    >
      <img
        src={chatzone}
        style={{
          width: 368,
          height: 180,
          alignContent: "initial",
          borderRadius: "5mm",
        }}
      />
      <div className="login-group" style={{ marginTop: 20 }}>
        <label>Email Address</label>
        <input
          required
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
          required
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
      {""}
      <p style={{ marginTop: 22 }}>
        Don't have an account? <Link to="/register">REGISTER</Link>
      </p>
    </form>
  );
};

export default LoginForm;
