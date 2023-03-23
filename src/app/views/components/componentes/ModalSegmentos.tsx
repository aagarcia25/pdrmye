import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip } from '@mui/material';
import { RESPONSE } from '../../../interfaces/user/UserInfo';
import { getUser } from '../../../services/localStorage';
import { AlertS } from '../../../helpers/AlertS';
import { CatalogosServices } from '../../../services/catalogosServices';

export const ModalSegmentos = ({
    vrows,
    handleClose,
  }: {
    vrows: any;
    handleClose: Function;
  }) => {

    const [numeroOperacion, SetNumeroOperacion] = useState<string>();
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [title, setTitle] = useState<string>();
    const [label, setLabel] = useState<string>();
    const [proveedor, setProveedor] = useState<string>();
    

    useEffect(() => {
        console.log(vrows);
          setProveedor(vrows.row.Proveedor +' / '+vrows.row.Nombre);
          setTitle('Segmentar Operación');
          setLabel('Importe:');
      }, [vrows]);

      
    const validacion = () => {

        if (numeroOperacion === '') {
          AlertS.fire({
            title: "Error!",
            text: "Favor de llenar el campo Comentarios*",
            icon: "error",
          });
        } else {
    
        
          const formData = new FormData();
          formData.append("IDPA",vrows.id,);
          formData.append("CHUSER", user.id);
          formData.append("TOTAL", String(numeroOperacion));
          formData.append("tipo", "segmentaOperacion");
          CatalogosServices.migraData(formData).then((res) => {
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
                title: "Error!",
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
                <h5>Total del Registro: {vrows.row.importe}</h5>
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
