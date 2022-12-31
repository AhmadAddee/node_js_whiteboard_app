import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="container-fluid ">
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            PostGram
          </a>
          {localStorage.getItem("jwt") && (
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
          )}
        </div>
      </nav>
      <div className="row">
        <Routes />
      </div>
    </div>
  );
}

export default App;
