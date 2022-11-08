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
import { porcentage } from '../../CustomToolbar'
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, getPU, getUser, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { UserReponse } from "../../../../../interfaces/user/UserReponse";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";


const MunTerritorioModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function,
  dt: any
}) => {




  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [territorio, setTerritorio] = useState<number>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [IdMunicipio, setIdMunicipio] = useState<object>();
  const [values, setValues] = useState<Imunicipio[]>();




  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(String(getMunicipios()));
    setValues(m);
  };




  const handleSend = () => {
    if (territorio == null || IdMunicipio == null) {
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
        IDMUNICIPIO: IdMunicipio,
        KM2: territorio,



      };

      handleRequest(data);
      handleClose("save");
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
    CatalogosServices.munterritorio(data).then((res) => {
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
    CatalogosServices.munterritorio(data).then((res) => {
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

    if (dt === '') {
      console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setTerritorio(dt?.row?.Km2)
      setIdMunicipio(dt?.row?.idmunicipio)



      console.log(dt)



    }
    console.log(dt)
  }, [dt]);



  return (
    <Dialog open={open} fullScreen>

      <DialogContent>
        <Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', }}>
            <label className="Titulo">{modo}</label>
          </Box>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Municipio</InputLabel>
            <Select
              required
              onChange={(v) => setIdMunicipio(Object(v.target.value))}
              value={IdMunicipio}
              label="Municipio"
              error={IdMunicipio == null ? true : false}
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
            margin="dense"
            required
            id="pob"
            label="Area"
            value={territorio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setTerritorio(Number(v.target.value))}
            error={territorio == null ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />


        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>Guardar</button>
        <button className="cerrar" onClick={() => handleClose("close")}>Cerrar</button>
      </DialogActions>
    </Dialog>
  );
};

export default MunTerritorioModal;
