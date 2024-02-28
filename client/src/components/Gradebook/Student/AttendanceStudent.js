// import React, { useState, useEffect } from "react";
// import Sessional1 from "./Sessional1";
// import Sessional2 from "./Sessional2";
// import Sessional3 from "./Sessional3";
// import "../../../style/Attendance.css";
// import { getCurrentStudentRoute,host } from "../../../utils/APIRoutes";
// import axios from "axios";
// import Gradebook from "../../../assets/gradebook.png";
// import Logout from "../../Logout";

// export default function AttendanceStudent() {
//   const [sessioanl1, setSessional1] = useState(false);
//   const [sessioanl2, setSessional2] = useState(false);
//   const [sessioanl3, setSessional3] = useState(false);
//   const [external, setExternal] = useState(false);
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentImageType, setCurrentImageType] = useState(undefined);
//   const [currentStudent, setCurrentStudent] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await JSON.parse(sessionStorage.getItem("user"));
//         if (data.isAvatarImageSet) {
//           setCurrentUserName(data.username);
//           setCurrentUserImage(data.avatarImage);
//           setCurrentImageType("avatar");
//         } else {
//           setCurrentUserName(data.username);
//           setCurrentUserImage(data.profileImage);
//           setCurrentImageType("profile");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     const fetchCurrentStudent = async () => {
//       try {
//         const data = await JSON.parse(sessionStorage.getItem("user"));
//         const getCurrentStudent = await axios.get(
//           `${getCurrentStudentRoute}/${data.userId}`
//         );
//         setCurrentStudent(getCurrentStudent.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//     fetchCurrentStudent();
//   }, []);

//   const handleSessiaonal1 = () => {
//     setSessional1(true);
//     setSessional2(false);
//     setSessional3(false);
//     setExternal(false);
//   };

//   const handleSessiaonal2 = () => {
//     setSessional1(false);
//     setSessional2(true);
//     setSessional3(false);
//     setExternal(false);
//   };

//   const handleSessiaonal3 = () => {
//     setSessional1(false);
//     setSessional2(false);
//     setSessional3(true);
//     setExternal(false);
//   };

//   const handleExternal = () => {
//     setSessional1(false);
//     setSessional2(false);
//     setSessional3(false);
//     setExternal(true);
//   }

//   return (
//     <div className="container-body">
//       <nav className="navbar navbar-expand-lg navbar-light bg-primary">
//         <div className="container-fluid">
//           <div className="gradebookTitle">
//             <img src={Gradebook} alt="" />
//             <div>Gradebook</div>
//           </div>
//           <div className="current-user">
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
//             <Logout />
//           </div>
//         </div>
//       </nav>

//       <div className="sessionalButtons">
//       <button className="btn">
//           <span> Dashboard</span>
//         </button>
//         <button onClick={handleSessiaonal1} className="btn">
//           <span>Sessional 1</span>
//         </button>
//         <button onClick={handleSessiaonal2} className="btn">
//           <span>Sessional 2</span>
//         </button>
//         <button onClick={handleSessiaonal3} className="btn">
//           <span>Sessional 3</span>
//         </button>
//         <button onClick={handleExternal} className="btn">
//           <span>External</span>
//         </button>
//       </div>

//       <div className="sessional">
//         {sessioanl1 && <Sessional1 currentStudent={currentStudent} />}

//         {sessioanl2 && <Sessional2 currentStudent={currentStudent} />}

//         {sessioanl3 && <Sessional3 currentStudent={currentStudent} />}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Sessional1 from "./Sessional1";
import Sessional2 from "./Sessional2";
import Sessional3 from "./Sessional3";
import "../../../style/Attendance.css";
import { getCurrentStudentMarksRoute, host } from "../../../utils/APIRoutes";
import axios from "axios";
import Gradebook from "../../../assets/gradebook.png";
import Logout from "../../Logout";
import { Link } from "react-router-dom";
import External from "./External";
import { fetchPdfRoute } from "../../../utils/APIRoutes";

