const { createMessage, getMessage, newMessageAndChat } = require("../controller/messageController");

const router = require("express").Router()


router.post("/", createMessage);
router.get("/:chatId", getMessage);
router.post("/new", newMessageAndChat)

module.exports = router