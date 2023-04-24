import { Box, Button, Dialog, DialogActions, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import { RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getUser } from '../../../../../services/localStorage';
import ModalForm from '../../../componentes/ModalForm';

export const ClasificadorSPModal = ({
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
    const [cla, SetCla] = useState("");
    const [desCla, setDesCla] = useState("");
    const [tipoCla, setTipoCla] = useState("");
    const [claveAuxiliar, setClaveAuxiliar] = useState("");


    const user: RESPONSE = JSON.parse(String(getUser()));




    const handleSend = () => {

        let data = {
            NUMOPERACION: tipo,
            CHID: id,
            CHUSER: user.id,
            CLASIFICACION: cla,
            DESCLASIFICACION: desCla,
            TIPO: tipoCla
        }


        handleRequest(data);

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
        CatalogosServices.IndexClasificacionSP(data).then((res) => {

            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: titulo,
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
        } else {
            setId(dt?.row?.id);
            SetCla(dt?.row?.Clasificacion);
            setTipoCla(dt?.row?.tipo);
            setDesCla(dt?.row?.DescripcionClasificacion)
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
                                label="Clasificacion"
                                value={cla}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => SetCla(v.target.value)}
                                error={cla === "" ? true : false}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                margin="dense"
                                required
                                id="descripcion"
                                label="Descripción Clasificación"
                                value={desCla}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setDesCla(v.target.value)}
                                error={desCla === "" ? true : false}
                                InputLabelProps={{ shrink: true }}

                            />

                            <TextField
                                margin="dense"
                                required
                                id="Auxiliar"
                                label="Tipo"
                                value={tipoCla}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setTipoCla(v.target.value)}
                                error={tipoCla === "" ? true : false}
                                InputLabelProps={{ shrink: true }}
                            />

                            <DialogActions>
                                <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <Button
                                        disabled={
                                            cla === "" || desCla === "" || tipoCla === "" ||
                                            cla === undefined || desCla === undefined || tipoCla === undefined
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

