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


const MunPobrezaExtremaModal = ({
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
  const [poblacion, setPoblacion] = useState<number>();
  const [porcentaje, setPorcentage] = useState<number>();
  const [carenciaProm, setCarenciaProm] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<object>();
  const [values, setValues] = useState<Imunicipio[]>();
  const user: RESPONSE = JSON.parse(String(getUser()));




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
    if (poblacion == null || anio == null || carenciaProm == null || IdMunicipio == null) {
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
        PERSONAS: poblacion,
        PORCENTAJE: porcentaje,
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



  const agregar = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {
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
    CatalogosServices.munpobrezaext(data).then((res) => {
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
      setPoblacion(dt?.row?.Personas)
      setIdMunicipio(dt?.row?.idmunicipio)
      setPorcentage(dt?.row?.Porcentaje)
      setCarenciaProm(dt?.row?.CarenciaProm)





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
            <InputLabel>Municipio</InputLabel>
            <Select
              required
              onChange={(v) => setIdMunicipio(Object(v.target.value))}
              value={IdMunicipio}
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

          {(modo === "Agregar Registro") ?
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
            :
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
          }

          <TextField
            margin="dense"
            required
            id="pob"
            label="Total"
            value={poblacion}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setPoblacion(Number(v.target.value))}
            error={poblacion == null ? true : false}
          />

          <TextField

            margin="dense"
            required
            id="fac"

            label="Carencia Promedio"
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

export default MunPobrezaExtremaModal;
