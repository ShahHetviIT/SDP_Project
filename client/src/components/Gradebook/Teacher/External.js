import React, { useState,useEffect } from "react";
import axios from "axios";

import {
    marksAttendanceExternalRoute,
    getMarksAttendanceExternalRoute,
    getTotalMarksAttendanceExternalRoute,
  } from "../../../utils/APIRoutes";

export default function External({
  studentContacts,
  teacherLecture,
  teacherLab,
}) {
  // Initialize marks state with the correct structure
  const initialMarksState = () => {
    return studentContacts.map((student) => {
      const studentMarks = {};
      teacherLecture.forEach((lecture) => {
        studentMarks[lecture] = { marks: "", type: "lecture" };
      });
      teacherLab.forEach((lab) => {
        studentMarks[lab] = { marks: "", type: "lab" };
      });
      return { _id: student._id, marks: studentMarks };
    });
  };

  const initialTotalState = () => {
    const lectureTotal = teacherLecture.reduce((acc, lecture) => {
      acc[lecture] = { totalMarks: "", type: "lecture" };
      return acc;
    }, {});
    const labTotal = teacherLab.reduce((acc, lab) => {
      acc[lab] = { totalMarks: "", type: "lab" };
      return acc;
    }, {});
    return { ...lectureTotal, ...labTotal };
  };

  const [marks, setMarks] = useState(initialMarksState());
  const [total, setTotal] = useState(initialTotalState);

  const handleTotalChange = (subject, type, value, typeOf) => {
    setTotal((prevTotal) => ({
      ...prevTotal,
      [subject]: {
        ...prevTotal[subject],
        [type]: value,
        type: typeOf,
      },
    }));
  };

  useEffect(() => {
    const external = "external";
    const fetchMarksAttendance = async () => {
      try {
        // console.log(studentContacts);
        // Fetch marks and attendance data from the server
        const data = await JSON.parse(sessionStorage.getItem("user"));
        const semester = "semester"+data.semester;
        const response = await axios.post(getMarksAttendanceExternalRoute, {
          studentContacts,external,semester
        });

        // Map the fetched data to update the marks state
        const updatedMarks = studentContacts.map((student) => {
          const studentMarks = {};
          teacherLecture.forEach((lecture) => {
            studentMarks[lecture] = {
              marks: response.data[student._id]?.marksLecture[lecture] || "",
              type: "lecture",
            };
          });
          teacherLab.forEach((lab) => {
            studentMarks[lab] = {
              marks: response.data[student._id]?.marksLab[lab] || "",
              type: "lab",
            };
          });
          return {
            _id: student._id,
            name: student.username,
            marks: studentMarks,
          };
        });
        // console.log(updatedMarks);

        // Set the updated marks state
        setMarks(updatedMarks);

        const response1 = await axios.post(getTotalMarksAttendanceExternalRoute, {
          studentContacts,external,semester
        });

        const { totalExamMarks, totalLabMarks } =
          response1.data;

          const updatedTotal = {};

          // Compare and assign values for lecture subjects
          teacherLecture.forEach((lecture) => {
            if (totalExamMarks.hasOwnProperty(lecture)) {
              updatedTotal[lecture] = {
                totalMarks: totalExamMarks[lecture][0] || "",
              };
            }
          });
          
          // Compare and assign values for lab subjects
          teacherLab.forEach((lab) => {
            if (totalLabMarks.hasOwnProperty(lab)) {
              updatedTotal[lab] = {
                totalAttendance: totalLabMarks[lab][0] || ""
              };
            }
          });
          

        // console.log(updatedTotal);

        setTotal(updatedTotal);
        // console.log(total);
      } catch (error) {
        console.log("Error fetching marks and attendance:", error);
      }
    };

    // Call the fetchMarksAttendance function
    fetchMarksAttendance();
  }, [studentContacts, teacherLecture, teacherLab]);

  const handleMarksChange = (studentIndex, subject, type, value) => {
    setMarks((prevMarks) => {
      const newMarks = [...prevMarks];
      newMarks[studentIndex].marks[subject][type] = value;
      return newMarks;
    });
  };

  const handleSave = async () => {
    console.log(total);
    console.log("Saved marks:", marks);

    try {
      const data = await JSON.parse(sessionStorage.getItem("user"));
      const semester = "semester"+data.semester;
      const external = "external";
      const result = await axios.post(marksAttendanceExternalRoute, { marks, total, external,semester});

      if (result.data.success) {
        console.log("Marks inserted Successfully");
      } else {
        console.log("Marks not inserted");
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={teacherLecture.length + teacherLab.length + 2}>
              External
            </th>
          </tr>
          <tr>
            <th rowSpan="3">Roll No.</th>
            <th rowSpan="3">Students Name</th>
          </tr>
          <tr>
            <th colSpan={teacherLecture.length}>Lectures</th>
            <th colSpan={teacherLab.length}>Labs</th>
          </tr>
          <tr>
            {teacherLecture.map((lecture, index) => (
              <React.Fragment key={index}>
                <th>
                  {lecture}
                  <br />
                  (Marks)
                </th>
              </React.Fragment>
            ))}
            {teacherLab.map((lab, index) => (
              <th key={index}>
                {lab}
                <br />
                (Marks)
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentContacts.map((student, index) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td className="studentName">{student.username}</td>
              {teacherLecture.map((lecture, lectureIndex) => (
                <td key={lectureIndex}>
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={marks[index]?.marks[lecture].marks || ""}
                    onChange={(e) =>
                      handleMarksChange(
                        index,
                        lecture,
                        "marks",
                        e.target.value
                      )
                    }
                  />
                </td>
              ))}
              {teacherLab.map((lab, labIndex) => (
                <td key={labIndex}>
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={marks[index]?.marks[lab].marks || ""}
                    onChange={(e) =>
                      handleMarksChange(index, lab, "marks", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th colSpan={2}>Total</th>
            {teacherLecture.map((lecture, lectureIndex) => (
              <th key={lectureIndex}>
                <input
                  type="number"
                  placeholder="-"
                  className="inp"
                  value={total[lecture]?.totalMarks || ""}
                  onChange={(e) =>
                    handleTotalChange(
                      lecture,
                      "totalMarks",
                      e.target.value,
                      "lecture"
                    )
                  }
                />
              </th>
            ))}
            {teacherLab.map((lab, labIndex) => (
              <th key={labIndex}>
                <input
                  type="number"
                  placeholder="-"
                  className="inp"
                  value={total[lab]?.totalMarks || ""}
                  onChange={(e) =>
                    handleTotalChange(lab, "totalMarks", e.target.value, "lab")
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="buttons">
        <button className="btn saveBtn" onClick={handleSave}>
          <span>Save</span>
        </button>
        <button className="btn saveBtn">
          <span>Cancel</span>
        </button>
      </div>
    </>
  );
}
