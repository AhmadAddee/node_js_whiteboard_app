import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { useLocalState } from "../authentication/useLocalState";
import jwt_decode from "jwt-decode";
import AuthService from "../services/auth-service";

function LogInPage() {
  const [token, setToken] = useToken("", "");

  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");

  localStorage.setItem("messageReceiver", "");
  const history = useHistory();

  const onLogInClicked = (e) => {
    e.preventDefault();
    //async
    const reqBody = {
      username: username,
      password: password,
    };

    AuthService.login(username, password).then(
      (res) => setJwt(res.accessToken)
      //console.log(res.accessToken)
    );
    /*
    //const response = await axios.post
    fetch("http://localhost:8081/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        console.log(res);
        return res.status === 200
          ? Promise.all([res.json(), res.headers])
          : Promise.reject("invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        //setToken(headers.get("authorization"));
        console.log(headers.get("Authorization"));
        console.log(body);
      })

      /////////////////////////////////////////////////
      //.then(() => {
      //if (headers.get("authorization") !== null) {
      //console.log(jwt);
      //history.push("/");
      //setErrorMessage("Successfully logged in!");
      //window.location.reload();
      //} else {
      //setErrorMessage("Something went bananas, try again!");
      //}
      //})
      .catch((message) => {
        alert(message);
      });
    /*
    setToken(response.data.username);
    console.log("from login page, response.data.username and token");
    console.log(response.data.username);
    console.log(token);
*/
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
