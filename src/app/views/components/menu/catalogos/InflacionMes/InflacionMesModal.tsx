import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import Imeses from "../../../../../interfaces/general/Api_AdSisUs.type";
import { CatalogosServices } from "../../../../../services/catalogosServices";



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
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [inflacion, setInflacion] = useState("");

  const [meses, setMeses] = useState<Imeses[]>();

  const mesesc = () => {
    let data = {};
    CatalogosServices.meses(data).then((res) => {
      setMeses(res.RESPONSE);
    });
  };

  const handleSend = () => {
    if (mes == "" || inflacion == "" || anio == "") {
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
    mesesc();

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
    <Dialog open={open}>
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
            onChange={(v) => setAnio(v.target.value)}
            error={anio == "" ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,
              inputMode: "numeric",
            }}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel>Mes</InputLabel>
            <Select
              required
              onChange={(v) => setMes(v.target.value)}
              value={mes}
              label="Mes"
              // inputProps={{
              //   readOnly: tipo == 1 ? false : true,
              // }}
            >
              {meses?.map((item: Imeses) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.Descripcion}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            required
            id="inflacion"
            label="Inflación"
            value={inflacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setInflacion(v.target.value)}
            error={inflacion == "" ? true : false}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleSend()}>Guardar</Button>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InflacionMesModal;
