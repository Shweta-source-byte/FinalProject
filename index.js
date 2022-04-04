const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//database connection
const  Chat  = require("./models/Chat");
const  connect  = require("./dbconnect");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  connect.then(db  =>  {
    console.log("connected correctly to the server");

    let  chatMessage  =  new Chat({ message: msg, sender: "Anonymous"});
    chatMessage.save();
    });
   // });
server.listen(8080, () => {
  console.log('listening on *:8080');
});