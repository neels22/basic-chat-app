

import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";




const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }, 
});

io.on("connection", (client) => {
//   console.log("a user connected");
//   console.log("user id", client.id);

  client.on("message", (message) => { // receive message from client
    // console.log("message", message);
    io.emit("message", message); // send message to all clients
  });


  client.on("disconnect", () => {
    console.log("a user disconnected");
  });


});



app.get("/", (req, res) => {
  res.send("welcome to the chat app backend");
});






server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});