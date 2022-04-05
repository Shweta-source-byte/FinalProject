const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoclient = require('mongodb').mongoclient;
const url = 'mongodb://localhost:27017/node_chat';

mongoclient.connect(url, function(err,  db){
const messagesCollection = db.collection('messages');
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

        messagesCollection.insertOne({text:message}, function (err, res){
            console.log('inserted a codument into the messagessCollection');
        });
      });
    });
    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });

})



  
server.listen(8080, () => {
  console.log('listening on *:8080');
});

