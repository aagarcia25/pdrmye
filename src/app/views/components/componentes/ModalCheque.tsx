import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { AlertS } from '../../../helpers/AlertS';
import { DPCPServices } from '../../../services/DPCPServices';
import { RESPONSE } from '../../../interfaces/user/UserInfo';
import { getUser } from '../../../services/localStorage';


export const ModalCheque = ({
    vrows,
    handleClose,
    tipo,
  }: {
    vrows: any;
    handleClose: Function;
    tipo:number;
  }) => {


 const [numeroOperacion, SetNumeroOperacion] = useState<string>();
 const user: RESPONSE = JSON.parse(String(getUser()));
 const [title, setTitle] = useState<string>();
 const [label, setLabel] = useState<string>();
 

 useEffect(() => {

  if(tipo == 1){
    setTitle('Asignar Número de Cheque');
    setLabel('Número de Cheque:');
  }


}, []);




 const validacion = () => {

    if(numeroOperacion ===''){
      AlertS.fire({
        title: "Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    }else{

      let data = {
        NUMOPERACION: tipo,
        ID: vrows.id,
        CHUSER: user.id,
        OPERACION:numeroOperacion
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
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                  <h3> {label}</h3>
              </Grid>
              <Grid item xs={12}>
                <textarea
                  required
                  spellCheck="true"
                  rows={2}
                  onChange={(v) => SetNumeroOperacion(v.target.value)}
                  style={{ width: "100%"}}
                />
              </Grid>

            </Grid>

          </DialogContent>


          <DialogActions>
            <button className="guardar" onClick={() => validacion() } >
              Guardar
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
