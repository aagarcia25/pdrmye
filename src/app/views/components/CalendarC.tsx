import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { render } from "react-dom";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";

import { CalendarioService } from "../../services/calendarioService";
import moment from "moment";
import { calendario, eventoc, RESPONSE } from "../../interfaces/calendario/calendario";

const CalendarC = () => {
  const [eventos, setEventos] = useState<eventoc[]>();

  const location = momentLocalizer(moment);

  const pruebaEventos = [
    {
      id: 1,
      title: "titulo",
      start: "2022-09-14T10:00:00",
      end: "2022-09-14T12:00:00",
    },
    {
      id: 2,
      title: "rompe",
      start: "2022-09-14T10:00:00",
      end: "2022-09-14T12:00:00",
    },
  ];

  const eventosFormato = eventos?.map((item: any) => {
    return {
      id: item.id,
      title: item.NombreEvento,
      start: item.InicioEvento,
      end: item.FinEvento,
    };
  });

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
          }
          eveitem.push(it)
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
      //  eventPropGetter={ eventStyleGetter }
      //   components={{
      //     event: CalendarEvent
      //    }}
      //   onDoubleClickEvent={ onDoubleClick }
      // onSelectEvent={ onSelect }
      //  onView={ onViewChanged }
      //TODO No se ven los eventos por vista semana o día
    />
  );
};

export default CalendarC;
