const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Login');

const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'student' } // Indicate the role in the schema
});

const TeacherSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'teacher' } // Indicate the role in the schema
});

const StudentModel = mongoose.model("students", StudentSchema);
const TeacherModel = mongoose.model("teachers", TeacherSchema);

app.post("/login", (req, res) => {
    const { username, password, role } = req.body;
    const UserModel = role === 'student' ? StudentModel : TeacherModel;

    UserModel.findOne({ username, password })
        .then(user => {
            if (user) {
                if (user.role === role) {
                    res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} successfully logged in` });
                } else {
                    res.json({ success: false, message: `You are not authorized as a ${role}` });
                }
            } else {
                res.json({ success: false, message: "No record exists" });
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error: error.message });
        });
});



app.listen(3001, () => {
    console.log("Server is running");
});
