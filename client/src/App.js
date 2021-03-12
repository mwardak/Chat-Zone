import Style from "./Style.css";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  let isLoggedIn = false;

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route path="/chat" component={ChatPage} />
        ) : (
          <Route path="/" component={LoginForm} />
        )}
      </Switch>
    </Router>
  );
};
export default App;
