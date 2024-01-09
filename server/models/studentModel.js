const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'student' },
});

const StudentModel = mongoose.model('students', studentSchema);

module.exports = StudentModel;