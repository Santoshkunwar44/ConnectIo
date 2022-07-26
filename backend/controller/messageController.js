const Message = require("../model/Message")
const Chat = require("../model/chat")

const createMessage = async (req, res) => {

    const { content, senderId, chatId } = req.body
    const newMessage = new Message({
        senderId,
        content,
        chatId,
    })

    try {

        const savedMessage = await (await newMessage.save()).populate(["senderId", "chatId"])
        res.status(200).json({ message: savedMessage, success: true })
    } catch (error) {

        res.status(500).json({ message: error, success: false })
    }
}

const getMessage = async (req, res) => {
    const { chatId } = req.params;
    try {
        const fetchedMessage = await Message.find({ chatId }).populate(["senderId", "chatId"])
        res.status(200).json({ message: fetchedMessage, success: true })

    } catch (error) {
        res.status(500).json({ message: error, success: false })

    }
}

//  create new message with a new conversation 


const newMessageAndChat = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const newChat = new Chat({
        users: [senderId, receiverId],
    })
    const newMessage = new Message({
        content,
        senderId

    })
    try {
        const savedChat = await (await newChat.save()).populate(["users", "latestMessage"]);
        newMessage.chatId = savedChat._id
        const savedMessage = await (await newMessage.save()).populate("senderId")
        await Chat.findOneAndUpdate({ _id: savedChat._id }, { latestMessage: savedMessage._id })
        res.status(200).json({ message: savedMessage, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })
    }


}


module.exports = { getMessage, createMessage, newMessageAndChat }
