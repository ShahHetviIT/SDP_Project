import '../../style/Navbar.css'
import { Divider } from '@mui/material'
import { FiHome } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { IoArchiveSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SiGoogleclassroom } from "react-icons/si";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import {getClassroomDetailsRoute,getArchiveClassroomDetailsRoute} from "../../utils/APIRoutes";


const Navbar = ({ show,toggleNavbar }) => {
 // const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  const [archiveClass, setArchiveClass ] = useState([]);
  useEffect(() => {
    const fetchClassname = async () => {
      try {
        const response = await axios.post(getClassroomDetailsRoute);
        const archive = await axios.get(getArchiveClassroomDetailsRoute);
        // console.log("archive",archive.data);
        // console.log(response.data);
        setEnrolled(response.data);
        setArchiveClass(archive.data);
      } catch (error) {
        console.error('Error fetching classroom details:', error);
      }
    };

    fetchClassname();
  }, []);
  const navigate = useNavigate();

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <div style={{marginTop: '44px'}}>
        <RxCross1 onClick={toggleNavbar} className='closebtn' style={{marginTop: '20px'}}/>
      <ul>
        <li>
          <Link to='/'>
            <FiHome />
            Home
          </Link>
        </li>
        <li>
          <Link to='/Calender'>
            <SlCalender />
            Calender
          </Link>
        </li>
        <Divider className='divider' />
        <div className='title' >Teaching</div>
        <li>
          <Link to='/Todo'>
            <LuListTodo />To Do
          </Link>
        </li>

        {enrolled.map((classroom, index) => (
            <li key={index} onClick={() => navigate(`/stream/:id`)}>
            <Link>
                <SiGoogleclassroom />{classroom.classname}
            </Link>
            </li>
        ))}


        <Divider className='divider' />
        <li onClick={()=>navigate(`/archive_class`)}>
          <Link>
            <IoArchiveSharp />
            Archived classes
          </Link>
        </li>

        {archiveClass.map((classroom, index) => (
            <li key={index} onClick={() => navigate(`/stream/:id`)}>
            <Link>
                <SiGoogleclassroom />{classroom.classname}
            </Link>
            </li>
        ))}
      </ul>


    </div>
    </div>
  )
}

export default Navbar
