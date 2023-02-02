import { Box, Button, Dialog, DialogActions, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import { RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getUser } from '../../../../../services/localStorage';
import ModalForm from '../../../componentes/ModalForm';

export const CatTPModal = ({
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

    const [id, setId] = useState("");
    const [descripcion, SetDescripcion] = useState("");
    const [abreviacion, setAbreviacion] = useState("");
    const [descripcionTipoPago, setDescripcionTipoPago] = useState("");
    const [tipoPago, setTipoPago] = useState("");

     
    const user: RESPONSE = JSON.parse(String(getUser()));
  
 
  
 
    const handleSend = () => {
      if (descripcion === "" || abreviacion === "" || descripcionTipoPago === "" || tipoPago === "") {
        AlertS.fire({
          title: "Error!",
          text: "Favor de Completar los Campos",
          icon: "error",
        });
      } else {
        let data = {
          NUMOPERACION: tipo,
          CHID: id,
          CHUSER: user.id,
          DESCRIPCION: descripcion,
          ABREVIACION:abreviacion,
          DESCRIPCIONTIPOPAGO:descripcionTipoPago,
          TIPOPAGO: tipoPago
        
  
        };
        handleRequest(data);
      }
    };
  
  
    const handleRequest = (data: any) => {
      let titulo = "";
      if (tipo === 1) {
        //AGREGAR
        titulo = "Registro Agregado!";
      } else if (tipo === 2) {
        //EDITAR
        titulo = "Registro Editado!";
      }
  CatalogosServices.IndexCatRetenciones(data).then((res) => {

        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: titulo,
          });
          handleClose();
        } else {
          AlertS.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
  
    };
  
    useEffect(() => {
      if (dt === "") {
      } else {
        setId(dt?.row?.id);
        SetDescripcion(dt?.row?.Descripcion);
        setAbreviacion(dt?.row?.Abreviacion);
        setDescripcionTipoPago(dt?.row?.DescripcionTipoPago)
        setTipoPago(dt?.row?.TipoPago);
      }
    }, [dt]);
  
  
    return (
      <div >
        <Dialog open={open} fullScreen>
          <ModalForm title={modo} handleClose={handleClose}>
            <Box display="flex" justifyContent="center" boxShadow={2} maxWidth="100%" >
  
              <Box maxWidth="100%" sx={{ padding: "2%" }}>
  
   
  
                <TextField
                  required
                  margin="dense"
                  id="descripcion"
                  label="Descripción"
                  value={descripcion}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => SetDescripcion(v.target.value)}
                  error={descripcion === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
                  
                />
 
                <TextField
                  margin="dense"
                  required
                  id="Abreviacion"
                  label="Abreviacion"
                  value={abreviacion}
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setAbreviacion(v.target.value)}
                  error={abreviacion === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
  
                />
  
                <TextField
                  margin="dense"
                  required
                  id="DescripcionTipoPago"
                  label="Descripcion de Tipo de Pago"
                  value={descripcionTipoPago}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setDescripcionTipoPago(v.target.value)}
                  error={descripcionTipoPago === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
                />

               <TextField
                  margin="dense"
                  required
                  id="tipoPago"
                  label="Tipo de Pago"
                  value={tipoPago}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setTipoPago(v.target.value)}
                  error={tipoPago === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
                  
                <DialogActions>
                    <Grid  container   direction="row" justifyContent="center" alignItems="center" >
                      <Button
                      disabled={
                        descripcion === "" || abreviacion === "" || descripcionTipoPago === "" || tipoPago === ""||
                        descripcion === undefined || abreviacion === undefined || descripcionTipoPago === undefined || tipoPago === undefined
                      }
                      className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
                  </Grid>
                </DialogActions>
              </Box>
            </Box>
          </ModalForm>
  
        </Dialog>
      </div>
    )
  }

