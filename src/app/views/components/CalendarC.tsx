import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarioService } from "../../services/calendarioService";
import AddIcon from "@mui/icons-material/Add";
import {
  calendario,
  eventoc,
  RESPONSE,
} from "../../interfaces/calendario/calendario";
import { previousDay } from "date-fns";
import { getUser, validaLocalStorage } from "../../services/localStorage";
import { Button, Grid } from "@mui/material";
import { Toast } from "../../helpers/Toast";
import { Alert } from "../../helpers/Alert";
import CalendarCModal from "./CalendarCModal";

const CalendarC = () => {
  const user = getUser();

  const [eventos, setEventos] = useState<eventoc[]>();

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);

  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);


  const today = new Date();

  const onSelectEvent = () => {
    
    alert("event selected");
  };

  const handleSelectSlot = () => {
    console.log("Slot clicked");
  };

  const SelectSlot = ({ start, end }: { start: any; end: any }) => {
    console.log("Selected", start, end);
    validaLocalStorage(start);
  };

  const onClickAgregarEvento =() =>{
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  }

  const handleClose = () => {
    setOpen(false);
    consulta({NUMOPERACION: 4 })

  };

  const consulta = (data: any) => {
    CalendarioService.calendarios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

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
    <>
    {open ? (
      <CalendarCModal
        open={open}
        modo={modo}
        tipo={tipoOperacion}
        handleClose={handleClose}
        dt={vrows}
      />
    ) : (
      ""
    )}
      <Grid container spacing={1} >
        <Grid
          item
          xs={12}
          sx={{
            mb:1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button onClick={onClickAgregarEvento} variant="contained" startIcon={<AddIcon/>}>
            Agregar Evento
          </Button>
        </Grid>
      </Grid>
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
        onSelectSlot={SelectSlot}
        selectable
        popup
        //  eventPropGetter={ eventStyleGetter }
        //   components={{
        //     event: CalendarEvent
        //    }}
        //  onView={ onViewChanged }
        //TODO No se ven los eventos por vista semana o día
        min={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)
        }
        // end time 5:00pm
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18)
        }
      />
    </>
  );
};

export default CalendarC;
