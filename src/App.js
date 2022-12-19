import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Container from "./components/container/Container";
import Chart from "./components/chart/Chart";
import Routes from "./Routes";

function App() {
  return (
    <div className="container-fluid ">
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            PostGram
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/users">My Profile</a>
            </li>
            <li>
              <a href="/myinbox">Messages</a>
            </li>
            <li>
              <a href="/addpost">Create post</a>
            </li>
            <li>
              <a href="/">Search profile</a>
            </li>
            <li>
              <a href="/chart">Charts</a>
            </li>
            <li>
              <a href="/whiteboard">White board</a>
            </li>
            <li>
              {localStorage.getItem("jwt") !== "" && (
                <a href="/logout">Log out</a>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="row">
        <Routes />
      </div>
    </div>
  );
}

export default App;
