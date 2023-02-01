import { Box, Button, Dialog, DialogActions, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import { RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getUser } from '../../../../../services/localStorage';
import ModalForm from '../../../componentes/ModalForm';

export const CatRetModal = ({
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
    const [retencion, setRetencion] = useState("");
    const [claveRetencion, setClaveRetencion] = useState("");
    const [claveAuxiliar, setClaveAuxiliar] = useState("");

     
    const user: RESPONSE = JSON.parse(String(getUser()));
  
 
  
 
    const handleSend = () => {
      if (descripcion === "" || retencion === "" || claveAuxiliar === "" || claveRetencion === "") {
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
          CLAVERETENCION: claveRetencion,
          DESCRIPCION:descripcion,
          RETENCION:retencion,
          CLAVEAUXILIAR: claveAuxiliar
        
  
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
        setRetencion(dt?.row?.Retencion);
        setClaveAuxiliar(dt?.row?.ClaveAuxiliar)
        setClaveRetencion(dt?.row?.ClaveRetencion);
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
                  id="nombre"
                  label="Descripcón"
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
                  id="descripcion"
                  label="% Retención"
                  value={retencion}
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setRetencion(v.target.value)}
                  error={retencion === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
  
                />
  
                <TextField
                  margin="dense"
                  required
                  id="Auxiliar"
                  label="Clave Auxiliar"
                  value={claveAuxiliar}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClaveAuxiliar(v.target.value)}
                  error={claveAuxiliar === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
                  <TextField
                  margin="dense"
                  required
                  id="ci"
                  label="Clave Retención"
                  value={claveRetencion}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClaveRetencion(v.target.value)}
                  error={claveRetencion === "" ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
                <DialogActions>
                    <Grid  container   direction="row" justifyContent="center" alignItems="center" >
                      <Button
                      disabled={
                        descripcion === "" || retencion === "" || claveAuxiliar === "" || claveRetencion === ""||
                        descripcion === undefined || retencion === undefined || claveAuxiliar === undefined || claveRetencion === undefined
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

