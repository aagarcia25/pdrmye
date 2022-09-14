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
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";

const MunPoblacionModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt
}: {
  open: boolean;
  modo: string;
  tipo:number;
  handleClose:Function,
  dt:any
}) => {




  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [idPoblacion, setIdPoblacion] = useState("");
 
  const [values, setValues] = useState<Imunicipio[]>();
 
 

  
  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(getMunicipios() || "");
    setValues(m);
  };


 
 

  const handleSend = () => {
    if (poblacion == "") {
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
        idPoblacion: idPoblacion,
        TOTALPOBLACION: poblacion,
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
    CatalogosServices.munpoblacion(data).then((res) => {
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
    CatalogosServices.munpoblacion(data).then((res) => {
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
    municipiosc();

    if(dt === ''  ){
        console.log(dt)
       
    }else{
        setId(dt?.row?.id)
        setAnio(dt?.row?.Anio)
        setPoblacion(dt?.row?.totalPob)
        setIdPoblacion(dt?.row?.idmunicipio)
        console.log(dt.row)
    }
   
  }, [dt]);



  return (
    <Dialog open={open}>
      <DialogTitle>{modo}</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Municipio</InputLabel>
            <Select
              required
              onChange={(v) => setIdPoblacion(v.target.value)}
              value={idPoblacion}
              label="Municipio"
            inputProps={{
            readOnly: tipo == 1 ? false : true,
             }}
            >
              {values?.map((item: Imunicipio) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.Nombre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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
       
             }}
          />

          <TextField
            margin="dense"
            required
            id="fac"
            label="Poblacion"
            value={poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(v.target.value)}
            error={poblacion == "" ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
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

export default MunPoblacionModal;
