import React from 'react'
import Header from '../Component/Header'
import Navbar from '../Component/Navbar';
import Classcard from '../Classcard/Classcard';
import '../Style/Home.css'
//import To_do from './To_do';
export default function Home() {
  return (
    <div>
     <Header />
        <Navbar />
        <div className='classcard'>
          <Classcard />
        </div>
    </div>
  )
}
