import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function TeacherDashboard() {
  const navigate = useNavigate();
  const handleTutorBot = () => {
    navigate('/chatbox');
  }

  const handleProfileImage = () => {
    navigate('/select');
  }

  const handleGradebook = () => {
    navigate('/attendanceTeacher');
  }

  return (
    <Container>
      <div className="allBtns">
        <button onClick={handleTutorBot} className="btn">
          <span>TutorBot</span>
        </button>
        <button  className="btn">
          <span>EduShare Hub</span>
        </button>
        <button onClick={handleGradebook} className="btn">
          <span>Gradebook</span>
        </button>
        <button onClick={handleProfileImage} className="btn">
          <span>Update Profile Image</span>
        </button>
      </div>
    </Container>
  );
}

export default TeacherDashboard;

const Container = styled.div`
  .allBtns {
    display: flex;
    gap: 30px;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .btn {
    margin-top: 0;
    padding: 10px 20px;
    border: none;
    background: #99ccff;
    color: #fff;
    text-transform: uppercase;
    font-family: "Muli-SemiBold";
    font-size: 15px;
    letter-spacing: 2px;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;
  }
  .btn:active {
    background: #99ccff;
  }
`;
