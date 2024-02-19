// import './App.css';
// import Header from './Component/Header';
// import Navbar from './Component/Navbar';
// import Archived_class from './Pages/Archived_class';
// import Calender from './Pages/Calender';
// import Home from './Pages/Home';
// import Setting from './Pages/Setting';
// import { BrowserRouter as Router,Routes } from 'react-router-dom';
// import Classcard from './Classcard/Classcard';
// import Stream from './Component/Stream';
// function App() {
//   return (
    
//    <>
//    <Router>
//    <Header/>
//    <Navbar/>
//    <div className='classcard'><Classcard/>
//    </div>
   
//    <Routes path='/stream' element={<Stream/>}/>
//     <Routes path='./classcard' element={<Classcard/>}/>
//     <Routes path='/' exact={true} component ={Home}/>
//     <Routes path='/Pages/Calender' exact={true} component ={Calender}/>
//     <Routes path='/Archived_classes' exact={true} component ={Archived_class}/>
//     <Routes path='/Setting' exact={true} component ={Setting}/>
    
   
//    </Router>
   
//    </>
//   // <Router>
//   //   <Routes>
//   //     <Route index element={<Classroom/>}/>
//   //   </Routes>
//   // </Router>

//   );
// }

// export default App;


// import './App.css';

import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stream from './Component/Stream';

function App() {
  return (
    <>
      <Router>
      
        <Routes>
        <Route path="/stream/:id" element={<Stream />} />
          <Route index element={<Home />} />
          
          {/* <Route path='/Calender' element={<Calender />} /> */}
          {/* <Route path='/Archived_classes' element={<Archived_class />} /> */}
          {/* <Route path='/Setting' element={<Setting />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
