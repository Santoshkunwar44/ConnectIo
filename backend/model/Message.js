const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, { timestamps: true })


module.exports = mongoose.model("Message", messageSchema)