import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, Input } from "@mui/material"
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { isNull } from "util";
import { AuthService } from "../../../services/AuthService";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

export function DialogAgregarImagen({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: Function;
}) {
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [uploadFile, setUploadFile] =useState("");
    const [newDoc, setNewDoc] = useState(Object);
    const [nombreArchivo, setNombreArchivo] = useState(
        "Arrastre o de click aquí para seleccionar archivo"
      );
    const [disabledButton, setDisabledButton] = useState(true);


    

    const SaveImagen = () => {
        const formData = new FormData();
       formData.append("IMAGEN", newDoc,nombreArchivo);
       formData.append("CHUSER", user.id);
   

        AuthService.SaveImagen(formData).then((res) => {
          console.log(res.RESPONSE);
        });
    
      };


    function enCambioFile(event: any) {
        setUploadFile(event.target.files[0]);
        setNombreArchivo(event.target.value.split("\\")[2]);
        let file = event.target!.files[0]!;
        setNewDoc(file);
        {
          nombreArchivo == null 
            ? setDisabledButton(true)
            : setDisabledButton(false);
        }
      }
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}

        >
            <DialogTitle >
                Cambiar Imagen
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                <Box sx={{ width: "25vw", height: "25vh", border: "5px dashed  black", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <input
                        onChange={(v) => enCambioFile(v)}
                        type="file"
                        style={{ zIndex: 2, opacity: 0, width: '100%', height: '80%', position: "absolute", cursor: "pointer", }} /
                    >
                    <AddPhotoAlternateIcon sx={{ width: "90%", height: "90%" }} />

                </Box>
                <Box sx={{ width: "25vw", height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                   {disabledButton?<Typography sx={{ textAlign: "center" }}>Arrastre la nueva imagen o presione el icono para seleccionar archivo</Typography>:
                   <Typography>Nombre del archivo: {nombreArchivo}</Typography>} 
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="error">Cancelar</Button>
                {disabledButton?<Button disabled color="success">Aceptar</Button>:<Button onClick={ SaveImagen} color="success">Aceptar</Button>}
                
            </DialogActions>
        </Dialog>
    )
}