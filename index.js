const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const Message = require('./message')
const Connection = require('./connection')
const rooms = {}
//connection to mongo DB server through mongoose library
mongoose.connect('mongodb://localhost:27017/testdb')
//function used to query message logs to mongo DB server
async function queryMessageToMongoose(msg, room) {
  try {
    let msgToMongooose = await Message.create({
      message: msg,
      room: room
    })
  }
  catch (e) {
    console.log("DB ERROR: " + e.message)
  }

}

async function queryConnectionStatusToMongoose(status, room) {
  try {
    let msgToMongooose = await Connection.create({
      status: status,
      room: room
    })
  }
  catch (e) {
    console.log("DB ERROR: " + e.message)
  }
}
io.on('connection', (socket) => {

  rooms[socket.id] = [socket.id]

  queryConnectionStatusToMongoose('connected', socket.id)
 
  socket.on('chat message', (msg, room) => {
    //
    if (!room) {
      io.emit('chat message', msg);
      console.log('@chat-message, if, no room: ' + msg);
      queryMessageToMongoose(msg, "-1")
    }
    else {
      queryMessageToMongoose(msg, room)
      console.log('@chat-message, else, with room: ' + room + "   " + msg + "SOCKET ID:  " + socket.id);
      socket.to(room).emit('chat message',msg)
    }

  });


  socket.on('room assign', (roomNum) => {
    
    if (rooms[roomNum]) {
      socket.join(roomNum)
      rooms[roomNum].push(socket.id)
    } else {
      rooms[roomNum] = [socket.id]
    }

    
  })

  socket.on('disconnect', () => {
    queryConnectionStatusToMongoose('disconnected', socket.id)
    console.log("A user Disconnected from room " + socket.id)

  })


});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
