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
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { municipiosc } from "../../../../../share/loadMunicipios";


const MunPobrezaModal = ({
  open,
  handleClose,
  tipo,
  dt
}: {
  open: boolean;
  tipo: number;
  handleClose: Function,
  dt: any
}) => {

  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState<number>();
  const [poblacion, setPoblacion] = useState<number>();
  const [carenciaProm, setCarenciaProm] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<string>();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [municipios, setMunicipios] = useState<SelectValues[]>([]);
  const [mun, setMun] = useState<string>();






  const handleSend = () => {
    if (IdMunicipio == null || poblacion == null || anio == null || carenciaProm == null || poblacion == 0 || anio == 0 || carenciaProm == 0) {
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
        TOTAL: poblacion,
        CARENCIAPROMEDIO: carenciaProm,


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
    CatalogosServices.munpobreza(data).then((res) => {
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
    CatalogosServices.munpobreza(data).then((res) => {
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
      setPoblacion(dt?.row?.Total)
      setIdMunicipio(dt?.row?.idmunicipio)
      setCarenciaProm(dt?.row?.CarenciaProm)
      setMun(dt?.row?.Nombre)





    }

  }, [dt]);



  return (
    <Dialog open={open} fullScreen>



      <DialogContent>
        <Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', }}>
            <label className="Titulo">{tipo == 1 ?"Agregar Registro" : "Editar Registro"}</label>
          </Box>



          <FormControl variant="standard" fullWidth>
            <InputLabel>Municipio</InputLabel>
            <SelectFrag
              value={''}
              options={municipios}
              onInputChange={handleFilterChange}
              placeholder={"Seleccione Municipio"}
              label={String(mun)} disabled={true} />
          </FormControl>

          <Box>
            <label >  <br /> Año <br />{anio}</label>
          </Box>

          <Box>
            <label > <br /> Poblacion <br /></label>
          </Box>

          <TextField
            margin="dense"
            required
            id="pob"
            value={poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(Number(v.target.value))}
            error={poblacion == null ? true : false}
          />


          <Box>
            <label > Carencia Promedio <br /></label>
          </Box>
          <TextField

            margin="dense"
            required
            id="fac"
            value={carenciaProm}
            type="percent"
            fullWidth
            variant="standard"
            onChange={(v) => setCarenciaProm(Number(v.target.value))}
            error={carenciaProm == null ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
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

export default MunPobrezaModal;
