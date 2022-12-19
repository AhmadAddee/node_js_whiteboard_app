import React, { Component } from "react";
import SingleMessage from "./SingleMessage";
import jwt_decode from "jwt-decode";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        "http://localhost:8080/message/inbox?username=" +
        localStorage.getItem("username"),
      messages: [],
    };
  }

  componentDidMount() {
    var username = jwt_decode(localStorage.getItem("jwt")).sub;
    var url = "message/inbox?username=" + username;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ messages: data }));
  }

  render() {
    return (
      <div>
        <h4>My inbox</h4>
        {this.state.messages.map((item) => (
          <div key={item.id}>
            <SingleMessage key={item.id} item={item} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
