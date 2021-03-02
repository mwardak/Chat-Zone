import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({  }) => {
  return (
    <form>
      <div className="form-group">
        <label>Email Address</label>
        <input
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
