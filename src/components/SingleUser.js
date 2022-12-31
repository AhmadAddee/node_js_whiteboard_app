import React, { useState, useEffect } from "react";
import SinglePost from "./PostHome/SinglePost";
import jwt_decode from "jwt-decode";

function SingleUser({ item }) {
  const [posts, setPosts] = useState([]);

  var username = jwt_decode(localStorage.getItem("jwt")).sub;
  let url = "http://localhost:8081/post/get-posts?creator=" + username;
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []); //posts

  return (
    <div>
      <h4>
        <i className="small material-icons">account_box</i>
        {"   "}
        {item.username}
      </h4>
      <div>Full name: {item.fullName}</div>
      <div>Age: {item.age}</div>
      <div>
        posts:
        {posts.map((post) => (
          <span key={post.id}>
            <SinglePost key={post.id} item={post} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default SingleUser;
