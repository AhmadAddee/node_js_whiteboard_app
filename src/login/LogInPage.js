import { useState } from "react";
import { useHistory } from "react-router-dom";
//import jwt_decode from "jwt-decode";
import AuthService from "../services/auth-service";

function LogInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  localStorage.setItem("messageReceiver", "");

  const onLogInClicked = (e) => {
    e.preventDefault();

    AuthService.login(username, password)
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        if (errorMessage !== null) {
          history.push("/");
          window.location.reload();
        } else {
          setErrorMessage("Something went bananas, try again!");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      });
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
              Log In 👈
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
