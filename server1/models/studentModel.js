const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAvatarImageSet: Boolean,
  avatarImage: String,
  role: { type: String, default: 'student' },
});

const StudentModel = mongoose.model('students', studentSchema);

module.exports = StudentModel;