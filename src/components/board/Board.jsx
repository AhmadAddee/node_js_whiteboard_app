import React from "react";
import io from "socket.io-client";

import "./style.css";

class Board extends React.Component {
  timeout;
  socket = io.connect("http://localhost:3000");

  constructor(props) {
    super(props);

    this.socket.on("canvas-data", function (data) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user.username);
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);

        var image = new Image();
        var canvas = document.getElementById("board"); //document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;
    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var root = this;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout !== undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        var base64ImageData = document
          .getElementById("board")
          .toDataURL("image/png"); //canvas.toDataUrl("image/png");
        root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  /********* */
  saveImageToLocal = (e) => {
    let link = e.currentTarget;
    link.setAttribute("download", "newImage.png");

    var image = document.getElementById("board").toDataURL("image/png");
    link.setAttribute("href", image);
  };

  handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;

    var canvas = document.getElementById("board");
    this.readTheFile(fileObj, canvas).then((image) =>
      this.loadTheImage(image, canvas)
    );
  };

  readTheFile(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.readAsDataURL(file);
    });
  }

  loadTheImage(image, canvas) {
    const img = new Image();
    img.onload = function () {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = image;
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <form action="#">
          <div className="file-field input-field">
            <div className="btn">
              <span>Open a File</span>
              <input id="load" type="file" onChange={this.handleFileChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
            <div>
              <a
                download="newImage.png"
                href="C:\MyProjects"
                onClick={this.saveImageToLocal}
                className="waves-effect waves-light btn"
              >
                download
              </a>
            </div>
          </div>
        </form>
        <iframe
          title="theFrame"
          src={this.img}
          srcDoc="<p>Hello from Iframe</p>"
        ></iframe>
        <canvas className="board" id="board"></canvas>
      </div>
    );
  }
}

export default Board;
