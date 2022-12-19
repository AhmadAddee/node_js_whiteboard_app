import React, { Component } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function AddPost() {
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState(localStorage.getItem("username"));
  const history = useHistory();
  var decode = jwt_decode(localStorage.getItem("jwt"));
  console.log(decode.sub);

  const submitPost = (e) => {
    e.preventDefault();

    let post = {
      creator: decode.sub,
      content: content,
    };

    fetch("post/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((res) => {
      if (res.status === 201) {
        history.push("/");
        window.location.reload();
      }
    });
  };

  return (
    <div className="row">
      <form className="col s12">
        <h4>Create Post</h4>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              placeholder="Content..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="text"
              className="materialize-textarea"
            />
            <label htmlFor="content">Content</label>
          </div>
        </div>
        <div>
          <button
            className="btn waves-effect waves-light"
            type="subnmit"
            name="action"
            onClick={submitPost}
          >
            <i className="material-icons right">send</i>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
