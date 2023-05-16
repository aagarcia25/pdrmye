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
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../../Fragmentos/SelectFrag";


const MunPobrezaModal = ({
  handleClose,
  tipo,
  dt,
  anios

}: {
  tipo: number;
  handleClose: Function,
  dt: any
  anios: SelectValues[];
}) => {

  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState<string>("");
  const [poblacion, setPoblacion] = useState<number>();
  const [carenciaProm, setCarenciaProm] = useState<number>();
  const [IdMunicipio, setIdMunicipio] = useState<string>();
  const user: RESPONSE = JSON.parse(String(getUser()));






  const handleSend = () => {
    if (IdMunicipio === null || poblacion === null || anio === null || carenciaProm === null || poblacion === 0 || Number(anio) === 0 || carenciaProm === 0) {
      AlertS.fire({
        title: "¡Error!",
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
        CARENCIAPROM: carenciaProm,


      };

      handleRequest(data);
      handleClose("save");
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
    CatalogosServices.munpobreza(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });

      } else {
        AlertS.fire({
          title: "¡Error!",
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
          title: "Solicitud De Edición Enviada!",
        });
        handleClose();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleSelectAnio = (e: any) => {
    setAnio(e);
  };

  useEffect(() => {

    if (dt === '') {

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setPoblacion(dt?.row?.Total)
      setIdMunicipio(dt?.row?.idmunicipio)
      setCarenciaProm(dt?.row?.CarenciaProm)
    }

  }, [dt]);



  return (


    <div>
      <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose}>
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
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <Box>
              <label className="Titulo">{dt?.row?.Nombre}</label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <Box>
              <label >  <br /> Año <br /></label>
              <SelectFrag
                value={anio}
                options={anios}
                onInputChange={handleSelectAnio}
                placeholder={"Seleccione año"}
                label={""} disabled={false}/>
            </Box>

            <Box>
              <label > <br /> Población <br /></label>
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
              error={poblacion === null ? true : false}
            />
          </Grid>


          <Grid item xs={12} sm={8} md={8} lg={8}>

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
              error={carenciaProm === null ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
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
            <Grid item xs={4} sm={3} md={2} lg={1}
            >
              <Button
                // disabled={


                // }

                className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>
    </div>


  );
};

export default MunPobrezaModal;
