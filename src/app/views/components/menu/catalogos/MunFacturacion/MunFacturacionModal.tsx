import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";

const MunFacturacionModal = ({
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
  const [anio, setAnio] = useState<number>();
  const [fac, setRecaudacion] = useState<number>();
  const [idMunicipio, setIdMunicipio] = useState<string>("");
  const [idMun, setIdMun] = useState<string>();
  const [municipio, setMunicipio] = useState<string>("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (fac == null || anio == null || idMunicipio == null) {
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
        IDMUNICIPIO: idMunicipio,
        FACTURACION: fac,
      };

      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
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
    CatalogosServices.munfacturacion(data).then((res) => {
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

  useEffect(() => {
    if (dt == "") {
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setRecaudacion(dt?.row?.Facturacion);
      setIdMunicipio(dt?.row?.idmunicipio);
      setIdMun(dt?.row?.idmunicipio);
      setMunicipio(dt?.row?.Nombre);
    }
  }, [dt]);

  return (
    <div>
      <ModalForm
        title={tipo == 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
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
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box>
              <FormControl variant="standard" fullWidth>
                <Box>
                  <label>
                    <br /> Municipio: <br />
                    {municipio}
                  </label>
                </Box>
              </FormControl>
              <Box>
                <label>
                  <br /> Año: <br />
                  {anio}
                </label>
              </Box>

              <Box>
                <label>
                  {" "}
                  <br />
                  Facturación <br />
                </label>
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
          </Grid>

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
        </Grid>
      </ModalForm>
    </div>
  );
};

export default MunFacturacionModal;
