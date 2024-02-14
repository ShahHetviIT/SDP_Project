// Attendance.js

import React, { useState, useEffect } from "react";
import "../style/Attendance.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRouteStudents, getTeacherSubjectRoute } from "../utils/APIRoutes";
import Sessional1 from "./Sessional1";
import Sessional2 from "./Sessional2";
import Sessional3 from "./Sessional3";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Attendance() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentContacts, setStudentContacts] = useState([]);
  const [sessioanl1, setSessional1] = useState(false);
  const [sessioanl2, setSessional2] = useState(false);
  const [sessioanl3, setSessional3] = useState(false);
  const [teacherLecture, setTeacherLecture] = useState([]);
  const [teacherLab, setTeacherLab] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  // console.log(sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
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
        const user = await JSON.parse(
          sessionStorage.getItem("user")
        );
        console.log("user"+user.userId);
        const TeacherSubjects = await axios.get(`${getTeacherSubjectRoute}/${user.userId}`);
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

  const handleSessiaonal1 = () => {
    setSessional1(true);
    setSessional2(false);
    setSessional3(false);
  };

  const handleSessiaonal2 = () => {
    setSessional1(false);
    setSessional2(true);
    setSessional3(false);
  };

  const handleSessiaonal3 = () => {
    setSessional1(false);
    setSessional2(false);
    setSessional3(true);
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
          <button
            className="btn navbar-toggler"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand">Navbar</a>
          <div className="current-user">
          <div className="avatar">
              <img className="avatarImage"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>Welcome {currentUserName} !</h2>
            </div>
          </div>
        </div>
      </nav>
      {sidebarOpen && (
        <div className="sidebar">
          <div>hello</div>
          <div>hello</div>
        </div>
      )}

      <div className="sessionalButtons">
        <button onClick={handleSessiaonal1} className="btn">
          <span>Sessional 1</span>
        </button>
        <button onClick={handleSessiaonal2} className="btn">
          <span>Sessional 2</span>
        </button>
        <button onClick={handleSessiaonal3} className="btn">
          <span>Sessional 3</span>
        </button>
      </div>

      {sessioanl1 && <Sessional1 studentContacts={studentContacts} teacherLecture={teacherLecture} teacherLab={teacherLab}  />}

      {sessioanl2 && <Sessional2 studentContacts={studentContacts} teacherLecture={teacherLecture} teacherLab={teacherLab} />}

      {sessioanl3 && <Sessional3 studentContacts={studentContacts} teacherLecture={teacherLecture} teacherLab={teacherLab}  />}
      {/* <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Sessional 1</th>
            <th>Sessional 2</th>
            <th>Sessional 3</th>
          </tr>
        </thead>
        <tbody>
          {studentContacts.map((student) => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td className="insideColumn">
                <table>
                  <thead>
                    <tr>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="insideColumn">
                <table>
                  <thead>
                    <tr>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="insideColumn">
                <table>
                  <thead>
                    <tr>
                      <th>Column 1</th>
                      <th>Column 2</th>
                      <th>Column 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                      <td><input type="number" className="inp"/></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
