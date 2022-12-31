import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FetchPostData from "./postData";

function AddPost() {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  var decode = jwt_decode(localStorage.getItem("jwt"));

  const submitPost = (e) => {
    e.preventDefault();

    let post = {
      creator: decode.sub,
      content: content,
    };

    FetchPostData.createPost(post)
      .then((res) => {
        if (res.status === 201) {
          history.push("/");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err);
      });
  };

  return (
    <div className="row">
      <form className="col s12">
        <h4>Create Post</h4>
        {errorMessage && <h1>{errorMessage}</h1>}
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
            disabled={content ? false : true}
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
