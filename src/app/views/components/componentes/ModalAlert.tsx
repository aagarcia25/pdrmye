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
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

  return (
    <div>
      <Box>
        <Dialog open={open}>
          <DialogTitle>{tipo}</DialogTitle>
          <DialogContent dividers={true}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <label> <h3> Comentarios:</h3> </label>
            </Grid>
              <Grid item xs={12}>
              <textarea
                    required
                    spellCheck='true'
                    rows={10}
                    onChange={(v) => setMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 15, }} />
              </Grid>
              <Grid item xs={12}>
              <Divider />
              </Grid>
              <Grid item xs={4}>
                xs=4
              </Grid>
              <Grid item xs={8}>
                xs=8
              </Grid>
            </Grid>

            {/* <Box>
            <label> <h3> Comentarios:</h3> </label>
            <textarea
                    required
                    spellCheck='true'
                    rows={10}
                    onChange={(v) => setMensaje(v.target.value)}
                    style={{ width: "100%", borderRadius: 15, }} />
            </Box>



            <label> <h3> Añade un documento:</h3> </label>

            <label className="contenido">Cargar Archivo:</label>
            <IconButton
                    aria-label="upload picture"
                    component="label"
                    size="large"
                  >
                    <input
                      id="ICV"
                      required
                      type="file"
                      hidden
                      onChange={(event) => {
                        handleNewFile(event);
                      }}
                    />
                    <UploadFileIcon />
                  </IconButton>

                  <Box>
                    <label>{nameNewDoc}</label>
                  </Box>
 */}
          </DialogContent>

          <DialogActions>
            <button
              className="guardar"
              onClick={() => handleAccion({ data: vrows, texto: mensaje })}
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
