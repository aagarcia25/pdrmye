import { useEffect, useState } from "react";
import { Box, Dialog, DialogContent, DialogTitle, Grid, TextField, ToggleButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import { Alert } from '../../../helpers/Alert';
import { CatalogosServices } from '../../../services/catalogosServices';
import CloseIcon from '@mui/icons-material/Close';



export const ComentariosRecursosModal = (
    {
        data,
        open,
        handleClose,
        modo,
        perfil,
    }
        :
        {
            modo: String;
            data: any;
            open: boolean;
            handleClose: Function;
            perfil : string;    
        }
) => {
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [comentarios, setComentarios] = useState<string>();

    const acciones = (v: string) => {
        if (v == "autorizar") {
            if(perfil=="ANA"){
                let d = {
                    NUMOPERACION: 5,
                    CHID: data.id,
                    CHUSER: user.id,
                    ESTATUS: "DAMOPANAAUTO",
                    Comentario:comentarios,

                  };
            
                  Swal.fire({
                    icon: "info",
                    title: "Enviar",
                    text: "Desea Autorizar la Solicitud",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      CatalogosServices.SolicitudesInfo(d).then((res) => {
                        if (res.SUCCESS) {
                          console.log(res.RESPONSE)
                          handleClose();
                        } else {
            
                          Alert.fire({
                            title: "Error!",
                            text: "Fallo en la peticion",
                            icon: "error",
            
                          });
                        }
                      });
                    }
                    if (result.isDenied) {
                    }
                  });


            }



        } else if (v == "cancelar") {
            if(perfil=="ANA"){
                let d = {
                    NUMOPERACION: 5,
                    CHID: data.id,
                    CHUSER: user.id,
                    ESTATUS: "DAMOPANACAN",
                    Comentario:comentarios,
                  };
            
                  Swal.fire({
                    icon: "info",
                    title: "Enviar",
                    text: "Desea Cancelar la Solicitud",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      CatalogosServices.SolicitudesInfo(d).then((res) => {
                        if (res.SUCCESS) {
                          console.log(res.RESPONSE)
                          handleClose();
                        } else {
            
                          Alert.fire({
                            title: "Error!",
                            text: "Fallo en la peticion",
                            icon: "error",
            
                          });
                        }
                      });
                    }
                    if (result.isDenied) {
                    }
                  });


            }

        }

    }




    /////////////////////



    useEffect(() => {
        console.log(modo)
console.log(perfil)
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

                            <DialogTitle>Solicitud de Anticipo de Participaciones <br/>{" "+"Solicitante:  " +data.Solicitante}</DialogTitle>


                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <Tooltip title={"Cerrar"}>
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
                            
                            
                            
                            
                            </Grid>

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

                    <Grid container spacing={3} sx={{ justifyContent: "space-between ", width: "100%" }}>
                        <Grid item xs={4}>
                            <button className="guardar" onClick={() => acciones("autorizar")}>Autorizar Solicitud</button>
                        </Grid>
                        <Grid item xs={4} sx={{ alignItems:"left", width: "100%" }}>
                            <button className="cerrar" onClick={() => acciones("cancelar")}> Cancelar Solicitud</button>
                        </Grid>

                    </Grid>
                </Dialog>
            </Box>
        </div>
    );
};
