const Chat = require("../model/chat")



// create  a new chat 
const createChat = async (req, res) => {

    const { senderId, receiverId } = req.body

    const newChat = new Chat({
        users: [senderId, receiverId]
    })

    try {

        const savedChat = await (await newChat.save()).populate(["users", "latestMessage"]);
        res.status(200).json({ message: savedChat, success: true })




    } catch (error) {

        res.status(500).json({ message: error, success: false })

    }

}




// get the chat of the user 
const userChat = async (req, res) => {

    try {
        const fetchedChat = await Chat.find(
            { users: { $in: [req.params.userId] } }
        ).populate(["users", "latestMessage"])
        res.status(200).json({ message: fetchedChat, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })
    }

}

// find a chat by chat id 
const findAChat = async (req, res) => {

    const { chatId } = req.params

    try {
        const fetchedChat = await Chat.findById(chatId).populate(["users", "latestMessage"])
        res.status(200).json({ message: fetchedChat, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })
    }

}

// get the chat of the user 
const findChat = async (req, res) => {


    const { firstId, secondId } = req.params


    try {


        const fetchedChat = await Chat.findOne(
            { users: { $all: [firstId, secondId] } }
        ).populate(["users", "latestMessage"])


        res.status(200).json({ message: fetchedChat, success: true })



    } catch (error) {
        res.status(500).json({ message: error, success: false })
    }

}

module.exports = { createChat, userChat, findChat, findAChat }