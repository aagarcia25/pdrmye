import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarioService } from "../../services/calendarioService";
import moment from "moment";
import {
  calendario,
  eventoc,
  RESPONSE,
} from "../../interfaces/calendario/calendario";
import { previousDay } from "date-fns";

const CalendarC = () => {

  const [eventos, setEventos] = useState<eventoc[]>();

  const today = new Date();

  const onSelectEvent = () => {
    
    alert("Evento seleccionado");
  };

  const handleSelectSlot = () =>{
    console.log("Slot clicked");
  }

  useEffect(() => {
    CalendarioService.calendarios({ NUMOPERACION: "4", CHUSER: "1" }).then(
      (res: any) => {
        const even: calendario = res;
        //setEventos(even.RESPONSE);
        let eveitem: eventoc[] = [];
        even.RESPONSE.map((item: RESPONSE) => {
          let it = {
            id: item.id,
            title: item.NombreEvento,
            allDay: true,
            start: new Date(item.InicioEvento),
            end: new Date(item.FinEvento),
          };
          eveitem.push(it);
        });
        console.log(eveitem);
        setEventos(eveitem);
      }
    );
  }, []);

  return (
    <Calendar
      culture="es"
      localizer={localizer}
      events={eventos}
      showAllEvents
      // defaultView={ lastView }
      startAccessor="start"
      endAccessor="end"
      style={{
        height: "calc( 80vh - 80px )",
      }}
      messages={getMessagesES()}
      onSelectEvent={onSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable
      //  eventPropGetter={ eventStyleGetter }
      //   components={{
      //     event: CalendarEvent
      //    }}
      //  onView={ onViewChanged }
      //TODO No se ven los eventos por vista semana o día
      min={
        new Date(
          today.getFullYear(), 
          today.getMonth(), 
          today.getDate(), 
          9
        )
      }
  // end time 5:00pm
     max={
       new Date(
         today.getFullYear(), 
         today.getMonth(), 
         today.getDate(), 
         18
       )
     }
    />
  );
};

export default CalendarC;
