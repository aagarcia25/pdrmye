import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertS } from '../../../helpers/AlertS';
import { USUARIORESPONSE } from '../../../interfaces/user/UserInfo';
import { DPCPServices } from '../../../services/DPCPServices';
import { getUser } from '../../../services/localStorage';


export const ModalCheque = ({
  vrows,
  handleClose,
  tipo,
}: {
  vrows: any;
  handleClose: Function;
  tipo: number;
}) => {


  const [numeroOperacion, SetNumeroOperacion] = useState<string>();
  const user: USUARIORESPONSE= JSON.parse(String(getUser()));
  const [title, setTitle] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [proveedor, setProveedor] = useState<string>();

  useEffect(() => {
    setProveedor(vrows.row.Proveedor +' / '+vrows.row.Nombre);
    if (tipo == 1) {
      setTitle('Asignar Póliza de Pago');
      setLabel('Póliza de Pago:');
    } else if (tipo == 2) {
      setTitle('Asignar N° de Participación');
      setLabel('Número de Participación:');
    } else if (tipo == 3) {
      setTitle('Asignar N° de Solicitud de Egreso');
      setLabel('Número de Solicitud de Egreso:');
    } else if (tipo == 4) {
      setTitle('Asignar N° de Egreso');
      setLabel('Número de Egreso:');
    } else if (tipo == 5) {
      setTitle('Asignar N° de Solicitud de Pago');
      setLabel('Número de Solicitud de Pago:');
    } else if (tipo == 6) {
      setTitle('Asignar N° de Requerimiento de Anticipo');
      setLabel('Número de Requerimiento de Anticipo:');
    }


  }, [vrows]);




  const validacion = () => {

    if (numeroOperacion === '') {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    } else {

      let data = {
        NUMOPERACION: tipo,
        ID: vrows.id,
        CHUSER: user.Id,
        OPERACION: numeroOperacion
      };

      DPCPServices.AsignaOperacion(data).then((res) => {
        if (res.SUCCESS) {
          AlertS.fire({
            icon: "success",
            title: res.RESPONSE,
            text: 'Se Actualizo el Registro Correspondiente'
          }).then(async (result) => {
            if (result.isConfirmed) {
              handleClose();
            }
          });
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });




    }


  }

  return (
    <div>
      <Box>
        <Dialog open={true}>
          <Grid container justifyContent="space-between" >
            <DialogTitle>{title}</DialogTitle>
            <Tooltip title={"Cerrar"}>
              <Button className="CerrarModal"
                variant="outlined" color="error"
                onClick={() => handleClose()} >
                X
              </Button>
            </Tooltip>
          </Grid>

          <DialogContent dividers={true}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                <h3> {proveedor}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3> {label}</h3>
              </Grid>
              <Grid item xs={12}>
              <TextField
                      required
                      // disabled
                      margin="dense"
                      id="NumOperacion"
                      value={numeroOperacion}
                      // type="number"
                      fullWidth
                      variant="outlined"
                      onChange={(v) => SetNumeroOperacion(v.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
       
              </Grid>

            </Grid>

          </DialogContent>


          <DialogActions>
            <Button color='success' className="guardar" onClick={() => validacion()}
              disabled={!numeroOperacion} >
              Guardar
            </Button>


          </DialogActions>

        </Dialog>
      </Box>
    </div>
  )
}
