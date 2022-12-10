import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../authentication/useToken";

function LogInPage() {
  const [token, setToken] = useToken("");

  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  localStorage.setItem("messageReceiver", "");
  const history = useHistory();

  const onLogInClicked = async () => {
    const response = await axios.post("http://localhost:8080/user/login", {
      username: username,
      password: password,
    });

    setToken(response.data.username);
    console.log("from login page, response.data.username and token");
    console.log(response.data.username);
    console.log(token);

    if (
      response.data.username === username &&
      response.data.password === password
    ) {
      history.push("/");
      setErrorMessage("Successfully logged in!");
      window.location.reload();
    } else {
      setErrorMessage("Something went bananas, try again!");
    }
  };

  return (
    <div className="row">
      <form className="col s12">
        <h1>Log In</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <div className="row">
          <div className="input-field col s6">
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@your-email.com"
            />
          </div>
          <div className="input-field col s6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <hr />
          <div className="row center-align">
            <button
              className="btn waves-effect waves-light"
              disabled={username && password ? false : true}
              onClick={onLogInClicked}
            >
              Log In
              <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="row center-align">
            <button className="btn waves-effect waves-light" disabled={true}>
              Forgot your password? <i className="material-icons right">send</i>{" "}
            </button>
          </div>
          <div className="row center-align">
            <button
              onClick={() => {
                history.push("/signup");
                window.location.reload();
              }}
              className="btn waves-effect waves-light"
            >
              <i className="material-icons right">send</i>
              Don't have an acount? Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogInPage;
