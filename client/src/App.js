import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import Register from "./components/Register";

const App = () => {
  let isLoggedIn = false;

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route path="/chat" component={ChatPage} />
        ) : (
          <div>
          <Route path="/" component={LoginForm} />
          <Route path="/" component={Register} />
          </div>
        )}
      </Switch>
    </Router>
  );
};
export default App;
