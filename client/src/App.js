import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import Register from "./components/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("userId"))
  );

  return (
    <Router>
      <Switch>
        <Route
          path="/chat"
          render={() => {
            return isLoggedIn ? (
              <ChatPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />

        <Route
          exact
          path="/"
          render={() => {
            return isLoggedIn ? (
              <Redirect to="/chat" />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            );
          }}
        />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};
export default App;
