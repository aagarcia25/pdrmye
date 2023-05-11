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

const ModalCargarVideos = ({
  openCarga,
  idMenu,
  handleClose
}: {
  openCarga : boolean;
  idMenu: string;
  handleClose: Function;
}
) => {
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [newVideo, setNewVideo] = useState(Object);
  const [nombreArchivo, setNombreArchivo] = useState("");

  function enCambioFile(event: any) {
    if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "video") {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
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

    formData.append("TIPO", "DPCP/");
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
        open={openCarga}
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
            <Button onClick={() => { setNombreArchivo(""); handleClose(); }} color="error">Cancelar</Button>
            <Button
              onClick={() => SaveVideo()} color="success">Guardar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ModalCargarVideos
