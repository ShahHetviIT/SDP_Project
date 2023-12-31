import "../App.css";
import teacherImage from "../images/teacher.png";
import studentImage from "../images/student.png";
import image from "../images/image-2.png";
import React, { useState } from "react";
import axios from "axios";
import "../fonts/linearicons/style.css";
import { useNavigate } from "react-router-dom";
import {loginRoute} from "../utils/APIRoutes"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [selectedRole, setSelectedRole] = useState("teacher");
  const navigate = useNavigate();
  const validateForm = () => {
    // Simple validation: Check if fields are empty
    if (!username) {
      setUsernameValidation(
        '<i class="fa-solid fa-circle-exclamation" style="color: #ff1414;"></i>'
      );
    } else {
      setUsernameValidation("");
    }

    if (!password) {
      setPasswordValidation(
        '<i class="fa-solid fa-circle-exclamation" style="color: #ff1414;"></i>'
      );
    } else {
      setPasswordValidation("");
    }

    if (!password || !username) {
      return;
    }

    // If validation passes, you can redirect to the next page
    // window.location.href = "next_page.html";
  };

  //JavaScript to change the image based on the selected role
  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
  };

  const handleSubmit = async (event) => {
    const errorDiv = document.getElementById("loginError");
    errorDiv.classList.remove("shake");
    event.preventDefault();
  
    try {
      const result = await axios.post(loginRoute, {
        username,
        password,
        role: selectedRole,
      });
  
      if (result.data.success) {
        console.log("Login successful");
        // Store the authentication token securely (e.g., in local storage)
        localStorage.setItem('authToken', result.data.token);
        // Redirect based on the role
        if (selectedRole === "teacher") {
          navigate("/teacherDashboard");
        } else if (selectedRole === "student") {
          navigate("/studentDashboard");
        }
      } else {
        console.log("Login failed:", result.data.message);
        errorDiv.className = "login-error shake";
        errorDiv.innerHTML = "* Username or password is incorrect";
        errorDiv.style.padding = "0px 0 15px";
      }
    } catch (error) {
      console.error("Error during form submission:", error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response status code:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }
  
      // Handle the error as needed
    }
  };
  
  

  return (
    <div className="wrapper">
      <div className="inner">
        <img
          src={selectedRole === "teacher" ? teacherImage : studentImage}
          alt=""
          className="image-1"
          id="roleImage"
          style={{ left: selectedRole === "teacher" ? "-191px" : "-275px" }}
        />
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="form-holder">
            <span className="lnr lnr-user"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span
              className="validation"
              dangerouslySetInnerHTML={{ __html: usernameValidation }}
            ></span>
          </div>
          <div className="form-holder">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="validation"
              dangerouslySetInnerHTML={{ __html: passwordValidation }}
            ></span>
          </div>
          <div id="loginError">
            
          </div>
          <div className="form-group">
            <label className="control-label">Login as:</label>
            <div>
              <div className="form-holder">
                <span id="emogi">
                  {selectedRole === "teacher" ? "👩‍🏫" : "👩‍🎓"}
                </span>
                <select
                  name="role"
                  className="form-control"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                <span className="dropDownArrow">
                  <i
                    className="fa-solid fa-angle-down"
                    style={{ color: "#666" }}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <button type="submit" onClick={validateForm}>
            <span>Login</span>
          </button>
        </form>
        <img src={image} alt="" className="image-2" />
      </div>
    </div>
  );
}

export default Login;
