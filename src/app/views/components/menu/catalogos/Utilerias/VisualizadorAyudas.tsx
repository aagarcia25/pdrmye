import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AlertS } from '../../../../../helpers/AlertS';
import { base64ToArrayBuffer } from '../../../../../helpers/Files';
import { ValidaSesion } from '../../../../../services/UserServices';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getToken } from '../../../../../services/localStorage';
import SliderProgress from '../../../SliderProgress';

export const VisualizadorAyudas = (
    {
        URLVideo,
        modo,
        handleclose

    }: {
        URLVideo: string;
        modo: string;
        handleclose: Function;

    }


) => {

    const [open, setOpen] = React.useState(false);
    const [archivoUrl, setArchivoUrl] = useState<string>("");
    const [modoVisualizacion, setModoVisualizacion] = useState<string>("");
    const [slideropen, setslideropen] = useState(false);


    const handleClickOpen = (URLVideo: string, modo: string) => {

        // setslideropen(true);
        let data = {
            TOKEN: JSON.parse(String(getToken())),
            RUTA: modo === "video" ? "/VIDEOS/TUTORIALES/" : "/GUIAS/",
            NOMBRE: URLVideo,
        };


        if (URLVideo !== "") {

            ValidaSesion();
            setslideropen(true);
            setModoVisualizacion(modo)
            CatalogosServices.obtenerDoc(data).then((res) => {
                // setslideropen(true);
                if (res.SUCCESS) {
                    var bufferArray = base64ToArrayBuffer(res.RESPONSE.RESPONSE.FILE);
                    var blobStore = new Blob([bufferArray], { type: res.RESPONSE.RESPONSE.TIPO });
                    var data = window.URL.createObjectURL(blobStore);
                    var link = document.createElement('a');
                    document.body.appendChild(link);
                    link.href = data;
                    setArchivoUrl(link.href);
                    setslideropen(false);

                }
                else {
                    setslideropen(false);

                    AlertS.fire({
                        title: "Algo Fallo, Recargue la página!",
                        icon: "error",
                    });
                }

            });
        }
    };




    useEffect(() => {
        handleClickOpen(URLVideo, modo)
    }, []);

    return (

        <Dialog
            className='containerVizualizar'
             fullScreen
             sx={{ zIndex: 2000 }}
            open={true}>

            <div >
                <SliderProgress open={slideropen} />
                {/* <ModalForm title={'Visualizar'} handleClose={handleClose}> */}
                <Grid container className="HeaderModal" justifyContent="flex-end" alignItems="center" paddingTop={1} paddingBottom={.5} >
                    <Grid item xs={10} sm={10} md={10} lg={10} >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography variant="h4" >
                                Visualizar
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1.5} paddingBottom={0} >
                        <Grid container alignItems="flex-end" direction="row" justifyContent="flex-end" paddingRight={1} >
                            <Tooltip title="Salir">
                                <IconButton size="large" className="cerrar" aria-label="close" onClick={() => handleclose()}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>

                <div
                 className='containerCenterVizualizar'
                >

                    {modoVisualizacion === "video" ?
                        <Grid item  className='contenedorDeReproductorVideo'  >
                            <video
                                autoFocus
                                loop
                                autoPlay
                                width={"100%"}
                                height={"100%"}
                                src={archivoUrl}
                                id="video_player"
                                controls
                            />
                        </Grid>
                        :
                        <object
                            className="responsive-iframe"
                            data={archivoUrl}
                            type="text/html">
                        </object>
                    }

                </div>

                {/* </ModalForm> */}


            </div> 
         </Dialog> 
    )
}
