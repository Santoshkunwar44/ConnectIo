const mongoose = require("mongoose")



const chatSchema = mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chatName: {
        type: String,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamp: true })


module.exports = mongoose.model("Chat", chatSchema)
