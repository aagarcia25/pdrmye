import React, { useEffect, useState } from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Dialog, DialogContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { getMenus, getToken, getUser } from '../../../../../services/localStorage';

import UploadIcon from '@mui/icons-material/Upload';
import { ITEMS, MENU, RESPONSE, RESPONSEGUIARAPIDA, RESPONSEPREGUNTASFRECUENTES, RESPONSEVIDEOS } from '../../../../../interfaces/user/UserInfo';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { base64ToArrayBuffer } from '../../../../../helpers/Files';
import { AlertS } from '../../../../../helpers/AlertS';
import { ValidaSesion } from '../../../../../services/UserServices';
import { TooltipPersonalizado } from '../../../componentes/CustomizedTooltips';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SliderProgress from '../../../SliderProgress';
import AdminVideosModal from '../../usuarios/AdminVideosTutoriales/AdminVideosModal';
import ModalForm from '../../../componentes/ModalForm';
import HelpIcon from '@mui/icons-material/Help';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const ButtonsTutorial = ({
  route,
  handleCloseMenuVideos

}: {
  route: string;
  handleCloseMenuVideos: Function;

}
) => {
  const [open, setOpen] = React.useState(false);
  const [openCarga, setOpenCarga] = React.useState(false);
  const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([])
  const [dataPreguntasFrecuentes, setDataPreguntasFrecuentes] = useState<Array<RESPONSEPREGUNTASFRECUENTES>>([])
  const [dataGuiaRapida, setDataGuiaRapida] = useState<Array<RESPONSEGUIARAPIDA>>([])


  const [idMenu, setIdMenu] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const menu: MENU[] = JSON.parse(String(getMenus()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);


  const handleClickOpen = (URLVideo: string) => {
    // setslideropen(true);
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: route,
      NOMBRE: URLVideo,
    };


    if (URLVideo !== "") {

      ValidaSesion();
      setslideropen(true);
      CatalogosServices.obtenerDoc(data).then((res) => {
        // setslideropen(true);
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

      }
    });
  };

  const handleObtenerPreguntasFrecuentes = (idmenu: string) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: 4
    };
    CatalogosServices.AdminPreguntasFrecuentes(data).then((res) => {
      if (res.SUCCESS) {
        setDataPreguntasFrecuentes(res.RESPONSE);
      } else {

      }
    });
  };

  const handleObtenerGuiasRapidas = (idmenu: string) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: 4
    };
    CatalogosServices.AdminGuiaRapida(data).then((res) => {
      if (res.SUCCESS) {
        setDataGuiaRapida(res.RESPONSE);
      } else {

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
    handleObtenerPreguntasFrecuentes(idMenu);
    handleObtenerGuiasRapidas(idMenu);
    // handleCloseMenuVideos();

  };


  useEffect(() => {
    ValidaSesion();
    menu.map((item: MENU) => {
      item.items.map((itemsMenu: ITEMS) => {
        if (String(itemsMenu.Path) === (window.location.href).slice((window.location.href).indexOf("#") + 1).replace(/%20/g, " ")) {
          setIdMenu(itemsMenu.id);
          handleObtenerVideos(itemsMenu.id);
          handleObtenerPreguntasFrecuentes(itemsMenu.id);
          handleObtenerGuiasRapidas(itemsMenu.id);
        }
      });
    });
  }, [window.location.href]);

  return (
    <div >
      <SliderProgress open={slideropen}></SliderProgress>

      <Grid className='containerBotonesControladoresVideos'
        container direction="row" justifyContent="center" alignItems="center"  >
        {dataVideos.length === 0 ? "" :
          <Grid item xs={5}>
            <TooltipPersonalizado
              placement="left"
              title={
                <React.Fragment>
                  <div className='containerBotonesVideos'>
                    <Typography variant='h5' className='TooltipPersonalizado'>Video Tutorial</Typography>
                    <Grid container className='containerVideosLista' >
                      {dataVideos.length === 0 ?
                        ""
                        :
                        dataVideos.map((datos) => {
                          return (
                            <Grid key={Math.random()}
                              container
                              direction="row"
                              justifyContent="space-around"
                              alignItems="center" >
                              <Grid key={Math.random()} item xs={9.5}>
                                <div key={Math.random()} className='div-BotonesVideos'>
                                  <IconButton key={Math.random()} className='VerVideos' onClick={() => handleClickOpen(String(datos?.nombreVideo))}>
                                    <OndemandVideoIcon />
                                    <Typography variant='h6' className='FuenteDeBotonesTooltip'>
                                      {datos?.nombreOriginal + " "}
                                    </Typography>
                                  </IconButton>
                                </div>
                              </Grid>

                              {user.PERFILES[0].Referencia === "ADMIN" ?
                                <Grid key={Math.random()} item xs={2}>
                                  <div key={Math.random()} className='div-BotonesVideos'>
                                    <IconButton key={Math.random()} className='VerVideos' onClick={() => handleClickDelet(datos?.nombreVideo, route)}>
                                      <DeleteForeverIcon
                                      />
                                    </IconButton>
                                  </div>
                                </Grid >
                                : ""}
                            </Grid>
                          );
                        })
                      }

                    </Grid>
                  </div>
                </React.Fragment>
              }>
              <IconButton className='ControlVideosHeader'
                onClick={() => handleClickOpen(dataVideos.length === 1 ? dataVideos[0]?.nombreVideo : "")}>
                <OndemandVideoIcon className="IconoDentroBoton" />
              </IconButton>
            </TooltipPersonalizado>
          </Grid>
        }
        {
          user.PERFILES[0].Referencia === "ADMIN" ?
            <Grid item xs={5} >
              <Tooltip title="Cargar Video Tutorial">
                <IconButton className='ControlVideosHeader' onClick={handleClickOpenCarga}>
                  <UploadIcon className="IconoDentroBoton" />
                </IconButton>
              </Tooltip>
            </Grid>
            : ""
        }


        {dataGuiaRapida.length === 0 ? "" :
          <>
            <Grid container item xs={12} direction="row" justifyContent="flex-start" >
              <TooltipPersonalizado placement="left"
                title={
                  <React.Fragment>
                    <div className='containerBotonesVideos'>
                      <Typography variant='h5' className='TooltipPersonalizado'> Guía Rapida</Typography>
                      <Grid container className='containerVideosLista' >
                        {dataGuiaRapida.length === 0 ?
                          ""
                          :
                          dataGuiaRapida.map((datos) => {
                            return (
                              <Grid key={Math.random()}
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center" >
                                <Grid key={Math.random()} item xs={12}>
                                  <div key={Math.random()} className='div-BotonesVideosTexto'>
                                    <Grid key={Math.random()} item>
                                      <Typography variant='h5' className='FuenteDeBotonesTooltip'>
                                        {datos?.Pregunta + " "}
                                      </Typography>
                                    </Grid>
                                    <Grid key={Math.random()} item >
                                      <Typography variant='h6' className='FuenteDeBotonesTooltip'>
                                        {datos?.RutaGuia + " "}
                                      </Typography>
                                    </Grid>


                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })
                        }

                      </Grid>
                    </div>
                  </React.Fragment>
                }>
                <IconButton className='ControlMenuHeaderButton'
                // onClick={onOpenHelp} 
                >
                  <MenuBookIcon className="IconoDentroBoton" />
                  <Typography variant='h6' className='TextoMenuHeader'> Guía Rapida</Typography>

                </IconButton>
              </TooltipPersonalizado>
            </Grid>
          </>
        }
        {dataPreguntasFrecuentes.length === 0 ? "" :
          <>
            <Grid container item xs={12} justifyContent="flex-start" >
              <TooltipPersonalizado
                placement="left"
                title={
                  <React.Fragment>
                    <div className='containerBotonesVideos'>
                      <Typography variant='h5' className='TooltipPersonalizado'> Preguntas frecuentes</Typography>
                      <Grid container className='containerVideosLista' >
                        {dataPreguntasFrecuentes.length === 0 ?
                          ""
                          :
                          dataPreguntasFrecuentes.map((datos) => {
                            return (
                              <Grid key={Math.random()}
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center" >
                                <Grid key={Math.random()} item xs={12}>
                                  <div key={Math.random()} className='div-BotonesVideosTexto'>
                                    <Grid key={Math.random()} item>
                                      <Typography variant='h5' className='FuenteDeBotonesTooltip'>
                                        {datos?.Pregunta + " "}
                                      </Typography>
                                    </Grid>
                                    <Grid key={Math.random()} item >
                                      <Typography variant='h6' className='FuenteDeBotonesTooltip'>
                                        {datos?.Texto + " "}
                                      </Typography>
                                    </Grid>


                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })
                        }

                      </Grid>
                    </div>
                  </React.Fragment>
                }>
                <IconButton className='ControlMenuHeaderButton'
                // onClick={onOpenHelp}
                >
                  <HelpIcon className="IconoDentroBoton" />
                  <Typography variant='h6' className='TextoMenuHeader'> Preguntas Frecuentes</Typography>
                </IconButton>
              </TooltipPersonalizado>

            </Grid>
          </>
        }



      </Grid >

      {open ?
        <ModalForm title={'Visualizar Video'} handleClose={handleClose}>
          <div className='containerCenter'>
            <Grid item className='contenedorDeReproductorVideo'  >
              <video
                autoFocus
                loop
                autoPlay
                width={"100%"}
                height={"100%"}
                src={videoUrl}
                id="video_player"
                controls
              />
            </Grid>
          </div>

        </ModalForm>
        : ""

      }

      {openCarga ?
        <AdminVideosModal IdMenu={idMenu} modo={"Agregar Video"} tipo={0} handleClose={handleClose} dt={{}} /> : ""
      }
    </div >
  )
}

export default ButtonsTutorial

export const handleClickDelet = (URLVideo: string, route: string) => {

  let data = {
    TOKEN: JSON.parse(String(getToken())),
    RUTA: route,
    NOMBRE: URLVideo,
  };

  if (URLVideo !== "") {
    ValidaSesion();
    CatalogosServices.deleteDoc(data).then((res) => {
      if (res.SUCCESS) {
        AlertS.fire({
          title: "¡Video eliminado!",
          icon: "success",
        });
      }
      else {
        AlertS.fire({
          title: "¡ups!. Algo Fallo",
          icon: "error",
        });
      }
    });
  }
};
