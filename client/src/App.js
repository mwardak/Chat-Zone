
import Style from "./Style.css";
import LoginForm from "./components/LoginForm";
import ChatPage from "./components/ChatPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginForm} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
    </Router>
  );
};
export default App;
