const {
  login,
  setAvatar,
  getAllUsersTeachers,
  getAllUsersStudents,
  getAllStudents,
  addMarksAttendance,
  getTeacherSubjects,
  getStudentMarksAttendance,
  getTotalStudentMarksAttendance
} = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", login);
router.post("/addMarksAttendance", addMarksAttendance);
router.post("/setavatar/:id/:role", setAvatar);
router.get("/allusersteacher/:id", getAllUsersTeachers);
router.get("/alluserstudent/:id", getAllUsersStudents);
router.get("/alluserstudent", getAllStudents);
router.get("/getTeacherSubjectName/:id", getTeacherSubjects);
router.post("/getMarksAttendance",getStudentMarksAttendance);
router.post("/getTotalMarksAttendance",getTotalStudentMarksAttendance);


module.exports = router;
