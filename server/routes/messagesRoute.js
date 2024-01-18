const { addMessage, getMessages } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

// router.post("/add-messages", addMessage);
// router.get("/get-messages", getMessages);


module.exports = router;
