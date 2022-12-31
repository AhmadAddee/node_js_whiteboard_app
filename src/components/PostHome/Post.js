import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import FetchPostData from "./postData";

function Post() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    FetchPostData.getAllPosts()
      .then((response) => setPosts(response))
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error);
      });
  }, []);

  console.log(posts);

  return (
    <div>
      <h4>Posts</h4>
      {errorMessage && <div>{errorMessage}</div>}
      {posts?.reverse().map((item) => (
        <div key={item.id} className="row">
          <SinglePost item={item} />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Post;
