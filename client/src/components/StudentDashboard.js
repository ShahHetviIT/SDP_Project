import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authToken from localStorage
    localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/login');

    // Disable the back button
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
    window.history.go(1);
    };

  };

  return (
    <div>
      <h2>Welcome, Student!</h2>
      {/* Add content specific to the student page */}
      
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;
