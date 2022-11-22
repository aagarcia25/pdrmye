import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { municipiosc } from "../../../../../share/loadMunicipios";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
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
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSelectMun = (v: SelectValues) => {
    setMunSeleccionado(v.value);
  };


  const handleSend = () => {
    if (poblacion === null || anio === null) {
      AlertS.fire({
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
    CatalogosServices.munpoblacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });

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
    CatalogosServices.munpoblacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
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
    setMunicipios(municipiosc());

    if (dt === '') {
      //console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setPoblacion(dt?.row?.totalPob)
      setMunSeleccionado(dt?.row?.idmunicipio)

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
              error={anio === null ? true : false}
              InputProps={{
                readOnly: tipo === 1 ? false : true,

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
              error={poblacion === null ? true : false}
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
              <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>
    </div>




  );
};

export default MunPoblacionModal;
