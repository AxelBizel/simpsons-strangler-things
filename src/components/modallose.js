import React, { Component } from "react";
import "./modal.css";
import { Link } from "react-router-dom";
import Haha from "../Design/Sounds/nelson-haha.mp3";

class ModalLose extends Component {
  render() {
    return (
      <div className="container">
        <div id="ModalLose">
          <p>YOU LOSE !!</p>
          <img
            src="http://giphygifs.s3.amazonaws.com/media/jUwpNzg9IcyrK/giphy.gif"
            alt="winner"
          />
          <p onClick={this.props.initializeGame}>Continue</p>
          <p>
            <Link to="/">Back to menu</Link>
          </p>
        </div>
        <iframe
        title="son-haha"
        src={Haha}
        allow="autoplay"
        id="audio"
        style={{ visibility: "hidden" }}
      ></iframe>
      </div>
    );
  }
}

export default ModalLose;