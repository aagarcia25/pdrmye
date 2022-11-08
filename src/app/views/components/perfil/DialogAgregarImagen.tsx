import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, Input } from "@mui/material"
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { isNull } from "util";
import { AuthService } from "../../../services/AuthService";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { id } from "date-fns/locale";

export function DialogAgregarImagen({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: Function;
}) {
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [uploadFile, setUploadFile] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const[openDialogConfirmacion,setOpenDialogConfirmacion]=useState(false);

    const [nombreArchivo, setNombreArchivo] = useState(
        "Arrastre o de click aquí para seleccionar archivo"
    );
    const [tipoArchivo, setTipoArchivo] = useState("");
    const [disabledButton, setDisabledButton] = useState(true);

    const SaveImagen = () => {
        const formData = new FormData();
        formData.append("IMAGEN", newImage, nombreArchivo);
        formData.append("CHUSER", user.id);


        AuthService.SaveImagen(formData).then((res) => {
            console.log(res.RESPONSE);
        });

        handleClose();

    };
    


    function enCambioFile(event: any) {
        setUploadFile(URL.createObjectURL(event.target.files[0]));
        setNombreArchivo(event.target.value.split("\\")[2]);
        let file = event.target!.files[0]!;
        setTipoArchivo((event.target.value.split(".")[1])) 
        setNewImage(file);
        {
            nombreArchivo === null
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
                        id="imagencargada"
                        accept="image/*"
                        onChange={(v) => { enCambioFile(v) }}
                        type="file"
                        style={{ zIndex: 2, opacity: 0, width: '100%', height: '80%', position: "absolute", cursor: "pointer", }} /
                    >
                    {disabledButton ?
                        user.RutaFoto === "" ? <AddPhotoAlternateIcon sx={{ width: "90%", height: "90%" }} />
                            : <img src={user.RutaFoto} style={{ objectFit: "scale-down", width: '100%', }} />
                        :
                        <img src={uploadFile} style={{ objectFit: "scale-down", width: '100%', }} />
                    }

                </Box>
                <Box sx={{ width: "25vw", height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {nombreArchivo==="" ?
                        <Typography sx={{ textAlign: "center" }}>Arrastre la nueva imagen o presione el icono para seleccionar archivo</Typography> :
                        <Typography>Nombre del archivo: {disabledButton.toString()}</Typography>
                        
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="error">Cancelar</Button>

                <Button disabled={(disabledButton && !(tipoArchivo === "jpg" || tipoArchivo === "png" || tipoArchivo === "svg" || tipoArchivo === "jpeg") ? true: false) ? true : false} onClick={()=>setOpenDialogConfirmacion(true)} color="success">Guardar cambios</Button>
            </DialogActions>
            
            
            <Dialog
                open={openDialogConfirmacion}
                onClose={()=>setOpenDialogConfirmacion(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cambiar Imagen"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       ¿ Desea cambiar la imagen actual por {nombreArchivo} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpenDialogConfirmacion(false)}>Cancelar</Button>
                    <Button onClick={SaveImagen} color="success">Aceptar</Button>
                </DialogActions>
            </Dialog>


        </Dialog>
    )
}