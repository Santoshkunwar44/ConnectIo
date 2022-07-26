const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    profilePicture: {
        type: String,
        default: "https://cdn.dribbble.com/users/844597/screenshots/9008058/media/a8bfc3cd2e71a304a02d8729bcffa132.png?compress=1&resize=768x576&vertical=top"
    },
    coverPicture: String,
    relationship: String,
    livesIn: String,
    worksAt: String,
    about: String,
    country: String,
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema) 
