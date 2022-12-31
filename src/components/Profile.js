import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import jwt_decode from "jwt-decode";
import FetchMessagesData from "./messages/messageService";
import FetchPostData from "./PostHome/postData";

function Profile() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [receiver, setReceiver] = useState(
    localStorage.getItem("messageReceiver")
  );
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    age: 0,
  });
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  let url =
    "http://localhost:8081/user/get-user?username=" +
    localStorage.getItem("messageReceiver");
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        setUser(user);
      });
    setPostsF();
  }, [localStorage.getItem("messageReceiver")]);

  const setPostsF = () => {
    var url = "http://localhost:8081/post/get-posts?creator=" + receiver;
    console.log(url);
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  const onSendClicked = async (e) => {
    e.preventDefault();

    var messageBody = {
      receiver: receiver,
      content: message,
    };

    FetchMessagesData.sendMessage(messageBody)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("messageReceiver", "");
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error);
      });
  };

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <h4>{user.username}</h4>
          <div>Full name: {user.fullName}</div>
          <div>Age: {user.age}</div>
          <div className="input-field col s6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="materialize-textarea"
            />
            <label>Send a message</label>
            <button
              name="action"
              className="btn waves-effect waves-light"
              onClick={onSendClicked}
            >
              Send
              <i className="material-icons right">send</i>
            </button>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </form>
      <b>posts:</b>
      {posts?.map((post) => (
        <div className="row" key={post.id}>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <div className="chip">
                  <img
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                    alt="Contact Person"
                  />
                  {post.creator}
                </div>

                <br />
                <span className="card-title">{post.content}, </span>
                <div className="card-action">
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
