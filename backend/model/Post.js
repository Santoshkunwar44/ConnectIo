const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: String,
    title: String,
    likes: [],
    Image: String

}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)

