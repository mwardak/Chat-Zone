import React, { useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { json } from "express";

const Register = () => {
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  /**
     * if new user is registering send post request to database and insert email and password into table
     * when response comes back from databse store in variable and store in local storage
     * then redirect to login page
     */

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send http reqeuest to server with credentials below to insert into table

    const registerResponse = await axios.post("/api/loginform",
      { firstName: firstNameRef.current.value },
      { lastName: firstNameRef.current.value },
      { email: emailInputRef.current.value },
      { password: passwordInputRef.current.value }
  )};

    // store a response from the http request below in variable called response
    const user = registerResponse.data;

    


  
  return (
    <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>First Name</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email..."
          ref={firstNameRef}
        ></input>
      </div>
        <div className="form-group">
        <label>Last Name</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email..."
          ref={lastNameRef}
        ></input>
      </div>
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
      <p>
        Already have an account? <Link to="/login">LOGIN</Link>
      </p>
    </form>
  );
};

export default Register;
