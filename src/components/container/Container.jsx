import React from "react";
import Board from "../board/Board";

import "./style.css";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      size: "5",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }
  //"brushsize-container"
  render() {
    return (
      <div className="container">
        <a href="/chart">helloo</a>
        <div className="tools-section">
          <div className="color-picker-container">
            Select Brush Color : &nbsp;
            <input
              className="validate"
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>

          <div className="brushsize-container">
            Select Brush Size : &nbsp;
            <select
              className="browser-default"
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select>
          </div>

          <form action="#">
            <p className="range-field">
              <input
                type="range"
                id="test5"
                min="1"
                max="100"
                value={this.state.size}
                onChange={this.changeSize.bind(this)}
              />
            </p>
          </form>
        </div>

        <div className="board-container">
          <Board color={this.state.color} size={this.state.size}></Board>
        </div>
      </div>
    );
  }
}

export default Container;
