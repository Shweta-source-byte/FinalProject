const express = require('express');
const app = express();
const http = require('http');
const { Db } = require('mongoose/node_modules/mongodb');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const MongoClient = require('mongodb').MongoClient;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Shweta:India12345@cluster0.6she9.mongodb.net/node_chat?retryWrites=true&w=majority';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
//MongoClient.connect(url, function(err,  db){
MongoClient.connect(url, function(err, Db){
//const messagesCollection = db.collection('messages');
const messagesCollection = Db;

  
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        //messagesCollection.insertOne({text:message}, function (err, res){
            messagesCollection.Db.node_chat.insertOne({text:message}, function(err, res){
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

