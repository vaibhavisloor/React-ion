import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import { addUser, removeUser, getUser, getUsersInRoom } from './Users.js';
import router from './Router.js';

const app = express();
const server = http.createServer(app);

// CORS Configuration for Express
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from the React frontend
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions)); // Apply CORS middleware to Express

app.use(router);

// Configure Socket.io to allow requests from localhost:3000
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(5000, () => console.log(`Server running on port 5000`));
