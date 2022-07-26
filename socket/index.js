
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:3000"
    }
})


let activeUser = []
io.on("connection", (socket) => {

    socket.on("newUser", (newUser) => {

        const newUserId = newUser?._id
        if (!activeUser.some((user) => user.userId === newUserId)) {

            activeUser.push({
                userId: newUserId,
                socketId: socket.id,
                data: newUser
            })

        }
        console.log("user connected", activeUser)
        io.emit("get-users", activeUser)
    })

    // send message 
    socket.on("sendMessage", (data) => {
        console.log("incomeing message", data)
        const { receiverId } = data;

        const user = activeUser.find((user) => user.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit("receiveMessage", data)
            io.to(user.socketId).emit("receiveNotification", { ...data, dataType: "message" })
        }
    })

    socket.on("disconnect", () => {
        activeUser = activeUser.filter((user) => user.socketId !== socket.id)
        console.log("user disconnected ....", activeUser)
        io.emit("get-users", activeUser)
    })
});
