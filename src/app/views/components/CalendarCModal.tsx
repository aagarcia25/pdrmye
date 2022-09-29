import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../helpers/Alert";
import { Toast } from "../../helpers/Toast";
import { eventoc } from "../../interfaces/calendario/calendario";
import { CalendarioService } from "../../services/calendarioService";

const CalendarCModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const [eventos, setEventos] = useState("");
  //Campos
  const [id, setId] = useState("");
  const [nombreEvento, setNombreEvento] = useState("");
  const [inicioEvento, setInicioEvento] = useState("");
  const [finEvento, setFinEvento] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [values, setValues] = useState<eventoc[]>();

  //Usandose en select departamentos
  const [departamentos, setDepartamentos] = useState("");
  

  const eventosc = () => {
    let data = {};
    CalendarioService.calendarios(data).then((res) => {
      setEventos(res.RESPONSE);
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
        DEPARTAMENTO: id,
        MES: inicioEvento,
        INFLACION: finEvento,
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

    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setNombreEvento(dt?.title);
      //setInicioEvento(dt?.row?.inicioEvento);
      //setFinEvento(dt?.row?.finEvento);
      //setDepartamento(dt?.row?.departamento);
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            required
            margin="dense"
            id="nombreEvento"
            label="Título del Evento"
            value={nombreEvento}
            fullWidth
            variant="standard"
            onChange={(v) => setNombreEvento(v.target.value)}
            error={nombreEvento == "" ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
              inputMode: "numeric",
            }}
          />
        
          <FormControl variant="standard" fullWidth>
            <InputLabel>Departamento</InputLabel>
            <Select
              required
              onChange={(v) => setDepartamento(v.target.value)}
              value={departamento}
              label="Mes"
              // inputProps={{
              //   readOnly: tipo == 1 ? false : true,
              // }}

              /*
              Poner fuera de este abajo, departamentos ocuopa llamar a los existentes
               {departamentos?.map((item: any) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.Descripcion}
                  </MenuItem>
                );
              })}
              */
            >
             
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleSend()}>Guardar</Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarCModal;
