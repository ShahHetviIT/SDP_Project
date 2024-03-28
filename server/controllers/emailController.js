const nodemailer = require("nodemailer");
const studentModel = require("../models/studentModel"); // Assuming this is your student model

module.exports.sendMail = async (req, res, next) => {
  try {
    const {fileName,className} = req.body;
    // console.log(className);
    // Fetch all students from the database
    const students = await studentModel.find();

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Loop through each student and send them an email
    for (const student of students) {
        console.log(student.Email);
      let info = await transporter.sendMail({
        from: {
          name: 'Mentor Mingle',
          address: process.env.USER
        },
        to: student.Email, // Use the student's email address from the database
        subject: "Hello " + student.username, // Subject line
        text: "Dear " + student.username + ",\n\nThis is a test email from Mentor Mingle.", // Plain text body
        html: "<b>Dear " + student.username + ",</b><br><br>I hope this email finds you well. I wanted to share some important information regarding our class <br><br>Material named <b>" + fileName + "</b> is uploaded in " + className + " classroom <br><br> Please review the attached PDF for more details. If you have any questions or need further clarification, feel free to reach out.", // HTML body
      });

      console.log("Message sent to " + student.username + " at " + student.Email);
    }

    res.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error occurred while sending emails:", error);
    res.status(500).json({ error: "Error sending emails" });
  }
};
