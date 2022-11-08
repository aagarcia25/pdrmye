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
import { getMunicipios, getUser, setMunicipios, validaLocalStorage } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { municipiosc } from "../../../../../share/loadMunicipios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";


const MunRecaudacionModal = ({
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
  const [recaudacion, setRecaudacion] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<string>();
  const [municipios, setMunicipios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [municipio, setMunicipio] = useState("");





  const handleSend = () => {
    if (recaudacion == null || anio == null || IdMunicipio == null) {
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
        RECAUDACION: recaudacion,



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

  const handleFilterChange = (event: SelectValues) => {
    setIdMunicipio(event.value);

  };


  const agregar = (data: any) => {
    CatalogosServices.munrecaudacion(data).then((res) => {
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
    CatalogosServices.munrecaudacion(data).then((res) => {
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
    setMunicipios(municipiosc());

    if (dt === '') {
      console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setRecaudacion(dt?.row?.Recaudacion)
      setIdMunicipio(dt?.row?.idmunicipio)
      setMunicipio(dt?.row?.Nombre)



      console.log(dt)



    }

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
          <Box>
            <label ><br /> Municipio: <br />{municipio}</label>
          </Box>
          </FormControl>
          <Box>
            <label ><br /> Año: <br />{anio}</label>
          </Box>

          <Box>
            <label > <br /> Recaudacion: <br /></label>
          </Box>

          <TextField
            margin="dense"
            required
            id="pob"
            value={recaudacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setRecaudacion(Number(v.target.value))}
            error={recaudacion == null ? true : false}
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

export default MunRecaudacionModal;
