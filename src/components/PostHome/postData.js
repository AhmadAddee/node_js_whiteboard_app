const API_URL = "http://localhost:8081/post/";
const jwt = localStorage.getItem("jwt");
const Headers = {
  Authorization: "Bearer " + jwt,
  "Content-Type": "application/json",
};

class FetchPostData {
  getAllPosts() {
    return fetch(API_URL + "get-all", {
      headers: Headers,
    }).then((response) => {
      return response.json();
    });
  }

  getByCreator(creator) {
    console.log(creator);
    fetch(API_URL + "get-posts?creator=" + creator, {
      headers: Headers,
      method: "GET",
    }).then((response) => {
      return response.json();
    });
  }

  createPost(post) {
    console.log("From creating posts: " + post);
    return fetch(API_URL + "create", {
      method: "POST",
      headers: Headers,
      body: JSON.stringify(post),
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}

export default new FetchPostData();
