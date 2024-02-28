import React from 'react';

export default function Sessional3({ currentStudent }) {
  const sessional3Data = currentStudent.sessional3;
  console.log(sessional3Data);
  const subjects = currentStudent.subjects || [];

  const totalMarks = subjects.reduce((total, subject) => {
    console.log(subject);
    return (
      total +
      (parseInt(
        sessional3Data.marksLecture[subject.name]?.reduce(
          (acc, mark) => acc + mark,
          0
        )
      ) || 0)
    );
  }, 0);

  // Convert totalExamMarks to integers and calculate total possible marks
  const totalPossibleMarks = subjects.reduce((total, subject) => {
    return total + (parseInt(sessional3Data.totalExamMarks[subject.name]) || 0);
  }, 0);

  // Convert attendance to integers and calculate total attendance
  const totalAttendance = subjects.reduce((total, subject) => {
    return (
      total +
      (parseInt(sessional3Data.attendanceLecture[subject.name]) || 0) +
      (parseInt(sessional3Data.attendanceLab[subject.name]) || 0)
    );
  }, 0);

  // Calculate total possible attendance based on the actual number of lectures and labs for each subject
  const totalPossibleAttendance = subjects.reduce((total, subject) => {
    const lectures =
      parseInt(sessional3Data.totalAttendanceLecture[subject.name]) || 0;
    const labs = parseInt(sessional3Data.totalAttendanceLab[subject.name]) || 0;
    // Ensure lectures and labs are valid numbers
    const totalAttendanceForSubject = parseInt(lectures) + parseInt(labs);
    console.log(totalAttendanceForSubject);
    if (!isNaN(totalAttendanceForSubject)) {
      return total + totalAttendanceForSubject;
    } else {
      return total; // Exclude invalid attendance values from the total
    }
  }, 0);

  const marksPercentage = totalPossibleMarks !== 0 ? (totalMarks / totalPossibleMarks) * 100 : 0;
  const attendancePercentage = totalPossibleAttendance !== 0 ? (totalAttendance / totalPossibleAttendance) * 100 : 0;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="8">Sessional 3</th>
          </tr>
          <tr>
          <th style={{width:'5%'}} colSpan="1">Subject Code</th>
            <th style={{width: '20%'}} className='wid' colSpan="1">Subject Name</th>
            <th className='wid' colSpan="1">Marks</th>
            <th className='wid' colSpan="1">Marks Out Of</th>
            <th className='wid' colSpan="1">Lecture Attendance</th>
            <th className='wid' colSpan="1">Lecture Attendance Out Of</th>
            <th className='wid' colSpan="1">Lab Attendance</th>
            <th className='wid' colSpan="1">Lab Attendance Out Of</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.code}</td>
              <td>{subject.fullName}</td>
              <td>{sessional3Data.marksLecture[subject.name]?.join(", ") || ''}</td>
              <td>{sessional3Data.totalExamMarks[subject.name]}</td>
              <td>{sessional3Data.attendanceLecture[subject.name]}</td>
              <td>{sessional3Data.totalAttendanceLecture[subject.name]}</td>
              <td>{sessional3Data.attendanceLab[subject.name]}</td>
              <td>{sessional3Data.totalAttendanceLab[subject.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='card1'>
      <h6>Total Marks: {totalMarks}</h6>
        <h6>Marks Percentage: {marksPercentage.toFixed(2)}%</h6>
        <h6>Attendance Percentage: {attendancePercentage.toFixed(2)}%</h6>
      </div>
    </>
  );
}
