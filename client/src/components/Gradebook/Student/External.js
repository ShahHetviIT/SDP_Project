// import React from "react";

// export default function External({ currentStudent }) {
//   const subjects = currentStudent.subjects.name || []; // Ensure subjects is an array or initialize it as an empty array

//   const calculatePercentage = (
//     subject,
//     externalLectureMarks,
//     sessional1LectureMarks,
//     sessional2LectureMarks,
//     sessional3LectureMarks,
//     externalLabMarks
//   ) => {
//     // Calculate total lecture marks
//     const totalLectureMarks =
//       externalLectureMarks +
//       ((sessional1LectureMarks +
//         sessional2LectureMarks +
//         sessional3LectureMarks)/3);

//     // Calculate total lab marks
//     const totalLabMarks = externalLabMarks;

//     console.log(
//       subject +
//         "-" +
//         externalLectureMarks +
//         "-" +
//         sessional1LectureMarks +
//         "-" +
//         sessional2LectureMarks +
//         "-" +
//         sessional3LectureMarks +
//         "-" +
//         externalLabMarks
//     );

//     let totalMarks;

//     if (totalLectureMarks && totalLabMarks) {
//       totalMarks = (totalLectureMarks+4 + totalLabMarks) / 150;
//     } else if (totalLectureMarks) {
//       totalMarks = (totalLectureMarks+4) / 100;
//     } else {
//       totalMarks = totalLabMarks / 50;
//     }

//     return calculateGrade(totalMarks*100); // Calculating percentage
//   };

