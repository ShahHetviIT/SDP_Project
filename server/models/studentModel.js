const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAvatarImageSet: Boolean,
  avatarImage: String,
  profileImage: String,
  isProfileImageSet: Boolean,
  role: { type: String, default: "student" },
  EnrollmentYear: Number,
});

const StudentModel = mongoose.model("students", studentSchema);

module.exports = StudentModel;
