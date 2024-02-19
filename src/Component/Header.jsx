import React, { useState } from 'react';
import '../Style/Header.css';
import Navbar from './Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import Createroom from './Createroom';
//import Createroom from './Createroom';
//import Plus from './Plus';
export default function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <div className='header-container'>
      <div className='header1'>
        <GiHamburgerMenu className='header' onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        <header className='heading'>EduShare</header>
         <Createroom/>
         <CgProfile className='profile'/>
      </div>
      <Navbar show={isNavbarOpen} toggleNavbar={toggleNavbar} />
    </div>
  );
}