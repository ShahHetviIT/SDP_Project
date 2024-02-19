// const Pdf = require('../models/workModel');

// // Controller functions

// module.exports.addWork = async (req, res) => {
//   try {
//     // Assuming file is uploaded using multer and available in req.file
//     const { originalname, path } = req.file;
//     const pdf = new Pdf({
//       filename: originalname,
//       filepath: path,
//     });
//     await pdf.save();
//     res.status(201).json({ message: 'PDF uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading PDF:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports.uploadWork = async (req, res) => {
//   try {
//     const pdf = await Pdf.findById(req.params.id);
//     res.set('Content-Type', 'application/pdf');
//     res.sendFile(pdf.filepath);
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(404).json({ error: 'PDF not found' });
//   }
// };

// // Add more controller functions as needed (e.g., deletePdf, updatePdf)
