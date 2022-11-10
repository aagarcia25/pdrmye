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
  Grid,
  Button,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { municipiosc } from "../../../../../share/loadMunicipios";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import ModalForm from "../../../componentes/ModalForm";

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
  const [anio, setAnio] = useState<number>();
  const [poblacion, setPoblacion] = useState<number>();
  const [municipios, setMunicipios] = useState<SelectValues[]>([]);
  const [munSeleccionado, setMunSeleccionado] = useState<string>();
  // =======
  //   const [anio, setAnio] = useState("");
  //   const [Poblacion, setPoblacion] = useState("");
  //   const [idPoblacion, setIdPoblacion] = useState("");

  //   const [values, setValues] = useState<Imunicipio[]>();




  //   const municipiosc = () => {
  //     let data = {};
  //     if (!validaLocalStorage("FiltroMunicipios")) {
  //       CatalogosServices.Filtromunicipios(data).then((res) => {
  //         setMunicipios(res.RESPONSE);
  //       });
  //     }
  //     let m: Imunicipio[] = JSON.parse(getMunicipios() || "");
  //     setValues(m);
  //   };
  // >>>>>>> Stashed changes

  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSelectMun = (v: SelectValues) => {
    console.log(v)
    setMunSeleccionado(v.value);
  };


  const handleSend = () => {
    if (poblacion == null || anio == null) {
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
        IDMUNICIPIO: munSeleccionado,
        TOTALPOBLACION: poblacion,
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

  const handle = () => {

  };

  useEffect(() => {
    setMunicipios(municipiosc());

    if (dt === '') {
      console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setPoblacion(dt?.row?.totalPob)
      setMunSeleccionado(dt?.row?.idmunicipio)

      console.log(dt.row)
      // =======
      //     municipiosc();

      //     if(dt === ''  ){
      //         console.log(dt)

      //     }else{
      //         setId(dt?.row?.id)
      //         setAnio(dt?.row?.Anio)
      //         setPoblacion(dt?.row?.totalPob
      //           )
      //         console.log(dt)
      //       ///  setIdPoblacion(dt?.row?.idmunicipio)
    }

  }, [dt]);



  return (



    <div>
      <ModalForm title={modo} handleClose={handleClose}>
        <Grid container
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}

        >

          <Grid item xs={12} sm={8} md={8} lg={7}>
            <Box>
              <label className="Titulo">{dt?.row?.Nombre}</label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>



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
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={8}>

            <TextField
              margin="dense"
              required
              id="fac"
              label="Poblacion"
              value={poblacion}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setPoblacion(Number(v.target.value))}
              error={poblacion == null ? true : false}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid item xs={5} sm={3} md={2} lg={1}
            >
              <Button className={tipo == 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo == 1 ? "Guardar" : "Actualizar"}</Button>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>
    </div>




  );
};

export default MunPoblacionModal;
