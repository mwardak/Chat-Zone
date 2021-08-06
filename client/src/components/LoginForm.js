import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({setIsLoggedIn}) => {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send http reqeuest to server with email & password to check and validate on the server
    const loginBody = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    const loginResponse = await axios.post("/api/loginform", loginBody);
    

    // store a response from the http request below in variable called response
    const user = loginResponse.data;
    console.log(user);

   
    // store userID in local storage
    localStorage.setItem("userId", JSON.stringify(user));
    const result = localStorage.getItem("userId");
    JSON.parse(result);

    //if user is logged in and exists in database, redirect to chatpage
    if (loginResponse.status === 200) {
      // redirect to chatpage
      setIsLoggedIn(true);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
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
      <p>
        Don't have an account? <Link to="/register">REGISTER</Link>
      </p>
    </form>
  );
};

export default LoginForm;
