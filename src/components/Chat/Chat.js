import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

// Importing components for Chat functionality
import TextContainer from '../TextContainer/TextContainer.js'; // Ensure path is correct
import Messages from '../Messages/Messages.js'; // Ensure path is correct
import InfoBar from '../InfoBar/InfoBar.js'; // Ensure path is correct
import Input from '../Input/Input.js'; // Ensure path is correct

import './Chat.css'; // Ensure CSS file exists

// Server endpoint for socket.io (backend server URL)
const ENDPOINT = 'http://localhost:5000';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Get query parameters (name, room) from the URL using useLocation and query-string
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT); // Connect to the backend

    setRoom(room);
    setName(name);

    // Emit the 'join' event with the user's name and room
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error); // Handle any errors from the server
      }
    });

    // Cleanup function to disconnect the socket on component unmount
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    // Listen for incoming messages from the backend
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Listen for room data updates (users in the room)
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off('message');
      socket.off('roomData');
    };
  }, []);

  // Function to send a new message
  const sendMessage = (event) => {
    event.preventDefault(); // Prevent form submission

    if (message) {
      socket.emit('sendMessage', message, () => setMessage('')); // Emit the message and clear the input field
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        {/* InfoBar component to display the room name */}
        <InfoBar room={room} />
        {/* Messages component to display the list of messages */}
        <Messages messages={messages} name={name} />
        {/* Input component to capture and send a new message */}
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* TextContainer to display the list of active users */}
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
