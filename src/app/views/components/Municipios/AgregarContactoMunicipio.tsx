import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import validator from 'validator';
import { Alert } from "../../../helpers/Alert";
import { CatalogosServices } from "../../../services/catalogosServices";
import { Toast } from "../../../helpers/Toast";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";



const AgregarContactoMunicipio = () => {

    const user: RESPONSE = JSON.parse(String(getUser()));

    const [uploadFile, setUploadFile] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [tipoArchivo, setTipoArchivo] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const [disabledButton, setDisabledButton] = useState(true);

    const [municipio, setMunicipio] = useState("")
    const [tesorero, setTesorero] = useState("")
    const [responsable, setResponable] = useState("")
    const [domicilio, setDomicilio] = useState("")
    const [telefono, setTelefono] = useState("")
    const [horario, setHorario] = useState("")
    const [web, setWeb] = useState("")


    const [verificaForm, setVerificaFrom] = useState(false);
    const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);

    const formData = new FormData();
   

    useEffect(() => {
        console.log(telefono.length);
    }, [telefono])


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

    const handleTotal = (v: string) => {
        if ((validator.isNumeric(v) || v === "")) {
            setTelefono(v)
        }
    };

    const onClickGuardar = () => {

        if (municipio === "" || tesorero === "" || responsable === "" || domicilio === "" || telefono === "" || horario === "" || web === "" || nombreArchivo === "") {

            setVerificaFrom(true)
            Alert.fire({
                title: "Error!",
                text: "Favor de Completar los Campos y seleccionar una imagen",
                icon: "error",
            });
        } else {
            setOpenDialogConfirmacion(true)
        }
    };

    const guardarRegistro = () => {
        console.log("se guardo");

    }


    const handleSend = () => {
        formData.append("NUMOPERACION", "1");
        formData.append("CHUSER", user.id);
        formData.append("IDMUNICIPIO", "6bcf4613-3f7f-11ed-af5a-040300000000");
        formData.append("MUNICIPIO", municipio);
        formData.append("TESORERO", tesorero);
        formData.append("RESPONSABLE", responsable);
        formData.append("DOMICILIO", domicilio);
        formData.append("HORARIO", horario);
        formData.append("WEB", web);
        formData.append("ESCUDO", newImage, nombreArchivo);

        agregar(formData);
    };

    const agregar = (data: any) => {
        CatalogosServices.municipioInformacion(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Agregado!",
            });
    
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      };

    const limpiar = () => {
        setMunicipio("")
        setTesorero("")
        setResponable("")
        setDomicilio("")
        setTelefono("")
        setHorario("")
        setWeb("")
        setVerificaFrom(false)
    }

    return (
        //Box padre
        <Box sx={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            {/* Box delimitador con border */}
            <Box sx={{ display: "flex", width: "40%", height: "90%", border: "1px solid  black", borderRadius: "5%", justifyContent: "center", alignItems: "center" }}>
                {/* Box de contenido */}
                <Box sx={{ display: "flex", width: "90%", height: "90%", backgroundColor: "white", flexDirection: "column", alignItems: "center" }}>
                    {/* Box de imagen */}
                    <Box sx={{ width: "25%", height: "25%", border: "5px dashed  black", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <input
                            id="imagencargada"
                            accept="image/*"
                            onChange={(v) => { enCambioFile(v) }}
                            type="file"
                            style={{ zIndex: 2, opacity: 0, width: "10%", height: "15%", cursor: "pointer", position: "absolute" }}
                        /
                        >
                        {disabledButton ?
                            <AddPhotoAlternateIcon sx={{ width: "80%", height: "80%" }} /> :
                            <img src={uploadFile} style={{ objectFit: "scale-down", width: "80%", height: "80%" }} />
                        }
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", width: "98%", flexDirection: "column", justifyContent: "space-evenly", height: "75%" }}>

                        <TextField
                            required
                            // margin="dense"
                            label="municipio"
                            value={municipio}
                            type="text"
                            sx={{ width: "90%", }}
                            variant="outlined"
                            onChange={(v) => setMunicipio(v.target.value)}
                            error={municipio === "" && verificaForm}
                            helperText={(municipio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                        />
                        <TextField
                            required
                            // margin="dense"
                            label="tesorero"
                            value={tesorero}
                            type="text"
                            sx={{ width: "90%", }}
                            variant="outlined"
                            onChange={(v) => setTesorero(v.target.value)}
                            error={tesorero === "" && verificaForm}
                            helperText={(tesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                        />


                        <TextField
                            required
                            // margin="dense"
                            label="responsable"
                            value={responsable}
                            type="text"
                            sx={{ width: "90%", }}
                            variant="outlined"
                            onChange={(v) => setResponable(v.target.value)}
                            error={responsable === "" && verificaForm}
                            helperText={(responsable === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                        />
                        <TextField
                            required
                            // margin="dense"
                            label="domicilio"
                            value={domicilio}
                            type="text"
                            sx={{ width: "90%", }}
                            variant="outlined"
                            onChange={(v) => setDomicilio(v.target.value)}
                            error={domicilio === "" && verificaForm}
                            helperText={(domicilio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                        />


                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
                            <TextField
                                required
                                // margin="dense"
                                label="telefono"
                                value={telefono}
                                inputProps={{
                                    maxLength: 12
                                }}
                                type="text"
                                sx={{ width: "45%", }}
                                variant="outlined"
                                onChange={(v) => handleTotal(v.target.value)}
                                error={telefono === "" && verificaForm}
                                helperText={(telefono === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                            />
                            <TextField
                                required
                                // margin="dense"
                                label="horario"
                                value={horario}
                                type="text"
                                sx={{ width: "45%", }}
                                variant="outlined"
                                onChange={(v) => setHorario(v.target.value)}
                                error={horario === "" && verificaForm}
                                helperText={(horario === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                            />
                        </Box>

                        <TextField
                            required
                            // margin="dense"
                            label="Sitio Web"
                            value={web}
                            type="text"
                            sx={{ width: "90%", }}
                            variant="outlined"
                            onChange={(v) => setWeb(v.target.value)}
                            error={web === "" && verificaForm}
                            helperText={(web === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                        />




                        <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                            <Button variant="outlined" onClick={() => { limpiar() }}>Limpiar</Button>
                            <Button variant="outlined" onClick={() => { onClickGuardar() }}>Guardar</Button>
                        </Box>


                    </Box>

                </Box>
            </Box>


            <Dialog
                open={openDialogConfirmacion}
                onClose={() => setOpenDialogConfirmacion(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agregar Contacto de Municipio"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿ Desea guardar la información de {municipio} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDialogConfirmacion(false) }}>Cancelar</Button>
                    <Button onClick={() => { setOpenDialogConfirmacion(false); limpiar(); guardarRegistro(); handleSend(); }} color="success">Aceptar</Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}
export default AgregarContactoMunicipio;