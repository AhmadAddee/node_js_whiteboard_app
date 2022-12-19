import React, { Component } from "react";
import SingleUser from "./SingleUser";
import jwt_decode from "jwt-decode";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        fullName: "",
        postList: [],
        age: 0,
      },

      //username: jwt_decode(localStorage.getItem("jwt")).sub,
      //url: "user/get-user?username=" + this.username,
    };
  }

  componentDidMount() {
    var username = jwt_decode(localStorage.getItem("jwt")).sub;
    var url = "user/get-user?username=" + username;
    console.log(url);
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }));
  }

  render() {
    return (
      <div>
        <div>
          <SingleUser item={this.state.user} />
        </div>
      </div>
    );
  }
}
