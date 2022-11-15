import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Input,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../helpers/AlertS";
import { Toast } from "../../helpers/Toast";
import { eventoc } from "../../interfaces/calendario/calendario";
import { CalendarioService } from "../../services/calendarioService";
import { CatalogosServices } from "../../services/catalogosServices";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserReponse } from "../../interfaces/user/UserReponse";
import { getUser } from "../../services/localStorage";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { COLOR } from "../../styles/colors";

const CalendarCModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
  handleDelete,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
  handleDelete: Function;
}) => {
  var hoy = new Date();
  var fecha =
    hoy.getFullYear() +
    "-" +
    ("0" + (hoy.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + hoy.getDate()).slice(-2);
  var hora =
    ("0" + hoy.getHours()).slice(-2) + ":" + ("0" + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + "T" + hora;
  //MIN Y MAX DE FECHAS
  const [inicioEventoMin, setInicioEventoMin] = useState(Fecha_min);
  const [finEventoMax, setFinEventoMax] = useState("2100-09-30 13:16:00");

  //CAMPOS
  const [id, setId] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
   const [nombreEvento, setNombreEvento] = useState("");
  const [finEvento, setFinEvento] = useState(Fecha_min);
  const [inicioEvento, setInicioEvento] = useState(Fecha_min);
  const [departamento, setDepartamento] = useState("");
  const [eventoRepetitivo, setEventoRepetitivo] = useState(Boolean);
  const [values, setValues] = useState<eventoc[]>();
  //Usandose en select departamentos
  const [departamentos, setDepartamentos] = useState("");

  const [modoModal, setModoModal] = useState(modo);


  const departamentosc = () => {
    let data = {};
    CatalogosServices.departamentos(data).then((res) => {
      //  console.log(res);
      setDepartamentos(res.RESPONSE);
    });
  };

  const handleSend = () => {
    if (nombreEvento == null || nombreEvento == "") {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
      
    }
    if (finEvento <= inicioEvento){
        AlertS.fire({
        title: "Error!",
        text: "La fecha fin del evento no puede ser antes de la fecha inicio.",
        icon: "error",
      });
      setFinEvento(inicioEvento);
    }
    else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        MODIFICADOPOR: 1,
        NOMBREEVENTO: nombreEvento,
        INICIOEVENTO: inicioEvento,
        FINEVENTO: finEvento,
        ASIGNADOA: 1,
        DEPARTAMENTO: "511732b0-2b01-11ed-afdb-040300000000",
      };

      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR
      editar(data);
    }
  };

  const agregar = (data: any) => {
    CalendarioService.calendarios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
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
  };

  const editar = (data: any) => {
    CalendarioService.calendarios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
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
  };

  const handleFechaInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioEvento(event.target.value.toString());
  };

  const handleFechaFin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinEvento(event.target.value.toString());
  };

  useEffect(() => {
    
    departamentosc();

    if (dt === "") {
      console.log("Modal dt", dt);
    } else {
      setId(dt?.id);
      setNombreEvento(dt?.title);
      if (dt?.id) {

        var inicio = new Date(dt?.start);
        var fechainicio =
          inicio.getFullYear() +
          "-" +
          ("0" + (inicio.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + inicio.getDate()).slice(-2);
        var horainicio =
          ("0" + inicio.getHours()).slice(-2) +
          ":" +
          ("0" + inicio.getMinutes()).slice(-2);
        var Fecha_inicio = fechainicio + "T" + horainicio;

        var fin = new Date(dt?.end);
        var fechafin =
          fin.getFullYear() +
          "-" +
          ("0" + (fin.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + fin.getDate()).slice(-2);
        var horafin =
          ("0" + fin.getHours()).slice(-2) +
          ":" +
          ("0" + fin.getMinutes()).slice(-2);
        var Fecha_fin = fechafin + "T" + horafin;

        setInicioEvento(Fecha_inicio);
        setFinEvento(Fecha_fin);
      } else {
        setInicioEvento(dt?.start);
        setFinEvento(dt?.end);
      }
    }
  }, [dt]);

  return (
    <Dialog 
    open={open} 
    fullWidth
    maxWidth="md"
    sx={{ margin:"0",padding:"0" }}
    
    >
      
      {modoModal == "Editar Evento" ? (
        Date.parse(inicioEventoMin) > Date.parse(inicioEvento) ? (
          <Container sx={{ width:"100%", bgcolor:COLOR.azul }}>
             <DialogTitle sx={{ width:"100%"}}> 
             <Typography variant="h5" color="white" > Evento Pasado </Typography>
             </DialogTitle>

            <DialogContent  sx={{ width:"100%", bgcolor:"white", borderRadius:2}}>
              <Box sx={{ width:"100%"}}>
              <Typography variant="h6"  paddingTop={3}> Título del Evento </Typography>
                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={nombreEvento}
                  fullWidth
                  variant="standard"
                  sx={{ paddingBottom:"2%" }}
                  InputProps={{ readOnly: true }}
                />
                 <Typography variant="h6"  paddingTop={1} > Fecha de inicio del evento </Typography>
              
                <Input
                  fullWidth
                  id="inicioEvento"
                  required
                  type="datetime-local"
                  value={inicioEvento}
                  sx={{ paddingBottom:"2%" }}
                  inputProps={{
                    inputProps: { readOnly: true },
                  }}
                />
                 <Typography variant="h6"  paddingTop={1} > Fecha de fin del evento</Typography>
                <Input
                  fullWidth
                  id="finEvento"
                  required
                  value={finEvento}
                  type="datetime-local"
                  sx={{ paddingBottom:"2%" }}
                  inputProps={{
                    inputProps: { readOnly: true },
                  }}
                />

                <FormGroup >
                  <FormControlLabel
                    // sx={{ width: "0vw" }}
                    control={<Switch id="repetitivoEvento" disabled />}
                    label="¿Repetir?"
                  />
                </FormGroup>
              </Box>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button  sx={{ color:"white", '&:hover':{color: 'white'} }} onClick={() => handleClose()}>Cerrar</Button>
            </DialogActions>
          </Container>
        )  : (
          <Container>
            <DialogTitle>{modoModal}</DialogTitle>
            <DialogContent>
              <Box sx={{ padding: 2 }}>
                <Typography>Título del Evento*</Typography>
                <TextField
                  required
                  margin="dense"
                  id="nombreEvento"
                  value={nombreEvento}
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombreEvento(v.target.value)}
                  error={nombreEvento == null ? true : false}
                  InputProps={{}}
                />

                <Typography>Fecha de inicio del evento*</Typography>

                <Input
                  fullWidth
                  id="inicioEvento"
                  required
                  type="datetime-local"
                  value={inicioEvento}
                  inputProps={{
                    inputProps: { min: inicioEventoMin, max: finEventoMax },
                  }}
                  onChange={handleFechaInicio}
                  error={inicioEvento == "" ? true : false}
                />
                <Typography>Fecha de fin del evento*</Typography>
                <Input
                  fullWidth
                  id="finEvento"
                  required
                  value={finEvento}
                  type="datetime-local"
                  onChange={handleFechaFin}
                  error={finEvento <= inicioEvento ? true : false}
                  inputProps={{
                    inputProps: { min: inicioEvento, max: finEventoMax },
                  }}
                />

                <FormGroup>
                  <FormControlLabel
                    
                    control={
                      <Switch id="repetitivoEvento" onChange={() => {}} />
                    }
                    label="¿Repetir?"
                  />
                </FormGroup>
              </Box>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button
                sx={{ mr: 5 }}
                onClick={() => handleDelete()}
                startIcon={<DeleteIcon />}
              >
                Borrar
              </Button>
              <Button onClick={() => handleSend()}>Guardar</Button>
              <Button onClick={() => handleClose()}>Cancelar</Button>
            </DialogActions>
          </Container>
        )
      ) : (
        ""
      )}

      {modoModal == "Agregar Evento" ? (
        Date.parse(inicioEventoMin) > Date.parse(inicioEvento) ? (
          ////// SI EL EVENTO YA INICIO NO DEJA Agregar y solo muestra ReadOnly
          <Container >
            <DialogTitle>Aviso</DialogTitle>
            <DialogContent>
              <Box sx={{ padding: 2 }}>
                <Typography>
                  No puedes agregar un evento pasado, sólo a futuro.
                </Typography>
              </Box>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button onClick={() => handleClose()}>Cerrar</Button>
            </DialogActions>
          </Container>
        ) : (
          <Container sx={{ bgcolor:COLOR.azul}}>
            <DialogTitle >
            <Typography variant="h6" color="white" paddingTop={1}> {modoModal} </Typography>
            </DialogTitle>
            <DialogContent sx={{ bgcolor:"white"}} >
              <Box sx={{ padding: 2 }}>
              <Typography variant="h6"  paddingTop={1}> Título del Evento </Typography>
                <TextField
                  required
                  margin="dense"
                  sx={{ paddingBottom:"2%" }}
                  id="nombreEvento"
                  value={nombreEvento}
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombreEvento(v.target.value)}
                  error={nombreEvento == null ? true : false}
                  InputProps={{}}
                />
                <Typography variant="h6"  paddingTop={1} > Fecha de inicio del evento* </Typography>

                <Input
                  fullWidth
                  id="inicioEvento"
                  required
                  type="datetime-local"
                  value={inicioEvento}
                  sx={{ paddingBottom:"2%" }}
                  inputProps={{
                    inputProps: { min: inicioEventoMin, max: finEvento },
                  }}
                  onChange={handleFechaInicio}
                  error={inicioEvento == "" ? true : false}
                />
                <Typography variant="h6"  paddingTop={1} > Fecha de fin del evento* </Typography>
                <Input
                  fullWidth
                  id="finEvento"
                  required
                  value={finEvento}
                  type="datetime-local"
                  sx={{ paddingBottom:"2%" }}
                  inputProps={{
                    inputProps: { min: inicioEvento, max: finEventoMax },
                  }}
                  onChange={handleFechaFin}
                  error={finEvento <= inicioEvento ? true : false}
                />

                <FormGroup>
                  <FormControlLabel
                    sx={{ width: "0vw" }}
                    control={
                      <Switch id="repetitivoEvento" onChange={() => {}} />
                    }
                    label="¿Repetir?"
                  />
                </FormGroup>
              </Box>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button sx={{ color:"white", '&:hover':{color: 'white'} }}  onClick={() => handleSend()}>Guardar</Button>
              <Button sx={{ color:"white", '&:hover':{color: 'white'} }} onClick={() => handleClose()}>Cancelar</Button>
            </DialogActions>
          </Container>
        )
      ) : (
        ""
      )}
    </Dialog>
  );
};

export default CalendarCModal;
