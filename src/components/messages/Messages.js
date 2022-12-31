import React, { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage";
//import jwt_decode from "jwt-decode";
import FetchMessageDate from "./messageService";

function Messages() {
  const [messages, setMssages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    FetchMessageDate.getMyInbox()
      .then((response) => setMssages(response))
      .catch((error) => {
        setErrorMessage(error.status);
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h4>My inbox</h4>
      {errorMessage && <div>{errorMessage}</div>}
      {messages.map((item) => (
        <div key={item.id}>
          <SingleMessage key={item} item={item} />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Messages;
