import React from "react";

function SingleMessage({ item }) {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <div className="chip">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                alt="Contact Person"
              />
              {item && item.sender}
            </div>
            <span className="card-title">{item && item.content}, </span>
          </div>
          <div className="card-action">
            <span>{item && item.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
