// Corrected import statement
const { login } = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", login);

module.exports = router;
