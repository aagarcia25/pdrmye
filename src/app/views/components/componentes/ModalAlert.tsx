import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Alert } from "../../../helpers/Alert";

const ModalAlert = ({
  open,
  tipo,
  handleClose,
  handleAccion,
  vrows,
  file,
}: {
  open: boolean;
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
  vrows: any;
  file: boolean;
}) => {
  const [mensaje, setMensaje] = useState<string>();
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [Inpfile, setUInpFile] = useState(Object);

  const handleNewFile = (event: any) => {
    setUInpFile(event?.target?.files?.[0] || "");
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }
  };

  const validacion = () => {
    if(mensaje == "" || mensaje == null){
      Alert.fire({
        title: "Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    }else{
      handleAccion({ data: vrows, texto: mensaje , file:Inpfile})
    }
    
  }





  return (
    <div>
      <Box>
        <Dialog open={open}>
          <DialogTitle>{tipo}</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                  <h3> Comentarios:</h3>
              </Grid>
              <Grid item xs={12}>
                <textarea
                  required
                  spellCheck="true"
                  rows={5}
                  onChange={(v) => setMensaje(v.target.value)}
                  style={{ width: "100%"}}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
              <Box sx={{ display: file ? "block" : "none" ,  }}>
             
              <Grid item xs={12}>
                <label className="contenido">Añade un documento(Opcional):</label>
                {/* <IconButton
                  aria-label="upload picture"
                  component="label"
                  size="large"
                > */}
                  <input
                    id="ICV"
                    required
                    type="file"
                    
                    onChange={(event) => {
                      handleNewFile(event);
                    }}
                  />
                  {/* <UploadFileIcon /> */}
                {/* </IconButton> */}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
              <Box>
                  <label>{nameNewDoc}</label>
                </Box>
              </Grid>
              </Box>

              </Grid>



              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>



          </DialogContent>

          <DialogActions>
            <button
              className="guardar"
              onClick={() => validacion() }
            >
              Guardar
            </button>
            <button className="cerrar" onClick={() => handleClose()}>
              Cancelar
            </button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ModalAlert;
