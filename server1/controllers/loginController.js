const StudentModel = require("../models/studentModel");
const TeacherModel = require("../models/teacherModel");

// Adjust the path as needed
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const UserModel = role === "student" ? StudentModel : TeacherModel;

    UserModel.findOne({ username, password })
      .then((user) => {
        if (user) {
          if (user.role === role) {
            // sessionStorage.setItem(
            //   "user",
            //   JSON.stringify({
            //     username: user.username,
            //     userId: user._id,
            //     role: user.role,
            //   })
            // );
            return res.json({
              success: true,
              message: `${
                role.charAt(0).toUpperCase() + role.slice(1)
              } successfully logged in`,
              userId: user._id,
              avatarImage: user.avatarImage,
              isAvatarImageSet: user.isAvatarImageSet,
            });
          } else {
            res.json({
              success: false,
              message: `You are not authorized as a ${role}`,
            });
          }
        } else {
          res.json({ success: false, message: "No record exists" });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;

//     // Fetch the user data to determine the role
//     const userData = await userId.findById(userId);

//     if (!userData) {
//       return res.json({ success: false, message: 'User not found' });
//     }

//     // Choose the appropriate model based on the user's role
//     const UserModel = userData.role === 'teacher' ? TeacherModel : StudentModel;

//     // Update the avatar using the chosen model
//     const updatedUserData = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );

//     return res.json({
//       isSet: updatedUserData.isAvatarImageSet,
//       image: updatedUserData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

// const StudentModel = require('../models/studentModel');
// const TeacherModel = require('../models/teacherModel');

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Fetch the user data to determine the role
    const teacherData = await TeacherModel.findById(userId);
    const studentData = await StudentModel.findById(userId);
    console.log(teacherData);
    console.log(studentData);

    // Check if the user is a teacher
    if (teacherData) {
      const updatedTeacherData = await TeacherModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );

      return res.json({
        isSet: updatedTeacherData.isAvatarImageSet,
        image: updatedTeacherData.avatarImage,
      });
    }

    // Check if the user is a student
    if (studentData) {
      const updatedStudentData = await StudentModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );

      return res.json({
        isSet: updatedStudentData.isAvatarImageSet,
        image: updatedStudentData.avatarImage,
      });
    }

    // If neither teacher nor student found
    return res.json({ success: false, message: "User not found" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsersTeachers = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const users = await TeacherModel.find({
      _id: { $ne: req.params.id },
      avatarImage: { $exists: true, $ne: false, $ne: null, $ne: "" } // Exclude users with falsy avatarImage
    }).select(["username", "avatarImage", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsersStudents = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const users = await StudentModel.find({
      _id: { $ne: req.params.id },
      avatarImage: { $exists: true, $ne: false, $ne: null, $ne: "" } // Exclude users with falsy avatarImage
    }).select(["username", "avatarImage", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

