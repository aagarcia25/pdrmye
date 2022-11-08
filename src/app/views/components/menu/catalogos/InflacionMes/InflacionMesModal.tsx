import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { municipiosc } from "../../../../../share/loadMunicipios";



const InflacionMesModal = ({
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
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState<string>();
  const [anio, setAnio] = useState<number>();
  const [mes, setMes] = useState<string>("");
  const [inflacion, setInflacion] = useState<number>();
  const user: RESPONSE = JSON.parse(String(getUser()));

  const [meses, setMeses] = useState<SelectValues[]>([]);




  const handleSelectMes = (data: any) => {
    setMes(data);
  };

  const handleSend = () => {
    if (mes == null || inflacion == null || anio == null) {
      Alert.fire({
        title: "Uno o mas campos vacios!",
        text: "revisar los Campos",
        icon: "warning",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        ANIO: anio,
        MES: mes,
        INFLACION: inflacion,
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
    CatalogosServices.inflacionMes(data).then((res) => {
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
    CatalogosServices.inflacionMes(data).then((res) => {
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
    setMeses(municipiosc());

    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setMes(dt?.row?.Mes);
      setInflacion(dt?.row?.Inflacion);
    }
  }, [dt]);

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            required
            margin="dense"
            id="anio"
            label="Año"
            value={anio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnio(Number(v.target.value))}
            error={anio == null ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
              inputMode: "numeric",
            }}
          />

          <SelectFrag
            options={meses}
            onInputChange={handleSelectMes}
            placeholder={"Seleccione el Mes"}
            label={""}
            disabled={false} 
            value={mes}      
            />

          <TextField
            margin="dense"
            required
            id="inflacion"
            label="Inflación"
            value={inflacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setInflacion(Number(v.target.value))}
            error={inflacion == null ? true : false}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>Guardar</button>
        <button className="cerrar" onClick={() => handleClose()}>Cerrar</button>
      </DialogActions>
    </Dialog>
  );
};

export default InflacionMesModal;
