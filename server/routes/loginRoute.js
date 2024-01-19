const { login, setAvatar, getAllUsersTeachers, getAllUsersStudents } = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", login);
router.post("/setavatar/:id/:role", setAvatar);
router.get("/allusersteacher/:id", getAllUsersTeachers);
router.get("/alluserstudent/:id",getAllUsersStudents)

module.exports = router;
