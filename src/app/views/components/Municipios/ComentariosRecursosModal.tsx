import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, ToggleButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import BotonesAPD from "../componentes/BotonesAPD";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Alert } from '../../../helpers/Alert';
import { CatalogosServices } from '../../../services/catalogosServices';
import { Toast } from '../../../helpers/Toast';
import CloseIcon from '@mui/icons-material/Close';



export const ComentariosRecursosModal = (
    {
        data,
        open,
        handleClose,
        modo,
    }
        :
        {
            modo: String;
            data: any;
            open: boolean;
            handleClose: Function;
        }
) => {
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [comentarios, setComentarios] = useState<string>();






    /////////////////////



    useEffect(() => {

        console.log(data)
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>

            <Box>
                <Slider open={openSlider}></Slider>
                <Dialog open={Boolean(open)} fullWidth={true}
                //fullScreen={modo=="ver"?true:false}
                >
                    <Grid container sx={{ justifyContent: "space-between ", width: "100%" }}>
                        <Grid item xs={10} md={10} lg={10} >

                            <DialogTitle>Solicitud de Anticipo de Participaciones</DialogTitle>

                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <Tooltip title={"Agregar"}>
                                <ToggleButton value="check" onClick={() => handleClose()}>
                                    <CloseIcon />
                                </ToggleButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <DialogContent dividers={true}>
                        <Grid container spacing={1} sx={{ justifyContent: "center", width: "100%" }} >
                        </Grid>
                        <Grid container
                            sx={{ justifyContent: "center", width: '100%' }} >


                            <Grid container spacing={3} sx={{ justifyContent: "center", width: "100%" }}>
                                <Grid item xs={12}>
                                    <label >Comentarios<br /><br /></label>
                                    <TextField
                                        multiline
                                        value={comentarios}
                                        rows={4}
                                        type="text"
                                        onChange={(v) => setComentarios(v.target.value)}
                                        sx={{
                                            width: "100%",

                                        }}
                                    />
                                </Grid>

                            </Grid>

                        </Grid>
                    </DialogContent>

                    <Grid container spacing={3} sx={{ justifyContent: "right ", width: "100%" }}>
                        <Grid item xs={2}>
                            <button className="guardar" onClick={() => handleClose()}>Autorizar</button>
                        </Grid>
                        <Grid item xs={2}>
                            <button className="cerrar" onClick={() => handleClose()}> Cancelar</button>
                        </Grid>

                    </Grid>
                </Dialog>
            </Box>
        </div>
    );
};
