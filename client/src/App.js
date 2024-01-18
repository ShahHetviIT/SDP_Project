import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Contacts from "./components/Contacts";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import SetAvatar from "./components/SetAvatar";
import Chatbox from "./components/Chatbox";


const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     const authToken = sessionStorage.getItem("user");
  //     setIsAuthenticated(!!authToken);
  //     setLoading(false);
  //   };

  //   checkAuthentication();
  // }, []);

  // if (loading) {
  //   // You might want to show a loading spinner or some indication while checking authentication
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
