// import React, { useState,useEffect } from 'react';
// import '../../style/Header.css';
// import Navbar from './Navbar';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FaPlus } from "react-icons/fa";
// import Createroom from './Createroom';
// import {host} from '../../utils/APIRoutes';
// import Classcard from './Classcard';
// //import Createroom from './Createroom';
// //import Plus from './Plus';
// export default function Header() {
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentImageType, setCurrentImageType] = useState(undefined);
//   const [classrooms, setClassrooms] = useState([]);
//   const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
//   const [refreshClasscard, setRefreshClasscard] = useState(false);
//   const toggleNavbar = () => {
//     setIsNavbarOpen(!isNavbarOpen);
//   };
//   const handleCreateRoomClick = () => {
//     setIsCreateRoomOpen(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await JSON.parse(sessionStorage.getItem("user"));
//         console.log(data);
//         if (data.isAvatarImageSet) {
//           console.log("avatar");
//           setCurrentUserName(data.username);
//           setCurrentUserImage(data.avatarImage);
//           setCurrentImageType("avatar");
//         } else {
//           console.log("profile");
//           setCurrentUserName(data.username);
//           setCurrentUserImage(data.profileImage);
//           setCurrentImageType("profile");
//         }
        
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
  
// }, []);
//   return (
//     <>
//     <div className='header-container'>
//       <div className='header1'>
//         <div className='title1'>
//         <GiHamburgerMenu className='header' onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
//         <header className='heading'>EduShare</header>
//         </div>
//          <div className='title1'>
//          <FaPlus className="plus" style={{ cursor: 'pointer' }} onClick={handleCreateRoomClick} />
//          <div className="current-user">
//             {currentImageType === "avatar" && (
//               <div className="avatar">
//                 <img
//                   className="avatarImage"
//                   src={`data:image/svg+xml;base64,${currentUserImage}`}
//                   alt="avatar"
//                 />
//               </div>
//             )}
//             {currentImageType === "profile" && (
//               <div className="avatar">
//                 <img
//                   className="avatarImage"
//                   src={`${host}/files/${currentUserImage}`}
//                   alt="avatar"
//                 />
//               </div>
//             )}
//             <div className="username">
//               <h2>Welcome {currentUserName} !</h2>
//             </div>
//           </div>
          
//          </div>
//       </div>
//       <Navbar show={isNavbarOpen} toggleNavbar={toggleNavbar} />
//      {isCreateRoomOpen && <Createroom setOpen={setIsCreateRoomOpen} setRefreshClasscard={setRefreshClasscard} />}
//      <div className='classcard'><Classcard  refresh={refreshClasscard} /></div>
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import '../../style/Header.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import Createroom from './Createroom';
import Classcard from './Classcard';
import {host} from '../../utils/APIRoutes';
export default function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);
  const [classrooms, setClassrooms] = useState([]);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [refreshClasscard, setRefreshClasscard] = useState(false);
  const [role, setRole] = useState(undefined);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCreateRoomClick = () => {
    setIsCreateRoomOpen(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/login");
    } else {
      const data = JSON.parse(sessionStorage.getItem("user"));
      setRole(data.role);
    }
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        console.log(data);
        if (data.isAvatarImageSet) {
          console.log("avatar");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
          setCurrentImageType("avatar");
        } else {
          console.log("profile");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.profileImage);
          setCurrentImageType("profile");
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

  }, [navigate]);

  return (
    <>
    <div className='header-container'>
      <div className='header1'>
        <div className='title1'>
          <GiHamburgerMenu className='header' onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
          <header className='heading'>EduShare</header>
        </div>
        <div className='title1'>
        {role === "teacher" && <FaPlus className="plus"  style={{ cursor: 'pointer' }} onClick={handleCreateRoomClick} />}
          <div className="current-user">
            {currentImageType === "avatar" && (
              <div className="avatar">
                <img
                  className="avatarImage"
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
            )}
            {currentImageType === "profile" && (
              <div className="avatar">
                <img
                  className="avatarImage"
                  src={`${host}/files/${currentUserImage}`}
                  alt="avatar"
                />
              </div>
            )}
            <div className="username">
              <h2>Welcome {currentUserName} !</h2>
            </div>
          </div>

        </div>
      </div>
     
      
    </div>
     <Navbar show={isNavbarOpen} toggleNavbar={toggleNavbar} />
     {isCreateRoomOpen && <Createroom setOpen={setIsCreateRoomOpen} setRefreshClasscard={setRefreshClasscard} />}
     <div className='classcard'><Classcard  refresh={refreshClasscard} /></div>
    </>
  );
}