//   const calculateGrade = (totalMarks) => {
//     if (totalMarks >= 85 && totalMarks <= 100) {
//       return "AA";
//     } else if (totalMarks >= 75 && totalMarks <= 84) {
//       return "AB";
//     } else if (totalMarks >= 65 && totalMarks <= 74) {
//       return "BB";
//     }else if (totalMarks >= 55 && totalMarks <= 64){
//         return "BC";
//     }else if (totalMarks >= 45 && totalMarks <= 54){
//         return "CC";
//     }else if (totalMarks >= 40 && totalMarks <= 44){
//         return "CD";
//     }else{
//         return "FF";
//     }
//   };

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th colSpan="8">Sessional 1</th>
//           </tr>
//           <tr>
//             <th className="wid" colSpan="1">
//               Subject Name
//             </th>
//             <th className="wid" colSpan="1">
//               External Status
//             </th>
//             <th className="wid" colSpan="1">
//               Sessional Status
//             </th>
//             <th className="wid" colSpan="1">
//               Practical Status
//             </th>
//             <th className="wid" colSpan="1">
//               Subject Points
//             </th>
//             <th className="wid" colSpan="1">
//               Subject Grade
//             </th>
//             <th className="wid" colSpan="1">
//               Subject Credit
//             </th>
//             <th className="wid" colSpan="1">
//               Subject Status
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject, index) => {
//             const lectureMarks =
//               currentStudent.external.marksLecture[subject]?.[0] || 0;
//             const labMarks =
//               currentStudent.external.marksLab[subject]?.[0] || 0;

//             const lectureSessional1Marks =
//               currentStudent.sessional1.marksLecture[subject]?.[0] || 0;

//             const lectureSessional2Marks =
//               currentStudent.sessional2.marksLecture[subject]?.[0] || 0;

//             const lectureSessional3Marks =
//               currentStudent.sessional3.marksLecture[subject]?.[0] || 0;

//             const subjectGrade = calculatePercentage(
//               subject,
//               lectureMarks,
//               lectureSessional1Marks,
//               lectureSessional2Marks,
//               lectureSessional3Marks,
//               labMarks
//             );

//             return (
//               <tr key={index}>
//                 <td>{subject}</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>{subjectGrade}</td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { createPdfRoute } from "../../../utils/APIRoutes";

export default function External({ currentStudent, semesterClick }) {
  // console.log("==========");
  // console.log(currentStudent.rollNo);
  const subjects = currentStudent.subjects || [];
  const [currentSemester, setCurrentSemester] = useState(false);
  const [totalCredit, setTotalCredit] = useState(null);
  const [totalEarnedCredit, setTotalEarnedCredit] = useState(null);

  const subjectDetailsArray = [];

  const createPdf = async (subjectDetailsArray) => {
    const data = await JSON.parse(sessionStorage.getItem("user"));
    const studentName = data.username;
    const studentSem = data.semester;
    const studentRollNo = currentStudent.rollNo;
    const studentId = currentStudent.identityNo;
    const examDate = currentStudent.dateOfExam;

    console.log(subjectDetailsArray);

    // Check if all necessary data is available
    if (
      subjectDetailsArray &&
      studentName &&
      studentSem &&
      studentRollNo &&
      studentId &&
      examDate
    ) {
      let totalCredit = 0;
      let totalEarnedCredit = 0;
      subjectDetailsArray.map((subject) => {
        totalCredit += subject.subjectCredit;
        totalEarnedCredit += subject.subjectPoint;
      });

      setTotalCredit(totalCredit);
      setTotalEarnedCredit(totalEarnedCredit);
      const spi = totalEarnedCredit / totalCredit;
      const result = await axios.post(createPdfRoute, {
        subjectDetailsArray,
        studentName,
        studentSem,
        studentRollNo,
        studentId,
        examDate,
        totalCredit,
        totalEarnedCredit,
      });
    } else {
      console.error("Some data is missing to create PDF.");
    }
  };

  useEffect(() => {
    // Check if the lengths of subjects and subjectDetailsArray are equal
    if (subjects.length > 0 && subjects.length === subjectDetailsArray.length) {
      createPdf(subjectDetailsArray);
    }
  }, [subjectDetailsArray]);

  const handleSubjectSelect = (
    subjectCode,
    subjectName,
    subjectCredit,
    subjectPoint,
    subjectGrade,
    subjectStaus
  ) => {
    const subjectDetails = {
      subjectCode: subjectCode,
      subjectName: subjectName,
      subjectCredit: subjectCredit,
      subjectPoint: subjectPoint,
      subjectGrade: subjectGrade,
      subjectStaus: subjectStaus,
    };

    // Push subject details to the array
    subjectDetailsArray.push(subjectDetails);

    // Print array for debugging
    // console.log(subjectDetailsArray);
    // Add your logic to handle the selected subject
  };

  const calculateOverallResult = () => {
    // Iterate through subjectDetailsArray and check their statuses
    let overallResult = "PASS";

    subjectDetailsArray.forEach((subject) => {
      // Assuming each subject object has a property named 'status'
      if (subject.subjectStaus !== "PASS") {
        console.log(subject.subjectStaus);
        overallResult = "FAIL";
        return; // Exit loop if any subject fails
      }
    });

    return overallResult;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(sessionStorage.getItem("user"));
      const semester = "semester" + data.semester;

      if (semesterClick === semester) {
        setCurrentSemester(false);
      } else {
        setCurrentSemester(true);
        // Call createPdf when the semester changes
      }
    };

    fetchData();
  }, [semesterClick]); // Adding semesterClick as a dependency
  // console.log(subjects);
  // console.log(semesterClick);

  const calculatePercentage = (
    subject,
    externalLectureMarks,
    sessional1LectureMarks,
    sessional2LectureMarks,
    sessional3LectureMarks,
    externalLabMarks
  ) => {
    // Calculate total lecture marks
    let totalSessionalMarks;
    const totalLectureMarks = externalLectureMarks;
    if (
      sessional1LectureMarks ||
      sessional2LectureMarks ||
      sessional3LectureMarks
    ) {
      totalSessionalMarks =
        (sessional1LectureMarks +
          sessional2LectureMarks +
          sessional3LectureMarks) /
          3 +
        4;
    }

    // Calculate total lab marks
    const totalLabMarks = externalLabMarks;

    // console.log(
    //   subject +
    //     "-" +
    //     externalLectureMarks +
    //     "-" +
    //     sessional1LectureMarks +
    //     "-" +
    //     sessional2LectureMarks +
    //     "-" +
    //     sessional3LectureMarks +
    //     "-" +
    //     externalLabMarks
    // );

    let totalMarks;

    if (totalLectureMarks && totalLabMarks && totalSessionalMarks) {
      // console.log(1);
      totalMarks =
        (totalLectureMarks + totalLabMarks + totalSessionalMarks) / 150;
    } else if (totalLectureMarks && totalSessionalMarks) {
      // console.log(2);
      // console.log(totalLectureMarks + "==" + totalSessionalMarks);
      totalMarks = (totalLectureMarks + totalSessionalMarks) / 100;
    } else if (totalLectureMarks) {
      // console.log(3);
      totalMarks = totalLectureMarks / 60;
    } else {
      console.log(4);
      totalMarks = totalLabMarks / 50;
    }

    return calculateGrade(totalMarks * 100); // Calculating percentage
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 85 && totalMarks <= 100) {
      return "AA";
    } else if (totalMarks >= 75 && totalMarks <= 84) {
      return "AB";
    } else if (totalMarks >= 65 && totalMarks <= 74) {
      return "BB";
    } else if (totalMarks >= 55 && totalMarks <= 64) {
      return "BC";
    } else if (totalMarks >= 45 && totalMarks <= 54) {
      return "CC";
    } else if (totalMarks >= 40 && totalMarks <= 44) {
      return "CD";
    } else {
      return "FF";
    }
  };

  const calculateSubjectPoint = (grade, point) => {
    let subjectPoint;
    switch (grade) {
      case "AA":
        subjectPoint = 10 * point;
        break;
      case "AB":
        subjectPoint = 9 * point;
        break;
      case "BB":
        subjectPoint = 8 * point;
        break;
      case "BC":
        subjectPoint = 7 * point;
        break;
      case "CC":
        subjectPoint = 6 * point;
        break;
      case "CD":
        subjectPoint = 5 * point;
        break;
      case "FF":
        subjectPoint = 4 * point;
        break;
      default:
        subjectPoint = 0;
        break;
    }

    return subjectPoint;
  };

  const calculateExternalStatus = (externalMarks) => {
    if (externalMarks === 0) {
      return "--";
    }
    const result = (externalMarks / 60) * 100;
    return result < 40 ? "FAIL" : "PASS";
  };

  const calculateSessionalStatus = (sess1, sess2, sess3) => {
    if (sess1 === 0 && sess2 === 0 && sess3 === 0) {
      return "--";
    }

    const result = ((sess1 + sess2 + sess3 / 3 + 4) / 40) * 100;
    return result < 40 ? "FAIL" : "PASS";
  };

  const calculatePracticalStatus = (practicalMarks) => {
    if (practicalMarks === 0) {
      return "--";
    }

    const result = (practicalMarks / 50) * 100;
    return result < 40 ? "FAIL" : "PASS";
  };

  const calculateSubjectStatus = (external, sessional, practical) => {
    if (external === "FAIL" || sessional === "FAIL" || practical === "FAIL") {
      return "FAIL";
    } else {
      return "PASS";
    }
  };

  return (
    <>
      {currentSemester ? (
        <table>
          <thead>
            <tr>
              <th colSpan="9">External</th>
            </tr>
            <tr>
              <th style={{ width: "5%" }} colSpan="1">
                Subject Code
              </th>
              <th style={{ width: "20%" }} colSpan="1">
                Subject Name
              </th>
              <th className="wid" colSpan="1">
                External Status
              </th>
              <th className="wid" colSpan="1">
                Sessional Status
              </th>
              <th className="wid" colSpan="1">
                Practical Status
              </th>
              <th className="wid" colSpan="1">
                Subject Points
              </th>
              <th className="wid" colSpan="1">
                Subject Grade
              </th>
              <th className="wid" colSpan="1">
                Subject Credit
              </th>
              <th className="wid" colSpan="1">
                Subject Status
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const lectureMarks =
                currentStudent.external.marksLecture[subject.name]?.[0] || 0;
              const labMarks =
                currentStudent.external.marksLab[subject.name]?.[0] || 0;

              const lectureSessional1Marks =
                currentStudent.sessional1.marksLecture[subject.name]?.[0] || 0;

              const lectureSessional2Marks =
                currentStudent.sessional2.marksLecture[subject.name]?.[0] || 0;

              const lectureSessional3Marks =
                currentStudent.sessional3.marksLecture[subject.name]?.[0] || 0;

              const subjectGrade = calculatePercentage(
                subject.name,
                lectureMarks,
                lectureSessional1Marks,
                lectureSessional2Marks,
                lectureSessional3Marks,
                labMarks
              );

              const externalStatus = calculateExternalStatus(lectureMarks);
              const sessionalStatus = calculateSessionalStatus(
                lectureSessional1Marks,
                lectureSessional2Marks,
                lectureSessional3Marks
              );
              const practicalStatus = calculatePracticalStatus(labMarks);
              const subjectStaus = calculateSubjectStatus(
                externalStatus,
                sessionalStatus,
                practicalStatus
              );

              const subjectPoints = calculateSubjectPoint(
                subjectGrade,
                subject.credits
              );
              handleSubjectSelect(
                subject.code,
                subject.fullName,
                subject.credits,
                subjectPoints,
                subjectGrade,
                subjectStaus
              );

              return (
                <tr key={index}>
                  <td>{subject.code}</td>
                  <td>{subject.fullName}</td>
                  <td>{externalStatus}</td>
                  <td>{sessionalStatus}</td>
                  <td>{practicalStatus}</td>
                  <td>{subjectPoints}</td>
                  <td>{subjectGrade}</td>
                  <td>{subject.credits}</td>
                  <td>{subjectStaus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="noDetails">
          <div>no details</div>
        </div>
      )}

      <div className="card1" style={{display:'flex',gap:'15px'}}>
        <div style={{display:'flex',alignItems:'flex-end',flexDirection:'column'}}>
          <div>Credits :</div>
          <div>SPIPoints : </div>
          <div>SPI : </div>
          <div>Result: </div>
        </div>
        <div>
          <div>{totalCredit}</div>
          <div>{totalEarnedCredit}</div>
          <div>{totalEarnedCredit / totalCredit}</div>
          <div>{calculateOverallResult()} </div>
        </div>
      </div>
    </>
  );
}
