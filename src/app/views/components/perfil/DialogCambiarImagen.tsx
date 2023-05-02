import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, Grid } from "@mui/material"
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AuthService } from "../../../services/AuthService";
import { RESPONSE, UserInfo } from "../../../interfaces/user/UserInfo";
import { getToken, getUser, setUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import Swal from "sweetalert2";
export function DialogCambiarImagen({
    open,
    handleClose,
    imgData,
    imgTipo
}: {
    open: boolean;
    handleClose: Function;
    imgData: string;
    imgTipo: string;
}) {
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [uploadFile, setUploadFile] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [tipoArchivo, setTipoArchivo] = useState("");
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {

    }, [newImage])


    const SaveImagen = () => {
        const formData = new FormData();

        formData.append("TIPO", "/FOTOPERFIL/");
        formData.append("IMAGEN", newImage, nombreArchivo);
        formData.append("CHUSER", user.id);
        formData.append("TOKEN", JSON.parse(String(getToken())));


        AuthService.SaveImagen(formData).then((res) => {

            if (res.SUCCESS) {

                Toast.fire({
                    icon: "success",
                    title: "Imagen Actualizada",
                });
                let data = {
                    NUMOPERACION: 1,
                    ID: user.id,
                };
                AuthService.adminUser(data).then((res2) => {
                    const us: UserInfo = res2;
                    setUser(us.RESPONSE);
                });
                handleClose();

            }

        });

        handleClose();

    };
    function enCambioFile(event: any) {
        if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "image") {
            setUploadFile(URL.createObjectURL(event?.target?.files[0]));
            setNombreArchivo(event?.target?.value?.split("\\")[2]);
            let file = event?.target!?.files[0]!;
            setTipoArchivo((event?.target?.value?.split(".")[1]))
            setNewImage(file);
            {
                nombreArchivo === null
                    ? setDisabledButton(true)
                    : setDisabledButton(false);
            }
        }
        else {

            Swal.fire("¡No es una imagen!", "", "warning");
        }

    }


    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}

        >
            {/* <profilePhoto/> */}
            <DialogTitle >
                Cambiar Imagen
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                <Grid sx={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="CargaDeArchivosCuenta">
                        <input
                            id="imagencargada"
                            accept="image/*"
                            onChange={(v) => { enCambioFile(v) }}
                            type="file"
                            style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }} />
                        {disabledButton ?
                            user.RutaFoto === "undefined" ? <AddPhotoAlternateIcon sx={{ width: "90%", height: "90%" }} />
                                :
                                <>
                                    {/* <ProfilePhoto/> */}

                                    {
                                        imgTipo !== "undefined" && imgData !== "undefined" ?
                                            <img style={{ objectFit: "scale-down", width: "100%", height: "100%", }}
                                                //   {imgTipo}
                                                src={"data:" + imgTipo + ";base64," + imgData} />
                                            :
                                            // ""
                                            <AddPhotoAlternateIcon sx={{ width: "90%", height: "90%" }} />
                                    }


                                </>
                            :
                            <>
                                {/* {imgTipo !== "undefined" && imgData !== "undefined" ? */}
                                    <img src={uploadFile} style={{ objectFit: "scale-down", width: '100%', height: "100%", }} />
                            </>
                        }
                    </div>



                </Grid>
                <Box sx={{ width: "100%", height: "8vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "justify" }}>
                    {nombreArchivo === "" ?
                        <Typography sx={{ textAlign: "center" }}>Arrastre la nueva imagen o presione el icono para seleccionar archivo</Typography> :
                        <Typography>Nombre del archivo: {nombreArchivo}</Typography>

                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setDisabledButton(true); setNombreArchivo(""); setOpenDialogConfirmacion(false); setTipoArchivo(""); handleClose(); }} color="error">Cancelar</Button>

                <Button disabled={(disabledButton && !(tipoArchivo === "jpg" || tipoArchivo === "png" || tipoArchivo === "svg" || tipoArchivo === "jpeg") ? true : false) ? true : false} onClick={() => setOpenDialogConfirmacion(true)} color="success">Guardar cambios</Button>
            </DialogActions>


            <Dialog
                open={openDialogConfirmacion}
                onClose={() => setOpenDialogConfirmacion(false)}
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
                    <Button onClick={() => { setOpenDialogConfirmacion(false) }}>Cancelar</Button>
                    <Button onClick={() => { SaveImagen(); setDisabledButton(true); setNombreArchivo(""); setOpenDialogConfirmacion(false); setTipoArchivo(""); }} color="success">Aceptar</Button>
                </DialogActions>
            </Dialog>


        </Dialog>
    );
};

