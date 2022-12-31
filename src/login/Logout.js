//import jwt_decode from "jwt-decode";
import AuthService from "../services/auth-service";

function LogOutPage() {
  const onLogInClicked = async () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="content-container">
      <h1>Sure you want to log out?</h1>
      <hr />
      <button onClick={onLogInClicked} className="btn waves-effect waves-light">
        Yes!
      </button>
    </div>
  );
}

export default LogOutPage;
