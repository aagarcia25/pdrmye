import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Button, Grid } from "@mui/material";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import ModalForm from "../../../componentes/ModalForm";
import { loadSelect } from "../../../../../share/loadSelect";

const MunPoblacionProyeccionModal = ({
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
  const [poblacion, setPoblacion] = useState<number>();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [IdMunicipio, setIdMunicipio] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [mun, setMun] = useState<SelectValues[]>([]);

  const handleSend = () => {
    if (poblacion == null) {
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
        IDMUNICIPIO: IdMunicipio,
        POB: poblacion,
      };
      handleRequest(data);
    }
  };

  const handleFilterChange = (event: SelectValues) => {
    setIdMunicipio(event.value);
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

  const agregar = (data: any) => {
    CatalogosServices.munproyec(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
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

  const editar = (data: any) => {
    CatalogosServices.munproyec(data).then((res) => {
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

  const consumirLoadSelect = async (tipo: number) => {
    try {
      const result: SelectValues[] = await loadSelect(tipo);
      if (tipo == 5) {
        setMun(result);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    consumirLoadSelect(5);

    if (dt == "") {
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.anio);
      setPoblacion(dt?.row?.Pob);
      setIdMunicipio(dt?.row?.idmunicipio);
      setMunicipio(dt?.row?.Nombre);
    }
  }, [dt]);

  return (
    <div>
      <ModalForm title={modo} handleClose={handleClose}>
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
          <Grid item xs={12} sm={8} md={8} lg={7}>
            <Box>
              <label className="Titulo">{municipio}</label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={7}>
            <TextField
              margin="dense"
              required
              id="pob"
              label="Area"
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

export default MunPoblacionProyeccionModal;
