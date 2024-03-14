const classroomModel = require("../models/classroomModel");
const archiveclassModel = require('../models/archiveclassModel');
module.exports.addClassroom = async (req, res, next) => {
    try {
        const { classRoom, subject,teacher } = req.body; // Corrected variable names

        const data = await classroomModel.create({
            classname: classRoom, // Corrected variable name
            subject: subject,
            teacher: teacher, // Corrected variable name
        });

        if (data) return res.json({ msg: "Classroom details added successfully" });
        else {
            console.log("Failed");
            return res.json({ msg: "Failed to add classroom details to the database" });
        }
    } catch (ex) {
        console.log("error");
        next(ex);
    }
};

module.exports.getClassroom = async (req, res, next) => {
    try {
        // Assuming you want to retrieve all classroom details
        const classroomDetails = await classroomModel.find(); // Corrected model name
    
        res.status(200).json(classroomDetails);
    } catch (error) {
        console.error('Error fetching classroom details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getArchiveClassroom = async (req,res,next) => {
  try {
    // Assuming you want to retrieve all classroom details
    const classroomDetails = await archiveclassModel.find(); // Corrected model name

    res.status(200).json(classroomDetails);
} catch (error) {
    console.error('Error fetching classroom details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

module.exports.deleteClassroom = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Fetch the classroom data from classroomModel database
    const classroomData = await classroomModel.findById(id);
    if (!classroomData) {
      return res.status(404).json({ success: false, message: 'Classroom not found in classroomModel database' });
    }

    // Create a new object for the archived classroom data
    // const archivedClassroomData = { ...classroomData.toObject(), _id: undefined };

    const { _id,createdAt,updatedAt,__v, ...archivedClassroomData } = classroomData.toObject();
    console.log(archivedClassroomData);
    
    // Save the classroom data to archiveClassModel database
    const archivedClassroom = await archiveclassModel.create({
      pdf: classroomData.pdf,
      pdfName: classroomData.pdfName,
      description: classroomData.description,
      classname: classroomData.classname,
      subject: classroomData.subject,
      teacher: classroomData.teacher
    });    

    // Delete the classroom from classroomModel database
    const deletedClassroom = await classroomModel.findByIdAndDelete(id);
    if (!deletedClassroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found in classroomModel database' });
    }
    res.status(200).json({ success: true, message: 'Classroom deleted successfully', data: { deletedClassroom, archivedClassroom } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


//     try {
//         const { id, pdfName } = req.params; // Extract classroom ID and PDF index from request parameters
        
//         const updatedClassroom = await Classroom.findByIdAndUpdate(
//             id,
//             {
//                 $pull: { // Use $pull operator to remove the specified PDF and its metadata
//                     pdf: {  pdfName },
//                     pdfName: {  pdfName },
//                     description: {  pdfName }
//                 }
//             },
//             { new: true } // Return the updated document
//         );

//         if (updatedClassroom) {
//             return res.json({ msg: "PDF deleted successfully.", data: updatedClassroom });
//         } else {
//             console.log("Failed to delete PDF.");
//             return res.status(400).json({ msg: "Failed to delete PDF." });
//         }
//     } catch (error) {
//         console.error("Error deleting PDF:", error);
//         res.status(500).json({ msg: "Internal server error" });
//     }
module.exports.deletePdf = async (req, res) => {
  try {
    const classroom = await classroomModel.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const pdfName = classroom.pdfName[0]; // Assuming there's only one PDF file
    const filePath = path.join(__dirname, `../files/pdf/${pdfName}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'PDF file deleted' });
    } else {
      res.status(404).json({ message: 'PDF file not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 
