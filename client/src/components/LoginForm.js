import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({ users }) => {
  return (
    <form>
      <div class="form-group">
        <label>Email Address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Email..."
        ></input>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password..."
        ></input>
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
