import React, { ReactNode, useEffect, useState } from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ReactPlayer from 'react-player'
import { getMenus, getToken, getUser } from '../../../../../services/localStorage';

import { Blanco } from '../../../../../styles/imagen';
import UploadIcon from '@mui/icons-material/Upload';
import { ITEMS, MENU, RESPONSE, RESPONSESTORAGE, RESPONSEVIDEOS } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import Swal from 'sweetalert2';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { base64ToArrayBuffer } from '../../../../../helpers/Files';
import { DPCPServices } from '../../../../../services/DPCPServices';
import { AlertS } from '../../../../../helpers/AlertS';
import { UserServices } from '../../../../../services/UserServices';
import { TooltipPersonalizado } from '../../../componentes/CustomizedTooltips';
import SliderProgress from '../../../SliderProgress';

const ButtonsTutorial = ({
  route,
  controlInterno
}: {
  route: string;
  controlInterno: string;
}
) => {
  const [slideropen, setslideropen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openCarga, setOpenCarga] = React.useState(false);
  const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([])
  const [idMenu, setIdMenu] = useState<string>("");

  const user: RESPONSE = JSON.parse(String(getUser()));


  const [videoUrl, setVideoUrl] = useState<string>("");
  const [imgTipo, setImgTipo] = React.useState("video/mp4");
  const [newVideo, setNewVideo] = useState(Object);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [uploadFile, setUploadFile] = useState("");

  const [videoFilePath, setVideoFilePath] = useState("");


  const handleClickOpen = (URLVideo: string) => {
    console.log(URLVideo)
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: route,
      NOMBRE: URLVideo,
    };


    if (URLVideo !== "") {
  
      setslideropen(true);
      CatalogosServices.obtenerDoc(data).then((res) => {

        var bufferArray = base64ToArrayBuffer(res.RESPONSE.RESPONSE.FILE);
        var blobStore = new Blob([bufferArray], { type: res.RESPONSE.RESPONSE.TIPO });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = data;
        setVideoUrl(link.href);
        setslideropen(false);
        setOpen(true);
      });
    }
  };

  const handleObtenerVideos = (idmenu: string) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: 4
    };
    CatalogosServices.AdminVideoTutoriales(data).then((res) => {
      if (res.SUCCESS) {
        setDataVideos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleClickOpenCarga = () => {
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: route,
      NOMBRE: videoUrl,
    };
    // setVideoFilePath(getfilevideourl(data));
    setOpenCarga(true);
  };

  function enCambioFile(event: any) {
    console.log(event.target.files[0].type.split("/")[0])
    if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "video") {
      setUploadFile(URL.createObjectURL(event?.target?.files[0]));
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setNewVideo(file);

    }
    else {

      Swal.fire("¡No es una imagen!", "", "warning");
    }

  }

  const SaveVideo = () => {
    const formData = new FormData();

    formData.append("TIPO", "DPCP/");
    formData.append("VIDEO", newVideo, nombreArchivo);
    formData.append("CHUSER", user.id);
    formData.append("CHID", idMenu);
    formData.append("TOKEN", JSON.parse(String(getToken())));


    AuthService.SaveVideoTutorial(formData).then((res) => {

      if (res.SUCCESS) {

        Toast.fire({
          icon: "success",
          title: "Video ",
        });
        handleClose();
      }
    });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCarga(false);
    handleObtenerVideos(idMenu);
  };

  const menu: MENU[] = JSON.parse(String(getMenus()));

  useEffect(() => {
    menu.map((item: MENU) => {
      item.items.map((itemsMenu: ITEMS) => {
        if (String(itemsMenu.ControlInterno) === controlInterno) {
          setIdMenu(itemsMenu.id);
          console.log(dataVideos)
          console.log(dataVideos.length)
          handleObtenerVideos(itemsMenu.id);
        }
      });
    });
  }, [controlInterno]);

  return (
    <div>
      <SliderProgress open={slideropen}></SliderProgress>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={6} >
        <Grid item xs={6} >
          <TooltipPersonalizado title={
            <React.Fragment>
              <Typography color="inherit">Video Tutorial</Typography>
              <div className='containerBotonesVideos'>
                <Grid container >

                  {dataVideos.length <= 1 || dataVideos.length === 0 ?
                    ""
                    :
                    dataVideos.map((datos, x) => {
                      return (
                        <div className='div-BotonesVideos'>
                          <IconButton key={x} className='VerVideos' onClick={() => handleClickOpen(String(datos.nombreVideo))}>
                            {datos.nombreOriginal}
                            <OndemandVideoIcon />
                          </IconButton>
                        </div>

                      );
                    })
                  }

                </Grid>
              </div>
            </React.Fragment>
          }>
            <IconButton className='agregar'
              onClick={() => handleClickOpen(dataVideos.length === 1 ? dataVideos[0].nombreVideo : "")}>
              <OndemandVideoIcon />
            </IconButton>

          </TooltipPersonalizado>


        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Cargar Video Tutorial">
            <IconButton className='agregar' onClick={handleClickOpenCarga}>
              <UploadIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>


      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <video controls autoPlay autoFocus
            width='100%'
            height='100%'
            src={videoUrl} >

            {videoUrl}
          </video>

        </DialogContent>
      </Dialog>

      <Dialog
        open={openCarga}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

          <Grid sx={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="CargaDeArchivosCuenta">
              <input
                id="imagencargada"
                accept="video/*"
                onChange={(v) => { enCambioFile(v) }}
                type="file"
                style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }} />
              <AddPhotoAlternateIcon sx={{ width: "90%", height: "90%" }} />

            </div>

          </Grid>
          <Box sx={{ width: "100%", height: "8vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "justify" }}>
            {nombreArchivo === "" ? "" :
              <Typography>Nombre del archivo: {nombreArchivo}</Typography>
            }
          </Box>
          <DialogActions>
            <Button onClick={() => { setNombreArchivo(""); handleClose(); }} color="error">Cancelar</Button>
            <Button
              onClick={() => SaveVideo()} color="success">Guardar cambios</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ButtonsTutorial
