import React, { Component } from "react";
import "./modal.css";
// import { Route, Link } from "react-router-dom";
// import Modal from "react-responsive-modal";

class ModalLose extends Component {
  
  render() {
    return (
      <div id="containerLose">
        <div id="ModalLose">
          <p>YOU LOSE !!</p>
          <img 
            src="https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif"
            alt="winner"
          />
          <p>Continue</p>
          <p>Back to title</p>
          {/* <Link to="/level/2"><p>Continue</p></Link>
          <Route path="/level/2" exact component={LevelTwo} />
          <Link to="/"><p>Back to title</p></Link>
          <Route path="/" exact component={Home} /> */}
        </div>
      </div>
    );
  }
}

export default ModalLose;


// class ModalLose extends Component {
//   state = {
//     open: false
//   };

//   onOpenModal = () => {
//     this.setState({ open: true });
//   };

//   onCloseModal = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { open } = this.state;
//     return (
//       <div className="modal-div">
//         <button onClick={this.onOpenModal}>Open modal</button>
//         <Modal
//           open={open}
//           onClose={this.onCloseModal}
//           center
//           styles={{ overlay: { background: "rgba(0, 0, 0, 0.47)" } }}
//         >
//           <div id="modalLose">
//           <p>YOU LOSE ! !</p>
//               <img
//                 src="https://media.giphy.com/media/a93jwI0wkWTQs/giphy.gif"
//                 alt="loser"
//               />
//               <p>Continue</p>
//               <p>Back to title</p>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default ModalLose;