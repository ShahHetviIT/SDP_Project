// import React, { useState, useEffect } from 'react'
// import Avatar from '@mui/material/Avatar';
// import '../Style/Style.css';
// import { Button, TextField } from '@mui/material';
// import Announcement from './Announcement';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// function Stream() {
//   const [selectedClassroom, setSelectedClassroom] = useState(null);
//   const [showInput, setShowInput] = useState(false);
//   const [inputValue, setInput] = useState('');
//   const [file, setFile] = useState('');
//   const [updateMaterials,setUpdateMaterials] = useState([]);
//   const location = useLocation();
//   useEffect(() => {
//     const classroomData = location.state ? location.state.classroomData : null;
//     setSelectedClassroom(classroomData.className);
//     console.log(classroomData.classname);
//     if (classroomData) {
//       setSelectedClassroom(classroomData.classname || '');
//     }
//   }, []);
//   const handleSubmit = async () => {
//     try {
//       const data = JSON.parse(sessionStorage.getItem("classroom-details"));
//       const formData = new FormData();
//       formData.append('title', file.name);
//       formData.append('file', file);
//       formData.append('inputValue', inputValue);
//       formData.append("classname", data.classname);
//       formData.append("classId", data._id);

//       const response = await axios.post(
//         'http://localhost:3001/api/classroom/upload-files',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       console.log('Announcement uploaded',response.data);
//       setShowInput(false);
//         console.log(response.data);
//       setUpdateMaterials([...updateMaterials, response.data]);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };
//   return (
//     <div className='main1'>
//       <div className='main'>
//         <div className='main_wrapper'>
//           <div className='main_content'>
//             <div className='main_wrapper1'>
//               <div className='main_bgImage'>
//                 <div className='main_emptyStyles' />
//               </div>
//               <div className='main_text'>
//                 <h1 className='main_heading main_overflow'>
//                   {selectedClassroom}
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='main_announce'>
//           <div className="main_status">
//             <p>Upcoming</p>
//             <p className='main_subText'>
//               No work due
//             </p>
//           </div>
//           <div className="main_announcements">
//             <div className="main_announcementsWrapper">
//               <div className="main_ancContent">
//                 {showInput ?
//                   <div className="main_form">
//                     <TextField
//                       id='filled-multiline-flexible'
//                       multiline
//                       label='Announce Something To Class'
//                       variant='filled'
//                       value={inputValue}
//                       onChange={(e) => setInput(e.target.value)} />
//                     <div className="main_buttons">
//                       <input variant='outlined' color='primary' type='file' onChange={(e) => setFile(e.target.files[0])} />
//                       <div>
//                         <Button onClick={() => setShowInput(false)}>Cancel</Button>
//                         <Button color='primary' variant='contained' onClick={handleSubmit}>Post</Button>
//                       </div></div>
//                   </div> : (
//                     <div className='main_wrapper3' onClick={() => setShowInput(true)}>
//                       <Avatar />
//                       <div>Announce Something to Class</div>
//                     </div>
//                   )}

//               </div>
//             </div>
//             <Announcement updateMaterials={updateMaterials}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Stream;


import React, { useState, useEffect } from 'react';
import '../Style/Stream.css';
import { AppBar, Button, Dialog, DialogActions, DialogContent,TextField, Toolbar, Typography } from '@mui/material';
import Announcement from './Announcement';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Stream() {
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState('');
  const [file, setFile] = useState('');
  const [updateMaterials, setUpdateMaterials] = useState([]);
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  useEffect(() => {
    const classroomData = location.state ? location.state.classroomData : null;
    if (classroomData) {
      setSelectedClassroom(classroomData.classname || '');
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(sessionStorage.getItem("classroom-details"));
      const formData = new FormData();
      formData.append('title', file.name);
      formData.append('file', file);
      formData.append('inputValue', inputValue);
      formData.append("classname", data.classname);
      formData.append("classId", data._id);

      const response = await axios.post(
        'http://localhost:3001/api/classroom/upload-files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Announcement uploaded', response.data);
      setShowInput(false);
      setUpdateMaterials([...updateMaterials, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  return (
    <div className='main1'>
      <AppBar position="static">
        <Toolbar className='header2'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} margin='15px' fontSize='2em'>
            {selectedClassroom}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='main'>
        <div className='main_wrapper'>
        </div>
        <div className='main_announce'>
          <div className="main_announcements">
            <div className="main_announcementsWrapper">
              <div className="main_ancContent">
                <Button onClick={() => setOpenDialog(true)}>Announce Something to Class</Button>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                  <DialogContent>
                    <TextField
                      id='filled-multiline-flexible'
                      multiline
                      label='Announce Something To Class'
                      variant='filled'
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <input className='btnfile'
                      variant='outlined'
                      color='primary'
                      type='file'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button color='primary' variant='contained' onClick={handleSubmit}>Post</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <Announcement updateMaterials={updateMaterials} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stream;
