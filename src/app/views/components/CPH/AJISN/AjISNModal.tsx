import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { USUARIORESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { CatalogosServices } from "../../../../services/catalogosServices";
import { getUser } from "../../../../services/localStorage";
import SelectFrag from "../../Fragmentos/SelectFrag";

export const AjISNModal = ({
  handleClose,
}: {
  handleClose: Function;
}) => {

  const [anio, setAnio] = useState("");
  const [listaFondos, setlistaFondos] = useState<SelectValues[]>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));


  const validacion = () => {
    if (anio == "") {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de llenar los Campos*",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: 1,
        P_ANIO: anio,
        P_USUARIO: user.Id,
      };
      calculosServices.AjusteISNIndex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Consulta Exitosa!",
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
    }
  };

  

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Box>
        <Dialog open={true} fullScreen>
          <DialogTitle>Generación de Ajuste Semestral</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: "sans-serif" }}>Año:</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  margin="dense"
                  id="anio"
                  value={anio}
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setAnio(v.target.value)}
                  error={anio == "" ? true : false}
                />
              </Grid>
            </Grid>

          </DialogContent>

          <DialogActions>
            <button className="guardar" onClick={() => validacion()}>
              Generar
            </button>
            <button className="salir" onClick={() => handleClose()}>
              Salir
            </button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
