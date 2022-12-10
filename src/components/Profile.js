import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Profile() {
  const history = useHistory();
  const [sender, setSender] = useState(localStorage.getItem("username"));
  const [receiver, setReceiver] = useState(
    localStorage.getItem("messageReceiver")
  );
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    age: 0,
    postList: [],
  });
  const [message, setMessage] = useState("");

  let url =
    "http://localhost:8080/user/get-user?username=" +
    localStorage.getItem("messageReceiver");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(setUser);
  }, [localStorage.getItem("messageReceiver")]);

  const onSendClicked = async (e) => {
    e.preventDefault();

    let messUrl = "http://localhost:8080/message/send";
    const result = await axios.post(messUrl, {
      sender: sender,
      receiver: receiver,
      content: message,
    });
    console.log(result.data);

    localStorage.setItem("messageReceiver", "");
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <h4>{user.username}</h4>
          <div>Full name: {user.fullName}</div>
          <div>Age: {user.age}</div>
          <div className="input-field col s6">
            <i className="material-icons prefix">mode_edit</i>
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
          </div>
        </div>
      </form>
      <b>posts:</b>
      {user.postList.map((post) => (
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
