const { login, setAvatar } = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", login);
router.post("/setavatar/:id", setAvatar);

module.exports = router;
