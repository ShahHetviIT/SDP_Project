const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const messageRoute = require("./routes/messagesRoute");
const classroomRoute = require("./routes/classroomRoute");
const todoRoute = require("./routes/TodoRoute");
const socket = require("socket.io");
const https = require("https");
const fs = require("fs");


const pdfTemplete = require('./documents/index');

const app = express();

const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());

require("dotenv").config();
app.use("/files",express.static("files"));

//fetch pdf

app.post('/api/external/create-pdf', (req, res) => {
  console.log(req.body.subjectDetailsArray); // Log the subjectDetailsArray
  
  // Call pdf.create with the correct parameters
  pdf.create(pdfTemplete(req.body), {}).toFile('result.pdf', (err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error creating PDF');
      } else {
          console.log('PDF created successfully');
          res.status(200).send('PDF created successfully');
      }
  });
});


//get pdf

app.get('/api/external/fetch-pdf',(req,res)=>{
  res.sendFile(`${__dirname}/result.pdf`)
})

// SSL options
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname,'sslCertificates','key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'sslCertificates','cert.pem'))
};

// Create HTTPS server
const ser = https.createServer(sslOptions, app);

// mongoose.connect('mongodb://127.0.0.1:27017/Login');

// const StudentSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     role: { type: String, default: 'student' } // Indicate the role in the schema
// });

// const TeacherSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     role: { type: String, default: 'teacher' } // Indicate the role in the schema
// });

// const StudentModel = mongoose.model("students", StudentSchema);
// const TeacherModel = mongoose.model("teachers", TeacherSchema);

// app.post("/login", (req, res) => {
//     const { username, password, role } = req.body;
//     const UserModel = role === 'student' ? StudentModel : TeacherModel;

//     UserModel.findOne({ username, password })
//         .then(user => {
//             if (user) {
//                 if (user.role === role) {
//                     res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} successfully logged in` });
//                 } else {
//                     res.json({ success: false, message: `You are not authorized as a ${role}` });
//                 }
//             } else {
//                 res.json({ success: false, message: "No record exists" });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ success: false, error: error.message });
//         });
// });

// app.listen(3001, () => {
//     console.log("Server is running");
// });

app.use("/api/auth", loginRoute);
app.use("/api/messages", messageRoute);
app.use("/api/classroom", classroomRoute);
app.use("/api/todo",todoRoute);
// app.use("",files);

// const multer  = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './files')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now()
//     cb(null,uniqueSuffix+file.originalname)
//   }
// })

// const upload = multer({ storage: storage })
// const upload = multer({ dest: './files' })

// app.post("/upload-files",upload.single("file"), async (req,res) => {
//   console.log(req.file);
//   res.send("hii");
// })

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error(err.message);
  });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  // console.log("New user connected");

  socket.on("add-user", (userId) => {
    // console.log(`User ${userId} connected`);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("Received message:", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(`Sending message to user ${data.to}`);
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
