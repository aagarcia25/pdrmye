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
import { municipiosc } from "../../../../../share/loadMunicipios";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";

const MunPoblacionModal = ({
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
<<<<<<< Updated upstream
  const [anio, setAnio] = useState<number>();
  const [poblacion, setPoblacion] = useState<number>();
  const [municipios, setMunicipios] = useState<SelectValues[]>([]);
  const [munSeleccionado, setMunSeleccionado] = useState<string>();
=======
  const [anio, setAnio] = useState("");
  const [Poblacion, setPoblacion] = useState("");
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
>>>>>>> Stashed changes

  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSelectMun = (v: SelectValues) => {
    console.log(v)
    setMunSeleccionado(v.value);
  };


  const handleSend = () => {
<<<<<<< Updated upstream
    if (poblacion == null || munSeleccionado == null || anio == null) {
=======
    if (Poblacion == "") {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        IDMUNICIPIO: munSeleccionado,
        TOTALPOBLACION: poblacion,
=======
        TOTALPOBLACION: Poblacion,
>>>>>>> Stashed changes
      };

      handleRequest(data);
      handleClose("guardar");
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
<<<<<<< Updated upstream
    setMunicipios(municipiosc());

    if (dt === '') {
      console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setPoblacion(dt?.row?.totalPob)
      setMunSeleccionado(dt?.row?.idmunicipio)

      console.log(dt.row)
=======
    municipiosc();

    if(dt === ''  ){
        console.log(dt)
       
    }else{
        setId(dt?.row?.id)
        setAnio(dt?.row?.Anio)
        setPoblacion(dt?.row?.totalPob
          )
        console.log(dt)
      ///  setIdPoblacion(dt?.row?.idmunicipio)
>>>>>>> Stashed changes
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

            <SelectFrag
              options={municipios}
              onInputChange={handleSelectMun}
              placeholder={"Seleccione el Municipio"}
              label={""}
              disabled={true}
              value={''}
            />

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
            onChange={(v) => setAnio(Number(v.target.value))}
            error={anio == null ? true : false}
            InputProps={{
              readOnly: tipo == 1 ? false : true,

            }}
          />

          <TextField
            margin="dense"
            required
            id="fac"
            label="Poblacion"
<<<<<<< Updated upstream
            value={poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(Number(v.target.value))}
            error={poblacion == null ? true : false}
=======
            value={Poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(v.target.value)}
            error={Poblacion == "" ? true : false}
>>>>>>> Stashed changes
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
        <button className="cerrar" onClick={() => handleClose("cerrar")}>Cerrar</button>
      </DialogActions>
    </Dialog>
  );
};

export default MunPoblacionModal;
