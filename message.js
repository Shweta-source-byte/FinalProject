const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    message: String,
    room: String,
    sentAt: {
        type: Date,
    default: Date.now}
    
})

module.exports = mongoose.model("Message", messageSchema)

