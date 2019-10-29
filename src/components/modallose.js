import React, { Component } from "react";
import Modal from "react-responsive-modal";
import "../index.css";
import "../App.css";
import { Link } from "react-router-dom";

class ModalLose extends Component {
  state = {
    open: true
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="modal-div">
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          styles={{ overlay: { background: "rgba(0, 0, 0, 0.47)" } }}
        >
          <div id="modalLose">
          <p>YOU LOSE ! !</p>
              <img
                src="https://media.giphy.com/media/a93jwI0wkWTQs/giphy.gif"
                alt="loser"
              />
              <p><Link to="/">Continue</Link></p>
              <p><Link to="/">Back to title</Link></p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalLose;
