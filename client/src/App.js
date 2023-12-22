//import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="studentDashboard" element={<StudentDashboard/>}/>
        <Route path="teacherDashboard" element={<TeacherDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
