import React from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../helpers/calendarLocalizer';
import { getMessagesES } from '../helpers/getMessages';
import Layout from '../layout/Layout';

const CalendarC = () => {
  return (
    <Layout>
    <Calendar
        culture='es'
        localizer={ localizer }
       // events={ events }
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
      //  onSelectEvent={ onSelect }
      //  onView={ onViewChanged }
      />

   </Layout>
   
  )
}

export default CalendarC
