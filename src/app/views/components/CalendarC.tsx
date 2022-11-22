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
  RESPONSE,
} from "../../interfaces/calendario/calendario";
import { getUser } from "../../services/localStorage";
import { Button, Grid } from "@mui/material";
import { Toast } from "../../helpers/Toast";
import { AlertS } from "../../helpers/AlertS";
import CalendarCModal from "./CalendarCModal";
import Swal from "sweetalert2";
import { UserReponse } from "../../interfaces/user/UserReponse";


const CalendarC = () => {

  const user: RESPONSE = JSON.parse(String(getUser()));
  const [eventos, setEventos] = useState<eventoc[]>();
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const today = new Date();

  //console.log("modo", modo);

  const onSelectEvent = (v: any) => {

    //console.log(v);
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
    //console.log("SelectSlot fecha inicio", Fecha_inicio, " Fecha fin ", Fecha_fin);

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
          CHUSER: user.id
        };

        CalendarioService.calendarios(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            handleClose();
          } else {
            AlertS.fire({
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
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };



  const moviendoEventos = (v: any) => {
    //console.log(v);

  }

  useEffect(() => {
    consulta({ NUMOPERACION: 4 ,CHUSER:user.id});
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
      <Grid container spacing={1} paddingTop={4}>
        <Grid
          item
          xs={12}
          sx={{
            paddingTop:"1%",
            paddingRight:"2%",
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
          height: "calc( 80rem - 80% )",
          margin:"2%",
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
