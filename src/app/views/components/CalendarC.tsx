import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarioService } from "../../services/calendarioService";
import AddIcon from "@mui/icons-material/Add";
import {
  calendario,
  eventoc,
  RESPONSEC,
} from "../../interfaces/calendario/calendario";
import { getUser } from "../../services/localStorage";
import { Button, Grid, Typography } from "@mui/material";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import CalendarCModal from "./CalendarCModal";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/user/UserInfo";


const CalendarC = () => {

  const user: USUARIORESPONSE= JSON.parse(String(getUser()));
  const [eventos, setEventos] = useState<eventoc[]>();
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [id, setId] = useState("");
  const today = new Date();


  const onSelectEvent = (v: any) => {
    setId(v.id);
    setTipoOperacion(2);
    setModo("Editar Evento");
    setVrows(v);
    setOpen(true);
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


    setVrows({ start: Fecha_inicio, end: Fecha_fin });
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);

  };

  const onClickAgregarEvento = () => {
    setTipoOperacion(1);
    setModo("Agregar Evento");
    setOpen(true);
    setVrows("");
  };

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4, CHUSER: user.Id });
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar éste evento?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: id,
          CHUSER: user.Id
        };

        CalendarioService.calendarios(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Evento Eliminado!",
            });

            handleClose();
          } else {
            AlertS.fire({
              title: "¡Error!",
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

  const consulta = (data: any) => {
    CalendarioService.calendarios(data).then((res) => {
      if (res.SUCCESS) {
        const even: calendario = res;
        let eveitem: eventoc[] = [];
        even.RESPONSE.map((item: RESPONSEC) => {
          let it = {
            id: item.id,
            title: item.NombreEvento,
            allDay: true,
            start: new Date(item.InicioEvento),
            end: new Date(item.FinEvento),
          };
          eveitem.push(it);
        });

        setEventos(eveitem);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {
    consulta({ NUMOPERACION: 4, CHUSER: user.Id });
  }, []);

  return (
    <>
      {open ? (
        <CalendarCModal
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
      <Grid container   justifyContent="flex-end" spacing={1} paddingTop={4}>
        <Grid
          item
          xs={12} sm={4} md={2.6}
           lg={2.5} xl={2}
          sx={{
            paddingTop: "1%",
            paddingRight: "2%",
            mb: 1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            onClick={onClickAgregarEvento}
            className="agregar"
            // variant="contained"
            startIcon={<AddIcon className="IconoStartIcon" />}
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
          height: "calc( 80rem - 80% )",
          margin: "2%",
        }}
        messages={getMessagesES()}
        onSelectEvent={(v) => onSelectEvent(v)}
        onSelectSlot={(v) => SelectSlot(v)}
        selectable
        popup={true}
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
