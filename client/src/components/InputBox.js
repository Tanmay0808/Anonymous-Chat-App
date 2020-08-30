import React from "react";
import "../styles/inputbox.css";

function InputBox({ newMessage, sendMessage, setMessageToSend }) {

  return (
    <div className="card-footer input-box">
      <div className="form-group mr-3">
        <input
          type="text"
          placeholder="Enter Message..."
          className="form-control"
          value={ newMessage } 
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
      <div className="form-group">
        <button
          onClick={ sendMessage }
          title="Send Message"
          className="justify-content-center btn btn-secondary send-msg-btn"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default InputBox;
