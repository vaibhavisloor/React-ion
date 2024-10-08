import React from 'react';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  // Handle when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents form from submitting
      sendMessage(event); // Sends the message and passes the event
    }
  };

  return (
    <form className="form" onSubmit={(e) => {
      e.preventDefault(); // Prevents form from refreshing the page
      sendMessage(e); // Sends the message and passes the event
    }}>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)} // Updates the message state
        onKeyPress={handleKeyPress} // Handles Enter key press
      />
      <button className="sendButton" type="submit">Send</button>
    </form>
  );
};

export default Input;
