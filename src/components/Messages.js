import React, { Component } from "react";
import SingleMessage from "./SingleMessage";

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
    fetch(this.state.url)
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
