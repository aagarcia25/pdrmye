import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Alert } from "../../../helpers/Alert";

const ModalAlert = ({
  accion,
  open,
  tipo,
  handleClose,
  handleAccion,
  vrows,
}: {
  accion:number;
  open: boolean;
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
  vrows: any;
}) => {


  const [mensaje, setMensaje] = useState<string>();

  const validacion = () => {
    if(mensaje == "" || mensaje == null){
      Alert.fire({
        title: "Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    }else{
      handleAccion({ data: vrows, texto: mensaje ,tipo:accion})
    }
    
  }




  return (
    <div>
      <Box>
        <Dialog open={open} fullScreen>
          <DialogTitle>{tipo}</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                  <h3> Comentarios:</h3>
              </Grid>
              <Grid item xs={12}>
                <textarea
                  required
                  spellCheck="true"
                  rows={5}
                  onChange={(v) => setMensaje(v.target.value)}
                  style={{ width: "100%"}}
                />
              </Grid>

            </Grid>

          </DialogContent>


          <DialogActions>
            <button
              className="guardar"
              onClick={() => validacion() }
            >
              Guardar
            </button>
            <button className="cerrar" onClick={() => handleClose()}>
              Cancelar
            </button>
          </DialogActions>

        </Dialog>
      </Box>
    </div>
  );
};

export default ModalAlert;
