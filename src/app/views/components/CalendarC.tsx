import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';

import { CalendarioService } from '../../services/calendarioService';

const CalendarC = () => {


  const [eventos, setEventos] = useState([]);



  useEffect(() => {
    CalendarioService.calendarios ({ NUMOPERACION: "4" ,CHUSER:"1"}).then((res:any) => {
      setEventos(res.RESPONSE);
    });
  }, []);

 


  
  return (

    <Calendar
        culture='es'
        localizer={ localizer }
        events={ eventos }
       // defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 90vh - 80px )' }}
        messages={ getMessagesES() }
      //  eventPropGetter={ eventStyleGetter }
     //   components={{
     //     event: CalendarEvent
    //    }}
     //   onDoubleClickEvent={ onDoubleClick }
      // onSelectEvent={ onSelect }
      //  onView={ onViewChanged }
      />

 
   
  )
}

export default CalendarC
