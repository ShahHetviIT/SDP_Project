import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbox from './components/Chatbox';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard'; 
import TeacherDashboard from './components/TeacherDashboard';
import SetAvatar from './components/SetAvatar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const authToken = localStorage.getItem("user");
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
      <Route index element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path='/setAvatar' element={<SetAvatar />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          </>
        ) : (
          <Route index path='/login' element={<Login />} />
        )}
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route index path="/login" element={<Login />} />
//         <Route path="/studentDashboard" element={<StudentDashboard />} />
//         <Route path="/teacherDashboard" element={<TeacherDashboard />} />
//         <Route path='/chatbox' element={<Chatbox/>} />
//         <Route path="/setAvatar" element={<SetAvatar />} />
//       </Routes>
//     </Router>
//   );
// };

export default App;