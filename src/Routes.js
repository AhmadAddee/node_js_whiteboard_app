import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUser from "./components/AddUser";
import LogInPage from "./login/LogInPage";
import Post from "./components/Post";
import PrivateRoute from "./authentication/PrivateRoute";
import { useState } from "react";
import Profile from "./components/Profile";
import AddPost from "./components/AddPost";
import User from "./components/User";
import LogOutPage from "./login/Logout";
import Messages from "./components/Messages";
import Container from "./components/container/Container";
import Chart from "./components/chart/Chart";

function Routes() {
  const [profileUser, setProfileUser] = useState("");
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <Post profile={profileUser} setProfile={setProfileUser} />
        </PrivateRoute>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/signup">
          <AddUser />
        </Route>
        <Route path="/profile">
          <Profile state="" />
        </Route>
        <PrivateRoute path="/addpost">
          <AddPost />
        </PrivateRoute>
        <PrivateRoute path="/users">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/logout">
          <LogOutPage />
        </PrivateRoute>
        <PrivateRoute path="/myinbox">
          <Messages />
        </PrivateRoute>
        <PrivateRoute path="/whiteboard" exact>
          <Container />
        </PrivateRoute>
        <PrivateRoute path="/chart">
          <Chart />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default Routes;
