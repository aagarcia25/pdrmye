import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  DialogActions,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {
  getMunicipios,
  getUser,
  setMunicipios,
  validaLocalStorage,
} from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

const UmasModel = ({
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
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [diario, setDiario] = useState("");
  const [mensual, setMensual] = useState("");
  const [anual, setAnual] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));

  console.log("---------Impresión de CAMPOS------");
  console.log("id: ", id);
  console.log("anio: ", anio);
  console.log("diario: ", diario);
  console.log("mensual: ", mensual);
  console.log("anual: ", anual);
  console.log("user: ", user);
  console.log("---------FIN-de-Impresión de CAMPOS------");

  const handleSend = () => {
    if (!diario || !anio || !mensual || !anual) {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        ANIO: anio,
        DIARIO: diario,
        MENSUAL: mensual,
        ANUAL: anual
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
    CatalogosServices.umas(data).then((res) => {
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
    CatalogosServices.umas(data).then((res) => {
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
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setDiario(dt?.row?.Diario);
      setMensual(dt?.row?.Mensual);
      setAnual(dt?.row?.Anual);
    }
  }, [dt]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label className="Titulo">{modo}</label>
          </Box>

          <TextField
            required
            margin="dense"
            id="Anio"
            label="Año"
            value={anio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnio(v.target.value)}
            error={anio == "" ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
              inputMode: "numeric",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Diario"
            label="Diario"
            value={diario}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setDiario(v.target.value)}
            error={diario == "" ? true : false}
            InputProps={{
              inputMode: "decimal",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Mensual"
            label="Mensual"
            value={mensual}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setMensual(v.target.value)}
            error={mensual == "" ? true : false}
            InputProps={{
              inputMode: "numeric",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Anual"
            label="Anual"
            value={anual}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnual(v.target.value)}
            error={anual == "" ? true : false}
            InputProps={{
              inputMode: "numeric",
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cancelar
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default UmasModel;
