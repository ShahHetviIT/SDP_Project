const StudentModel = require('../models/studentModel');
const TeacherModel = require('../models/teacherModel');

 // Adjust the path as needed
const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const UserModel = role === 'student' ? StudentModel : TeacherModel;

    UserModel.findOne({ username, password })
      .then((user) => {
        if (user) {
          if (user.role === role) {
            res.json({
              success: true,
              message: `${
                role.charAt(0).toUpperCase() + role.slice(1)
              } successfully logged in`,
            });
          } else {
            res.json({
              success: false,
              message: `You are not authorized as a ${role}`,
            });
          }
        } else {
          res.json({ success: false, message: 'No record exists' });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Fetch the user data to determine the role
    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Choose the appropriate model based on the user's role
    const UserModel = userData.role === 'teacher' ? TeacherModel : StudentModel;

    // Update the avatar using the chosen model
    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    return res.json({
      isSet: updatedUserData.isAvatarImageSet,
      image: updatedUserData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

