const { login, setAvatar, getAllUsers } = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", login);
router.post("/setavatar/:id/:role", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
