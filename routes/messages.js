const {Router} = require("express")
const {createMessage, getAllMessages, deleteMessage} = require("../controllers/messages.js")
const router = Router()

router.get("/", getAllMessages)
router.post("/", createMessage)
router.delete("/:id", restrict, deleteMessage)


module.exports = router