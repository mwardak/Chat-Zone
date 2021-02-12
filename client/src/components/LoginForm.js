import React from "react";

const Login = () => {
  return (
    <form>
      <div className="form-inner">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="email..."
          required
        ></input>
        <input
          type="password"
          name="password "
          placeholder="password..."
          required
        ></input>
      </div>
    </form>
  );
};

export default Login;