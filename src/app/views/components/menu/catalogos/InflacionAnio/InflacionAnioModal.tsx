import { useEffect, useState } from "react";
import {
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";

const InflacionAnioModal = ({
  open,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [inflacion, setInflacion] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (anio == "" || inflacion == "") {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        ANIO: anio,
        INFLACION: inflacion,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo == 2) {
      //EDITAR
      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.inflacionAnio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
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
    CatalogosServices.inflacionAnio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
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
    if (dt == "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setInflacion(dt?.row?.Inflacion);
    }
  }, [dt]);

  return (
    <ModalForm title={modo} handleClose={handleClose}>
      <DialogContent>
        <Grid
          container
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={4} sm={3} md={4} lg={4}>
            <TextField
              margin="dense"
              required
              id="anio"
              label="Año"
              value={anio}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setAnio(v.target.value)}
              error={anio == "" ? true : false}
            />

            <TextField
              margin="dense"
              required
              id="inflacion"
              label="Inflación"
              value={inflacion}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => setInflacion(v.target.value)}
              error={inflacion == "" ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid
          container
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={4} sm={3} md={2} lg={1}>
            <Button
              className={tipo == 1 ? "guardar" : "actualizar"}
              onClick={() => handleSend()}
            >
              {tipo == 1 ? "Guardar" : "Actualizar"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </ModalForm>
  );
};

export default InflacionAnioModal;
