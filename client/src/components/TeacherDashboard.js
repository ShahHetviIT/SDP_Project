import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authToken from localStorage
    sessionStorage.clear();
    navigate("/login");

    // Redirect to the login page
    // navigate('/login');

    // // Disable the back button
    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function () {
    //   window.history.go(1);
    // };
  };

  return (
    <div>
      <h2>Welcome, Teacher!</h2>
      {/* Add content specific to the teacher page */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TeacherDashboard;
