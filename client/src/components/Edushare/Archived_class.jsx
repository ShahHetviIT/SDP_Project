// ArchiveClass.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {deleteClassroomDetailsRoute} from '../../utils/APIRoutes';
const ArchiveClass = () => {
  const [archivedClassrooms, setArchivedClassrooms] = useState([]);

  useEffect(() => {
    const fetchArchivedClassrooms = async () => {
      try {
        const response = await axios.get(deleteClassroomDetailsRoute);
        setArchivedClassrooms(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArchivedClassrooms();
  }, []);

  return (
    <div>
      <h1>Archived Classrooms</h1>
      {archivedClassrooms.map((classroom) => (
        <div key={classroom._id}>
          <p>Class Name: {classroom.classname}</p>
          <p>Subject: {classroom.subject}</p>
          <p>Teacher: {classroom.teacher}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default ArchiveClass;
