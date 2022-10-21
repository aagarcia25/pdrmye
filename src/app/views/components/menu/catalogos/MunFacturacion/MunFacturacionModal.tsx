import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  DialogActions,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { municipiosc } from "../../../../../share/loadMunicipios";
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";

const MunFacturacionModal = ({
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
  const [anio, setAnio] = useState<number>();
  const [fac, setRecaudacion] = useState<number>();
  const [idMunicipio, setIdMunicipio] = useState<string>("");
  const [idMun, setIdMun] = useState<string>();
  const [municipio, setMunicipio] = useState<string>("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [mun, setMun] = useState<SelectValues[]>([]);


  const handleSend = () => {
    if (fac == null || anio == null || idMunicipio == null) {
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
        IDMUNICIPIO: idMunicipio,
        FACTURACION: fac,
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

  const handleFilterChange = (v: string) => {
    setIdMunicipio(v);

  };


  const agregar = (data: any) => {
    CatalogosServices.munfacturacion(data).then((res) => {
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
    CatalogosServices.munfacturacion(data).then((res) => {
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
    setMun(municipiosc());
    if (dt === '') {
    } else {

      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setRecaudacion(dt?.row?.Facturacion)
      setIdMunicipio(dt?.row?.idmunicipio)
      setIdMun(dt?.row?.idmunicipio)
      setMunicipio(dt?.row?.Nombre)


    }

  }, [dt]);



  return (
    <Dialog open={open}>

      <DialogContent>
        <Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', }}>
            <label className="Titulo">{modo}</label>
          </Box>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Municipio</InputLabel>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <SelectFrag
                options={mun}
                onInputChange={handleFilterChange}
                placeholder={"Seleccione Municipio"} label={String(municipio)} disabled={true}
                value={idMunicipio} 
                 />
            </FormControl>
          </FormControl>
          <Box>
            <label > Año <br />{anio}</label>
          </Box>

          <Box>
            <label > Facturacion <br /></label>
          </Box>

          <TextField
            margin="dense"
            required
            id="fac"
            value={fac}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setRecaudacion(Number(v.target.value))}
            error={fac == null ? true : false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
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

export default MunFacturacionModal;
