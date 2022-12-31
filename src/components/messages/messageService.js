const API_URL = "http://localhost:8081/message/";
const jwt = localStorage.getItem("jwt");
const Headers = {
  Authorization: "Bearer " + jwt,
  "Content-Type": "application/json",
};

class FetchMessagesData {
  getMyInbox() {
    return fetch(API_URL + "inbox", {
      headers: Headers,
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  }

  sendMessage(message) {
    console.log("From creating message: " + message);
    return fetch(API_URL + "send", {
      headers: Headers,
      method: "POST",
      body: JSON.stringify(message),
    }).then((response) => {
      console.log(response);
      return response;
    });
  }
}

export default new FetchMessagesData();
