import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header";

function App() {
  return (
    <div className="container-fluid ">
      <Header />
      <div className="row">
        <Routes />
      </div>
    </div>
  );
}

export default App;
