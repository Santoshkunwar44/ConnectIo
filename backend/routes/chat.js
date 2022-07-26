const { createChat, findChat, userChat, findAChat } = require("../controller/chatController")

const router = require("express").Router()

router.post("/", createChat)
router.get("/:userId", userChat)
router.get("/find/:firstId/:secondId", findChat)
router.get("/:chatId/chat", findAChat)


module.exports = router