// Attendance.js

import React, { useState, useEffect } from "react";
import "../../../style/Attendance.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  allUsersRouteStudents,
  getTeacherSubjectRoute,
  host,
} from "../../../utils/APIRoutes";
import Sessional1 from "./Sessional1";
import Sessional2 from "./Sessional2";
import Sessional3 from "./Sessional3";
import External from "./External";
import Gradebook from "../../../assets/gradebook.png";
import Logout from "../../Logout";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function AttendanceTeacher() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentContacts, setStudentContacts] = useState([]);
  const [sessioanl1, setSessional1] = useState(false);
  const [sessioanl2, setSessional2] = useState(false);
  const [sessioanl3, setSessional3] = useState(false);
  const [external, setExternal] = useState(false);
  const [teacherLecture, setTeacherLecture] = useState([]);
  const [teacherLab, setTeacherLab] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);
  // console.log(sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem("user")) {
          //console.log("logon");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        if (data.isAvatarImageSet) {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
          setCurrentImageType("avatar");
        } else {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.profileImage);
          setCurrentImageType("profile");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const user = await JSON.parse(sessionStorage.getItem("user"));
        console.log("user" + user.userId);
        const TeacherSubjects = await axios.get(
          `${getTeacherSubjectRoute}/${user.userId}`
        );
        console.log(TeacherSubjects.data.lectures);
        setTeacherLecture(TeacherSubjects.data.lectures);
        setTeacherLab(TeacherSubjects.data.lab);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem("user")) {
          //console.log("logon");
          navigate("/login");
        } else {
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDashboardNavigate = () => {
    navigate("/teacherDashboard");
  }

  const handleSessiaonal1 = () => {
    setSessional1(true);
    setSessional2(false);
    setSessional3(false);
    setExternal(false);
  };

  const handleSessiaonal2 = () => {
    setSessional1(false);
    setSessional2(true);
    setSessional3(false);
    setExternal(false);
  };

  const handleSessiaonal3 = () => {
    setSessional1(false);
    setSessional2(false);
    setSessional3(true);
    setExternal(false);
  };

  const handleExternal = () => {
    setSessional1(false);
    setSessional2(false);
    setSessional3(false);
    setExternal(true);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const studentData = await axios.get(`${allUsersRouteStudents}`);
        setStudentContacts(studentData.data);
        // console.log("hello");
        // console.log(studentData.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container-body">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
        <div className="gradebookTitle">
            <img src={Gradebook} alt="" />
            <div>Gradebook</div>
          </div>
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
            <Logout />
          </div>
        </div>
      </nav>

      <div style={{paddingTop:"40px"}} className="sessionalButtons">
        <button onClick={handleDashboardNavigate} className="btn">
          <span> Dashboard</span>
        </button>
        <button onClick={handleSessiaonal1} className="btn">
          <span>Sessional 1</span>
        </button>
        <button onClick={handleSessiaonal2} className="btn">
          <span>Sessional 2</span>
        </button>
        <button onClick={handleSessiaonal3} className="btn">
          <span>Sessional 3</span>
        </button>
        <button onClick={handleExternal} className="btn">
          <span>External</span>
        </button>
      </div>

      <div className="sessional">
        {sessioanl1 && (
          <Sessional1
            studentContacts={studentContacts}
            teacherLecture={teacherLecture}
            teacherLab={teacherLab}
          />
        )}

        {sessioanl2 && (
          <Sessional2
            studentContacts={studentContacts}
            teacherLecture={teacherLecture}
            teacherLab={teacherLab}
          />
        )}

        {sessioanl3 && (
          <Sessional3
            studentContacts={studentContacts}
            teacherLecture={teacherLecture}
            teacherLab={teacherLab}
          />
        )}

        {external && (
          <External
            studentContacts={studentContacts}
            teacherLecture={teacherLecture}
            teacherLab={teacherLab}
          />
        )}
      </div>
    </div>
  );
}
