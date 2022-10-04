import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../helpers/Alert";
import { Toast } from "../../helpers/Toast";
import { eventoc } from "../../interfaces/calendario/calendario";
import { CalendarioService } from "../../services/calendarioService";
import { CatalogosServices } from "../../services/catalogosServices";
import moment from "moment";
import { Label } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [eventos, setEventos] = useState("");
  //Campos
  const [id, setId] = useState("");
  const [nombreEvento, setNombreEvento] = useState("");
  const [finEvento, setFinEvento] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [eventoRepetitivo , setEventoRepetitivo] = useState(Boolean);

  const [values, setValues] = useState<eventoc[]>();

  //Usandose en select departamentos
  const [departamentos, setDepartamentos] = useState("");
  const [inicioEvento, setInicioEvento] = useState("");

  console.log("id", id);
  console.log("nombreEvento", nombreEvento);
  console.log("inicioEvento", inicioEvento);
  console.log("finEvento", finEvento);

 
  const hoy = new Date();
  let fecha =
    hoy.getFullYear() +
    "-" +
    ("0" + (hoy.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + hoy.getDate()).slice(-2);
  let hora =
    ("0" + hoy.getHours()).slice(-2) + ":" + ("0" + hoy.getMinutes()).slice(-2);
  var Fecha_min = fecha + "T" + hora;

  const eventosc = () => {
    let data = {};
    CalendarioService.calendarios(data).then((res) => {
      setEventos(res.RESPONSE);
    });
  };

  const departamentosc = () => {
    let data = {};
    CatalogosServices.departamentos(data).then((res) => {
      //  console.log(res);
      setDepartamentos(res.RESPONSE);
    });
  };

  const handleSend = () => {
    if (nombreEvento == "" || inicioEvento == "" || finEvento == "") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: 1,
        MODIFICADOPOR: 1,
        NOMBREEVENTO: nombreEvento,
        INICIOEVENTO: inicioEvento,
        FINEVENTO: finEvento,
        ASIGNADOA: 1,
        DEPARTAMENTO: "511732b0-2b01-11ed-afdb-040300000000",
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    console.log(data);
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
      } else {
        Alert.fire({
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
    eventosc();
    departamentosc();

    if (dt === "") {
      console.log("Modal dt", dt);
    } else {
      setId(dt?.id);
      setNombreEvento(dt?.title);
      setInicioEvento(moment(dt?.start).format("YYYY-MM-DDTkk:mm"));
      setFinEvento(moment(dt?.end).format("YYYY-MM-DDTkk:mm"));
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogTitle>{modo}</DialogTitle>
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
            onChange={(v) => setInicioEvento(v.target.value.toString())}
            error={inicioEvento == "" ? true : false}
          />
          <Typography>Fecha de fin del evento*</Typography>
          <Input
            fullWidth
            id="finEvento"
            required
            value={finEvento}
            type="datetime-local"
            onChange={(v) => setFinEvento(v.target.value.toString())}
            error={finEvento == "" ? true : false}
          />

          <FormGroup>
            <FormControlLabel
              sx={{ width: "0vw" }}
              control={<Switch 
              id="repetitivoEvento"
              onChange={()=>{}}
              />}
              label="¿Repetir?"
            />
          </FormGroup>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button
          sx={{ mr: 5 }}
          disabled={tipo == 2 ? false : true}
          onClick={() => handleDelete()}
          startIcon={<DeleteIcon />}
        >
          Borrar
        </Button>
        <Button onClick={() => handleSend()}>Guardar</Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarCModal;
