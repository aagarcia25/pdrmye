import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { getMenus, getToken, getUser } from '../../../../../services/localStorage';
import { ITEMS, MENU, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import Swal from 'sweetalert2';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SliderProgress from '../../../SliderProgress';
import { ValidaSesion } from '../../../../../services/UserServices';
import UploadIcon from '@mui/icons-material/Upload';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { COLOR } from '../../../../../styles/colors';
const ModalCargarVideos = ({
  openCarga,
  idMenu,
  handleClose,
  fullScreen
}: {
  openCarga: boolean;
  idMenu: string;
  handleClose: Function;
  fullScreen : boolean;
}
) => {
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [newVideo, setNewVideo] = useState(Object);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  function enCambioFile(event: any) {
    if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "video") {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));
      setNewVideo(file);
    }
    else {

      Swal.fire("¡No es un video!", "", "warning");
    }

  }

  const SaveVideo = () => {
    ValidaSesion();
    setslideropen(true)
    const formData = new FormData();

    formData.append("VIDEO", newVideo, nombreArchivo);
    formData.append("CHUSER", user.id);
    formData.append("CHID", idMenu);
    formData.append("NAME", nombreArchivo);
    formData.append("TOKEN", JSON.parse(String(getToken())));

    AuthService.SaveVideoTutorial(formData).then((res) => {
      if (res.SUCCESS || res.RESPONSE) {
        Toast.fire({
          icon: "success",
          title: "Video Cargado ",
        });
        handleClose();
        setslideropen(false);
        setNombreArchivo("");
        setNewVideo(null);
      }
      if (!res.SUCCESS) {
        Toast.fire({
          icon: "error",
          title: "Error Carga de Video",
        });
        handleClose();
        setslideropen(false);
      }
    });
    handleClose();
  };

  return (
    <div>
      <SliderProgress open={slideropen}></SliderProgress>
      <Dialog

      fullScreen={fullScreen}

        open={openCarga}
        sx={{ color: "rgb(175, 140, 85)", zIndex: 2000 }}
        maxWidth={"lg"}

      >
        <div className='containerModalCargarVideos'>

          <div className='containerPreVisualizarVideo'>
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center" >

              <Grid className='contenedorDeReproductorVideo' item xs={10}>

                <video
                  autoPlay
                  width={"100%"}
                  height={"100%"}
                  hidden={!nombreArchivo}
                  src={videoPreview}
                  id="video_player"
                  controls
                />
              </Grid>
              <Grid item xs={12}>
                <div className={nombreArchivo ? "adminVideosCargado" : "adminVideosEsperaCarga"}>
                  <input
                    id="imagencargada"
                    accept="video/*"
                    onChange={(v) => { enCambioFile(v) }}
                    type="file"
                    // 
                    style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }}
                  />
                  {nombreArchivo === "" ?
                    <>
                      <UploadIcon sx={{ width: "100%", height: "100%" }} />
                    </>
                    :
                    <OndemandVideoIcon sx={{ width: "100%", height: "100%" }} />}
                </div>
              </Grid>

            </Grid>
          </div>
          {nombreArchivo === "" ? "" :
            <Grid>
              <Grid>
                <Typography variant='h6'>Nombre del archivo: </Typography>
              </Grid>
              <Grid>
                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={nombreArchivo}
                  fullWidth
                  variant="outlined"
                  size='small'
                  onChange={(v) => setNombreArchivo(v.target.value)}
                  sx={{ paddingBottom: "2%" }}
                />
              </Grid>
            </Grid>
          }
          <DialogActions>
            <Button
              className="cancelar"
              onClick={() => { setNombreArchivo(""); setNewVideo(null); setVideoPreview(""); handleClose(); }} >Cancelar</Button>
            <Button
              className="guardar"
              onClick={() => SaveVideo()} >Guardar</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default ModalCargarVideos
