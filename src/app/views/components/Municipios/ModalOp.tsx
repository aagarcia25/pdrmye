import React, { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { AlertS } from '../../../helpers/AlertS';

const ModalOp = ({
    handleClose,
    handleAccion,
    vrows,
  }: {
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
  }) => {

    
  const [mensaje, setMensaje] = useState<string>();

  const validacion = () => {
    if(mensaje == "" || mensaje == null){
      AlertS.fire({
        title: "Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    }else{
      handleAccion({ data: vrows, texto: mensaje })
    }
    
  }



  return (
    <div>
      <Box>
        <Dialog open={true}>
          <DialogTitle>Comentario Orden de Pago</DialogTitle>
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
              Autorizar
            </button>
            <button
              className="cerrar"
              onClick={() => validacion() }
            >
              Rechazar
            </button>
            <button className="salir" onClick={() => handleClose()}>
              Salir
            </button>
          </DialogActions>

        </Dialog>
      </Box>
    </div>
  )
}

export default ModalOp
