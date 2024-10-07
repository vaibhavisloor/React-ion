import express from "express";
import { createServer } from "http"; // Import createServer from http
import { Server } from "socket.io";  // Import Server class from socket.io
import router from "./Router.js"
import { addUser, removeUser, getUser, getUsersInRoom } from './Users.js';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(router)

const server = createServer(app);  // Correctly use createServer
const io = new Server(server);     // Use new Server for socket.io


io.on('connection',(socket)=>{
    console.log("New Connection");

    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room});

        if (error) return callback(error);
        
        socket.emit('message',{user: 'admin', text:`${user.name},welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`})
        socket.join(user.room);

        callback();
});

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user : user.name, text : message});

        callback();
    });

    socket.on('disconnect',()=>{
        console.log('User Disconnected');
    })
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
