

import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";




const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});