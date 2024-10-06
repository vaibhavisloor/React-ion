import express from "express";
import { createServer } from "http"; // Import createServer from http
import { Server } from "socket.io";  // Import Server class from socket.io
import router from "./Router.js"

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router)

const server = createServer(app);  // Correctly use createServer
const io = new Server(server);     // Use new Server for socket.io


io.on('connection',(socket)=>{
    console.log("New COnnection");

    socket.on('disconnect',()=>{
        console.log('User Disconnected')
    })
})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
