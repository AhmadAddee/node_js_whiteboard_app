import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken !== null) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("jwt", response.data.accessToken);
          console.log("From auth-service: " + localStorage.getItem("user"));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("messageReceiver");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    console.log("Logout");
  }

  register(username, fullName, password, age) {
    return axios
      .post(API_URL + "signup", {
        username,
        fullName,
        password,
        age,
      })
      .then((response) => {
        if (response.status !== 201) return response.message;
        return response;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
