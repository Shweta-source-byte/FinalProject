const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//database connection
const  Chat  = require("/Chat");
const  connect  = require("/dbconnect");

//const  express  = require("express");
const  connectdb  = require("/dbconnect");
const  Chats  = require("/Chat");
const  router  =  express.Router();

const  bodyParser  = require("body-parser");
const  chatRouter  = require("./route/chatroute");

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
   router.route("/").get((req, res, next) =>  {
    res.setHeader("Content-Type", "application/json");
    res.statusCode  =  200;
    connectdb.then(db  =>  {
        Chats.find({}).then(chat  =>  {
        res.json(chat);
    });
});
});
server.listen(8080, () => {
  console.log('listening on *:8080');
});

module.exports  =  router;
//bodyparser middleware
app.use(bodyParser.json());
//routes
app.use("/chats", chatRouter);
// fetching initial chat messages from the database
(function() {
    fetch("/chats")
    .then(data  =>  {
    return  data.json();
    })
.then(json  =>  {
json.map(data  =>  {
let  li  =  document.createElement("li");
let messages = docuemtn.getElementById("messages")
let  span  =  document.createElement("span");
messages.appendChild(li).append(data.message);

    messages
    .appendChild(span)
    .append("by "  +  data.sender  +  ": "  +  formatTimeAgo(data.createdAt));
});
});
})();