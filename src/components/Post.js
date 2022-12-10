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
    fetch("http://localhost:8080/post/get-all")
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
