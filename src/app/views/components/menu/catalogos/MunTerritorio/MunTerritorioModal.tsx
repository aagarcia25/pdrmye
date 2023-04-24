import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipios, getUser, validaLocalStorage } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";
import SelectValues from "../../../../../interfaces/Select/SelectValues";


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


  const handleSend = () => {
    if (territorio === null) {
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
        KM2: territorio,



      };

      handleRequest(data);
      handleClose();
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
    CatalogosServices.munterritorio(data).then((res) => {
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
    CatalogosServices.munterritorio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Solicitud De Edición Enviada!",
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



  useEffect(() => {
  

    if (dt === '') {
      //console.log(dt)

    } else {
      setId(dt?.row?.id)
      setAnio(dt?.row?.Anio)
      setTerritorio(dt?.row?.Km2)
      setIdMunicipio(dt?.row?.idmunicipio)
      //console.log(dt)
    }

  


    //console.log(dt)
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
          <Grid item xs={7} sm={8} md={8} lg={8}>
          <Box>
          <label className="Titulo">{dt?.row?.Nombre}</label>
          </Box>
          </Grid>
          <Grid item xs={7} sm={8} md={8} lg={8}>
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
              error={territorio === null ? true : false}
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
            <Grid item xs={4} sm={3} md={2} lg={1}
            >
              <Button className={tipo===1?"guardar":"actualizar"} onClick={() => handleSend()}>{tipo===1?"Guardar":"Actualizar"}</Button>
            </Grid>
          </Grid>
        </Grid>

      </ModalForm>
    </div>


  );
};

export default MunTerritorioModal;
