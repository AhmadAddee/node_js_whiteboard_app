import React from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

// src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLl892U8nBz93LjRN9WQSs9w3tcvqm_rZpoqTV4aXbng&s"

function SinglePost({ item }) {
  const history = useHistory();

  return (
    <div className="row ">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <div className="chip">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                alt="Contact Person"
              />
              {item.creator}
            </div>

            <br />
            <span className="card-title">{item.content}, </span>

            <div className="card-action">
              <button
                onClick={() => {
                  var username = jwt_decode(localStorage.getItem("jwt")).sub;
                  if (item.creator !== username) {
                    localStorage.setItem("messageReceiver", item.creator);
                    history.push("/profile");
                    window.location.reload();
                  }
                }}
                disabled={
                  item.creator === jwt_decode(localStorage.getItem("jwt")).sub
                }
                className="btn waves-effect waves-light"
                hidden={
                  item.creator === jwt_decode(localStorage.getItem("jwt")).sub
                }
              >
                {item.creator}
                <i className="material-icons right">send</i>
              </button>
            </div>
            <span>{item.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
