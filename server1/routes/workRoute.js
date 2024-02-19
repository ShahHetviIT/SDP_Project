// // const{
// //     addWork,
// //     uploadWork,
// // } = require("../controllers/workController");
// const router = require("express").Router();
// const multer = require("multer");
// const upload = require("../middleware/multer1");
// const Work = require("../models/workModel");

// // router.post("/addWork", addWork);
// // router.post("uploadWork",uploadWork);
// const upload = multer({dest: "./work"})
// router.post("/upload-files",upload.single("file"),async(req,res)=>{
//     console.log(req.file);
    
// })
