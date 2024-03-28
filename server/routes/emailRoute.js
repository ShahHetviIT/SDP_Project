const {sendMail} = require("../controllers/emailController");
const router = require("express").Router();
router.post("/sendEmail",sendMail);

module.exports = router;