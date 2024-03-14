// import React from 'react'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// export default function Calender() {
//   return (
//     <div>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar />
//     </LocalizationProvider>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../style/Calender.css';

function Calendar() {
  return (
    <div className="calendar-container">
      <h1>Calender</h1>
      <FullCalendar
      className='btnCalendar'
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        buttonText={{
          prev: 'Previous',
          next: 'Next'
        }}
        events={[
          { title: 'Event 1', date: '2022-03-01' },
          { title: 'Event 2', date: '2022-03-05' }
        ]}
      />
    </div>
  );
}

export default Calendar;