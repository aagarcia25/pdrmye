import React, { Fragment, useCallback, useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { AnyMxRecord } from "dns";
import moment from "moment";


const CalendarC = () => {
  const user = getUser();
  const [eventos, setEventos] = useState<eventoc[]>();
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows,           setVrows] = useState({});
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const today = new Date();

  const onSelectEvent = (v: any) => {
    handleEdit(v);
  };

  const handleSelectSlot = () => {
    console.log("Slot clicked");
  };

  const SelectSlot = ({ start, end }: { start: any; end: any }) => {


    var inicio = new Date(start)
    var fechainicio = inicio.getFullYear() + '-' + ('0' + (inicio.getMonth() + 1)).slice(-2) + '-' + ('0' + inicio.getDate()).slice(-2);
    var horainicio = ('0' + inicio.getHours()).slice(-2) + ':' + ('0' + inicio.getMinutes()).slice(-2);
    var Fecha_inicio = fechainicio + 'T' + horainicio;


    var fin = new Date(end)
    var fechafin = fin.getFullYear() + '-' + ('0' + (fin.getMonth() + 1)).slice(-2) + '-' + ('0' + fin.getDate()).slice(-2);
    var horafin = ('0' + fin.getHours()).slice(-2) + ':' + ('0' + fin.getMinutes()).slice(-2);
    var Fecha_fin = fechafin + 'T' + horafin;



    
    setVrows({ start:Fecha_inicio   , end: Fecha_fin});
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);
    console.log("SelectSlot vrow",vrows);

  };

  const onClickAgregarEvento = () => {
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);
    setVrows("");
  };

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "info",
      title: "Estas seguro de eliminar este evento?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: id,
          CHUSER: 1,
        };

        CalendarioService.calendarios(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            handleClose();
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleEdit = (v: any) => {
    console.log(v);
    setId(v.id);
    setTipoOperacion(2);
    setModo("Editar Evento");
    setVrows(v);
    setOpen(true);
  };

  const consulta = (data: any) => {
    CalendarioService.calendarios(data).then((res) => {
      if (res.SUCCESS) {
        const even: calendario = res;
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
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setEventos(eveitem);
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
    consulta({ NUMOPERACION: 4 });
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
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sx={{
            mb: 1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            onClick={onClickAgregarEvento}
            variant="contained"
            startIcon={<AddIcon />}
          >
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
        onSelectEvent={(v) => onSelectEvent(v)}
        onSelectSlot={(v) => SelectSlot(v)}
        selectable
        popup
        min={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)
        }
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18)
        }
      />
    </>
  );
};

export default CalendarC;
