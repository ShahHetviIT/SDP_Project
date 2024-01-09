import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chatbox from './components/Chatbox';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const authToken = localStorage.getItem('authToken');
      setIsAuthenticated(!!authToken);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    // You might want to show a loading spinner or some indication while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          // If authenticated, allow access to the Chat component and other authenticated routes
          <>
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />

            {/* Add more authenticated routes as needed */}
          </>
        ) : (
          // If not authenticated, show the login page by default
          <Route index element={<Login />} />
        )}
        {/* Redirect to login if an unknown route is accessed */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