export default function AttendanceStudent() {
  const [sessioanl1, setSessional1] = useState(false);
  const [sessioanl2, setSessional2] = useState(false);
  const [sessioanl3, setSessional3] = useState(false);
  const [external, setExternal] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);
  const [currentStudent, setCurrentStudent] = useState([]);
  const [currentsemester, setCurrentSemester] = useState(null);
  const [enrollmentYear, setEnrollmentYear] = useState(null);
  const [examResult, setExamResult] = useState(true);
  const [semesterClick, setSemesterClick] = useState(null);

  const generateRows = () => {
    return Array.from({ length: currentsemester }, (_, index) => index + 1);
  };

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
        setCurrentSemester(data.semester);
        setEnrollmentYear(data.enrollmentYear);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchCurrentStudent = async (semester) => {
    try {
      const data = await JSON.parse(sessionStorage.getItem("user"));

      console.log(semester);
      const getCurrentStudent = await axios.post(
        `${getCurrentStudentMarksRoute}/${data.userId}`,
        { semester }
      );

      setCurrentStudent(getCurrentStudent.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSessiaonal1 = (semester) => {
    const sem = "semester" + semester;
    console.log(sem);
    setSemesterClick(sem);

    setSessional1(true);
    setSessional2(false);
    setSessional3(false);
    setExternal(false);
    setExamResult(false);
    console.log(semesterClick + "-========");
    fetchCurrentStudent("semester" + semester);
  };

  const handleSessiaonal2 = (semester) => {
    const sem = "semester" + semester;
    setSemesterClick(sem);
    setSessional1(false);
    setSessional2(true);
    setSessional3(false);
    setExternal(false);
    setExamResult(false);
    fetchCurrentStudent("semester" + semester);
  };

  const handleSessiaonal3 = (semester) => {
    const sem = "semester" + semester;
    setSemesterClick(sem);
    setSessional1(false);
    setSessional2(false);
    setSessional3(true);
    setExternal(false);
    setExamResult(false);
    fetchCurrentStudent("semester" + semester);
  };

  const handleExternal = (semester) => {
    const sem = "semester" + semester;
    setSemesterClick(sem);
    setSessional1(false);
    setSessional2(false);
    setSessional3(false);
    setExternal(true);
    setExamResult(false);
    fetchCurrentStudent("semester" + semester);
  };

  const handleExamResult = () => {
    setSessional1(false);
    setSessional2(false);
    setSessional3(false);
    setExternal(false);
    setExamResult(true);
  };

  const getPdf = async () => {
    try {
      const response = await axios.get(fetchPdfRoute, {
        responseType: "blob", // Set response type to 'blob'
      });

      // Create a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob object
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Use the URL to create a link element
      const link = document.createElement("a");
      link.href = pdfUrl;

      // Set the link's attributes for downloading the PDF
      link.setAttribute("download", "result.pdf");
      document.body.appendChild(link);

      // Trigger a click event on the link to start the download
      link.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="container-body">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary navbarGradebook">
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

      <div className="sessionalButtons">
        <button className="btn">
          <span> Dashboard</span>
        </button>
        <button className="btn" onClick={handleExamResult}>
          <span>Exam Result</span>
        </button>
      </div>

      <div className="sessional">
        {examResult && (
          <table>
            <thead>
              <tr>
                <th>External Result</th>
                <th colSpan={3}>Sessional Result</th>
                <th>Batch Year</th>
                <th>Semester</th>
                <th>Reg Exam No</th>
                <th>Rem1 Exam No</th>
                <th>Rem2 Exam No</th>
                <th>Provisional Marksheet</th>
              </tr>
            </thead>
            <tbody>
              {generateRows().map((semester) => (
                <tr key={semester}>
                  <td>
                    <Link onClick={() => handleExternal(semester)}>
                      External
                    </Link>
                  </td>
                  <td>
                    <Link onClick={() => handleSessiaonal1(semester)}>
                      Sessional 1
                    </Link>
                  </td>
                  <td>
                    <Link onClick={() => handleSessiaonal2(semester)}>
                      Sessional 2
                    </Link>
                  </td>
                  <td>
                    <Link onClick={() => handleSessiaonal3(semester)}>
                      Sessional 3
                    </Link>
                  </td>
                  <td>{enrollmentYear}</td>
                  <td>{semester}</td> {/* Display semester number */}
                  <td>{/* Populate with reg exam no data */}</td>
                  <td>{/* Populate with rem1 exam no data */}</td>
                  <td>{/* Populate with rem2 exam no data */}</td>
                  <td>
                    {semester === 5 && <Link onClick={getPdf}>Download</Link>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {external && (
          <External
            currentStudent={currentStudent}
            semesterClick={semesterClick}
          />
        )}
        {sessioanl1 && <Sessional1 currentStudent={currentStudent} />}

        {sessioanl2 && <Sessional2 currentStudent={currentStudent} />}

        {sessioanl3 && <Sessional3 currentStudent={currentStudent} />}
      </div>
    </div>
  );
}
