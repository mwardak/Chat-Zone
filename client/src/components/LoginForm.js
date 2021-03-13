import React from "react";
import React, { useState, useRef, useEffect }  from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({  }) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  let textInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail([{ email: textInputRef.current.value}]);
    textInputRef.current.value = "";

  return (
    <form className="container">
      <div className="form-group">
        <label>Email Address</label>
        <input
          handleSubmit={handleSubmit}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email..."
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password..."
        ></input>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
