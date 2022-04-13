const mongoose = require("mongoose")


const connectionSchema = new mongoose.Schema({
  
  status: String,
  room: String,
  sentAt: {
    type: Date,
default: Date.now}
})

module.exports = mongoose.model("Connection", connectionSchema)