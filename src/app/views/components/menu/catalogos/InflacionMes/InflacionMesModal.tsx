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
  Grid,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { municipiosc } from "../../../../../share/loadMunicipios";
import ModalForm from "../../../componentes/ModalForm";
import { fmeses } from "../../../../../share/loadMeses";



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
    if (mes === null || inflacion === null || anio === null) {
      AlertS.fire({
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
    //console.log(data);
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
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
    CatalogosServices.inflacionMes(data).then((res) => {
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

  useEffect(() => {
    setMeses(fmeses());
    console.log(fmeses())


    if (dt === "") {
    } else {

      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setMes(dt?.row?.Mes);
      setInflacion(dt?.row?.Inflacion);
    }
  }, [dt]);

  return (

    <ModalForm title={modo} handleClose={handleClose}>
      <Grid container sx={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", }} >
        <Grid item xs={4} sm={3} md={4} lg={4} >

          <TextField
            required
            margin="dense"
            id="anio"
            label="A??o"
            value={anio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnio(Number(v.target.value))}
            error={anio === null ? true : false}
            InputProps={{
              readOnly: tipo === 1 ? false : true,
              inputMode: "numeric",
            }}
          />
          <SelectFrag
            value={mes}
            options={meses}
            onInputChange={handleSelectMes}
            placeholder={"Seleccione Mes"}
            label={""}
            disabled={modo==="Editar"?true:false}
          />

          <TextField
            margin="dense"
            required
            id="inflacion"
            label="Inflaci??n"
            value={inflacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setInflacion(Number(v.target.value))}
            error={inflacion === null ? true : false}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: "2vh", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", }} >
        <Grid item xs={4} sm={3} md={2} lg={1} >
          <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
        </Grid>
      </Grid>
    </ ModalForm>
  );
};

export default InflacionMesModal;
