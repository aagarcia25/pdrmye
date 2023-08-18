import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";

const UmasModel = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const [diario, setDiario] = useState("");
  const [mensual, setMensual] = useState("");
  const [anual, setAnual] = useState("");
  const user: USUARIORESPONSE= JSON.parse(String(getUser()));


  const handleSend = () => {
    if (!diario || !anio || !mensual || !anual) {
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
        DIARIO: diario,
        MENSUAL: mensual,
        ANUAL: anual
      };

      handleRequest(data);
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
    CatalogosServices.umas(data).then((res) => {
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
    CatalogosServices.umas(data).then((res) => {
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
    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setAnio(dt?.row?.Anio);
      setDiario(dt?.row?.Diario);
      setMensual(dt?.row?.Mensual);
      setAnual(dt?.row?.Anual);
    }
  }, [dt]);

  return (




    <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose}>

      <Grid container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ paddingRight: "2%", paddingLeft: "2%" }}   >
          <TextField
            required
            margin="dense"
            id="Anio"
            label="Año"
            value={anio}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnio(v.target.value)}
            error={anio === "" ? true : false}
            InputProps={{
              readOnly: tipo === 1 ? false : true,
              inputMode: "numeric",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Diario"
            label="Diario"
            value={diario}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setDiario(v.target.value)}
            error={diario === "" ? true : false}
            InputProps={{
              inputMode: "decimal",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Mensual"
            label="Mensual"
            value={mensual}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setMensual(v.target.value)}
            error={mensual === "" ? true : false}
            InputProps={{
              inputMode: "numeric",
            }}
          />

          <TextField
            required
            margin="dense"
            id="Anual"
            label="Anual"
            value={anual}
            type="number"
            fullWidth
            variant="standard"
            onChange={(v) => setAnual(v.target.value)}
            error={anual === "" ? true : false}
            InputProps={{
              inputMode: "numeric",
            }}
          />
        </Grid>
      </Grid>

      <Grid container
        sx={{ mt: "2vh", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
        <Grid item xs={4} sm={3} md={2} lg={1}>
          <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
        </Grid>
      </Grid>
    </ModalForm>


  );
};

export default UmasModel;
