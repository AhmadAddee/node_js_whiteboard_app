import React, { Component } from "react";
import SinglePost from "./SinglePost";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    console.log("in posts", localStorage.getItem("jwt"));
    fetch("http://localhost:8081/post/get-all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }

  render() {
    return (
      <div>
        <h4>Posts</h4>
        {this.state.posts.reverse().map((item) => (
          <div key={item.id} className="row">
            <SinglePost key={item.id} item={item} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
