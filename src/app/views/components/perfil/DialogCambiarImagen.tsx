import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AuthService } from "../../../services/AuthService";
import { RESPONSE, UserInfo } from "../../../interfaces/user/UserInfo";
import { getUser, setDepartamento, setMenus, setPerfiles, setPermisos, setRoles } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";

export function DialogCambiarImagen({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: Function;
}) {
    const [user,setUser]=useState<RESPONSE>(JSON.parse(String(getUser())));
    const [uploadFile, setUploadFile] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const[openDialogConfirmacion,setOpenDialogConfirmacion]=useState(false);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [tipoArchivo, setTipoArchivo] = useState("");
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {     
      
    }, [newImage])
    

    const SaveImagen = () => {
        const formData = new FormData();
        formData.append("IMAGEN", newImage, nombreArchivo);
        formData.append("CHUSER", user.id);


        AuthService.SaveImagen(formData).then((res) => {
            Toast.fire({
                icon: "success",
                title: "Imagen Actualizada",
              });
            //console.log(res.RESPONSE);
            let data = {
                NUMOPERACION: 1,
                ID: user.id,
              };
            AuthService.adminUser(data).then((res2) => {
                const us: UserInfo = res2;
                  setUser(us.RESPONSE);
                  setRoles(us.RESPONSE.ROLES);
                  setPermisos(us.RESPONSE.PERMISOS);
                  setMenus(us.RESPONSE.MENUS);
                  setPerfiles(us.RESPONSE.PERFILES);
                  setDepartamento(us.RESPONSE.DEPARTAMENTOS);
                setUser(JSON.parse(String(getUser())));
                  
              });
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
                        <Typography>Nombre del archivo: {nombreArchivo}</Typography>
                        
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setDisabledButton(true);setNombreArchivo("");setOpenDialogConfirmacion(false);setTipoArchivo("");handleClose();}} color="error">Cancelar</Button>

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
                    <Button onClick={()=> {setOpenDialogConfirmacion(false)}}>Cancelar</Button>
                    <Button onClick={()=>{SaveImagen();setDisabledButton(true);setNombreArchivo("");setOpenDialogConfirmacion(false);setTipoArchivo("");}} color="success">Aceptar</Button>
                </DialogActions>
            </Dialog>


        </Dialog>
    );
};