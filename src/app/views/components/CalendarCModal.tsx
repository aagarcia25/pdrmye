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
import CloseIcon from "@mui/icons-material/Close";

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
    fullScreen
    sx={{ margin:"0%",padding:"0"}}
    >
    
      {modoModal == "Editar Evento" ? (
        Date.parse(inicioEventoMin) > Date.parse(inicioEvento) ? (
          <Container  maxWidth="lg" sx={{margin:"5%" }}>

            <Box padding={1} 
            display="flex" 
            flexDirection="row" 
            boxShadow={2}  
            sx={{ width:"100%",bgcolor:COLOR.grisBotones}}>

              <Box sx={{ width:"95%"}}>
              <Typography variant="h5" color="COLOR.azul" > Evento Pasado </Typography>
              </Box>
              <Box sx={{ width:"5%"}}>
              <button className="cerrar-nuevo-mensaje" color="error"
                    onClick={() => handleClose("cerrar")}>
                    <CloseIcon />
              </button>
              </Box>
            </Box>
              <Box  sx={{ width:"100%", height:"3%"}}> </Box>
              <Box display="flex" justifyContent="center" boxShadow={2}  sx={{ width:"100%", borderRadius:2 }}>
                <Box sx={{ width:"98%", padding:"2%"}} >
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
              </Box>
           
          </Container>
        ) : (
          <Container maxWidth="sm">
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
          <Container maxWidth="lg" sx={{ paddingTop: "5%" }}>
             <Box padding={1} 
            display="flex" 
            flexDirection="row" 
            boxShadow={2}  
            sx={{ width:"100%",bgcolor:COLOR.grisBotones}}>

              <Box sx={{ width:"95%"}} >
              <Typography variant="h4" sx={{color:COLOR.rojo}} padding={1} align="center"> AVISO </Typography>
              </Box>
              <Box sx={{ width:"5%"}}>
              <button className="cerrar-nuevo-mensaje" color="error"
                    onClick={() => handleClose("cerrar")}>
                    <CloseIcon />
              </button>
              </Box>
            </Box>
              <Box  sx={{ width:"100%", height:"5%"}}> </Box>
              <Box display="flex" justifyContent="center" boxShadow={2}  sx={{ width:"100%", borderRadius:2 }}>
                <Box sx={{ width:"98%"}} >
              <Typography variant="h6"  padding={5}>   No puedes agregar un evento pasado, sólo a futuro. </Typography>
               </Box>
              </Box>

          </Container>
        ) : (
          <Container maxWidth="lg" sx={{margin:"5%" }} >

            <Box padding={1} 
            display="flex" 
            flexDirection="row" 
            boxShadow={2}  
            sx={{ width:"100%",bgcolor:COLOR.grisBotones}}>

              <Box sx={{ width:"95%"}}>
              <Typography variant="h5" color="COLOR.azul" paddingLeft={3}> {modoModal} </Typography>
              </Box>
              <Box sx={{ width:"5%"}}>
              <button className="cerrar-nuevo-mensaje" color="error"
                    onClick={() => handleClose("cerrar")}>
                    <CloseIcon />
              </button>
              </Box>
            </Box>
          
          
            <Box  sx={{ width:"100%", height:"3%"}}> </Box>
              <Box>
                   <Box display="flex" justifyContent="center" boxShadow={2}  sx={{ width:"100%", borderRadius:2 }}>
                     <Box sx={{ width:"98%", padding:"2%"}} > 
                        <Typography variant="h6"  paddingTop={3} > Título del Evento </Typography>
                        <TextField
                          required
                          margin="dense"
                          id="nombreEvento"
                          value={nombreEvento}
                          fullWidth
                          variant="standard"
                          sx={{ paddingBottom:"2%" }}
                          onChange={(v) => setNombreEvento(v.target.value)}
                          error={nombreEvento == null ? true : false}
                          InputProps={{}}
                        />

                        <Typography variant="h6"  paddingTop={1} > Fecha de inicio del evento </Typography>

                        <Input
                          fullWidth
                          sx={{ paddingBottom:"2%" }}
                          id="inicioEvento"
                          required
                          type="datetime-local"
                          value={inicioEvento}
                          inputProps={{
                            inputProps: { min: inicioEventoMin, max: finEvento },
                          }}
                          onChange={handleFechaInicio}
                          error={inicioEvento == "" ? true : false}
                        />

                        <Typography variant="h6"  paddingTop={1} > Fecha de fin del evento</Typography>

                        <Input
                          fullWidth
                          sx={{ paddingBottom:"2%" }}
                          id="finEvento"
                          required
                          value={finEvento}
                          type="datetime-local"
                          inputProps={{
                            inputProps: { min: inicioEvento, max: finEventoMax },
                          }}
                          onChange={handleFechaFin}
                          error={finEvento <= inicioEvento ? true : false}
                        />

                        <FormGroup sx={{ paddingTop:"2%"}}>
                          <FormControlLabel
                            sx={{ width: "0vw" }}
                            control={
                              <Switch id="repetitivoEvento" onChange={() => {}} />
                            }
                            label="¿Repetir?"
                          />
                        </FormGroup>
                        
                        <DialogActions>
                        <Button onClick={() => handleSend()}>Guardar</Button>
                        </DialogActions>
                      </Box>
                    </Box>
              </Box>

            
            
          </Container>
        )
      ) : (
        ""
      )}
    </Dialog>
  );
};

export default CalendarCModal;
