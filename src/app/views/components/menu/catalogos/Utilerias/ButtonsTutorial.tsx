import React, { ReactNode, useEffect, useState } from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
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
import { UserServices, ValidaSesion } from '../../../../../services/UserServices';
import { TooltipPersonalizado } from '../../../componentes/CustomizedTooltips';
import SliderProgress from '../../../SliderProgress';
import ModalCargarVideos from './ModalCargarVideos';

const ButtonsTutorial = ({
  route,
}: {
  route: string;
}
) => {
  const [slideropen, setslideropen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openCarga, setOpenCarga] = React.useState(false);
  const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([])
  const [idMenu, setIdMenu] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const menu: MENU[] = JSON.parse(String(getMenus()));
  const user: RESPONSE = JSON.parse(String(getUser()));


  const handleClickOpen = (URLVideo: string) => {
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: route,
      NOMBRE: URLVideo,
    };


    if (URLVideo !== "") {

      ValidaSesion();
      setslideropen(true);
      CatalogosServices.obtenerDoc(data).then((res) => {
        if (res.SUCCESS) {
          var bufferArray = base64ToArrayBuffer(res.RESPONSE.RESPONSE.FILE);
          var blobStore = new Blob([bufferArray], { type: res.RESPONSE.RESPONSE.TIPO });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement('a');
          document.body.appendChild(link);
          link.href = data;
          setVideoUrl(link.href);
          setslideropen(false);
          setOpen(true);
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
    setOpenCarga(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCarga(false);
    handleObtenerVideos(idMenu);
  };



  useEffect(() => {
    ValidaSesion();
    menu.map((item: MENU) => {
      item.items.map((itemsMenu: ITEMS) => {
        if (String(itemsMenu.Path) === (window.location.href).slice((window.location.href).indexOf("#") + 1).replace(/%20/g, " ")) {
          setIdMenu(itemsMenu.id);
          handleObtenerVideos(itemsMenu.id);
        }
      });
    });
  }, [window.location.href]);

  return (
    <div>
      <SliderProgress open={slideropen}></SliderProgress>
      <Grid container item xs={12}  direction="row" justifyContent="flex-start" alignItems="center" spacing={6} paddingBottom={1} >
        <Grid item xs={6} sm={2.5} md={2} lg={1.8} xl={1.5}>
          {dataVideos.length === 0 ? "" :
            <TooltipPersonalizado title={
              <React.Fragment>
                <div className='containerBotonesVideos'>
                  <Typography variant='h5' className='TooltipPersonalizado'>Video Tutorial</Typography>

                  <Grid container >

                    {dataVideos.length === 0 ?
                      ""
                      :
                      dataVideos.map((datos) => {
                        return (
                          <div  key={Math.random()} className='div-BotonesVideos'>
                            <IconButton key={Math.random()} className='VerVideos' onClick={() => handleClickOpen(String(datos.nombreVideo))}>
                              {datos.nombreOriginal + " "}
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

          }
        </Grid>
        {user.PERFILES[0].Referencia === "ADMIN" ?
          <Grid item xs={6} sm={2.5} md={2} lg={1.8} xl={1.5}>

            <Tooltip title="Cargar Video Tutorial">
              <IconButton className='agregar' onClick={handleClickOpenCarga}>
                <UploadIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          : ""}

      </Grid>


      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <video controls autoPlay autoFocus loop poster=''
            width='100%'
            height='100%'
            src={videoUrl} >

            {videoUrl}
          </video>

        </DialogContent>
      </Dialog>

      <ModalCargarVideos openCarga={openCarga} idMenu={idMenu} handleClose={handleClose} />



    </div>
  )
}

export default ButtonsTutorial
