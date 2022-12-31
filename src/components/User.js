import React, { useState, useEffect } from "react";
import SingleUser from "./SingleUser";
//import jwt_decode from "jwt-decode";

function User() {
  const [user, setuser] = useState({
    username: "",
    password: "",
    fullName: "",
    postList: [],
    age: 0,
  });

  useEffect(() => {
    var url = "http://localhost:8081/user/get-user";
    console.log(url);
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setuser(data));
  }, []);

  return (
    <div>
      <div>
        <SingleUser item={user} />
      </div>
    </div>
  );
}

export default User;
