import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Classcard from "./Classcard";
import "../../style/Home.css";
import { useNavigate } from "react-router-dom";
//import To_do from './To_do';
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem("user")) {
          //console.log("logon");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);
  return (
    <div>
      <Header />
      <Navbar />

      {/* <div className='classcard'>
          <Classcard />
        </div> */}
    </div>
  );
}
