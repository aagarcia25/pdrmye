import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import validator from 'validator';
import { AlertD, AlertS } from "../../../helpers/AlertS";
import { CatalogosServices } from "../../../services/catalogosServices";
import { Toast } from "../../../helpers/Toast";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";


const AgregarContactoMunicipio = () => {

    const user: RESPONSE = JSON.parse(String(getUser()));

    const [uploadFile, setUploadFile] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState("");
    // const [tipoArchivo, setTipoArchivo] = useState("");
    const [newImage, setNewImage] = useState(Object);

    const [municipio, setMunicipio] = useState("")
    const [tesorero, setTesorero] = useState("")
    const [responsable, setResponable] = useState("")
    const [domicilio, setDomicilio] = useState("")
    const [telefono, setTelefono] = useState("")
    const [horario, setHorario] = useState("")
    const [web, setWeb] = useState("")


    const [verificaForm, setVerificaFrom] = useState(false);
    const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
    const [dato, setDato] = useState<IDatoMunicipio>(
        {
            id:"",
            idMunicipio: "",
            Municipio: "",
            Tesorero: "",
            Responsable: "",
            Domicilio: "",
            Horario: "",
            Telefono: "",
            Web: "",
            Escudo: "",
        }
    )
    const [editar, setEditar] = useState(false)
    const [nuevoRegistro, setNuevoRegistro] = useState(true)
    const [actualizarDatos,setActualizaaDatos]= useState(true)

    const formData = new FormData();

    useEffect(() => {
        consulta()
    }, [,actualizarDatos])

    useEffect(() => {
       
        setUploadFile(dato.Escudo)
        setMunicipio(dato.Municipio)
        setTesorero(dato.Tesorero)
        setResponable(dato.Responsable)
        setDomicilio(dato.Domicilio)
        setTelefono(dato.Telefono)
        setHorario(dato.Horario)
        setWeb(dato.Web)
    }, [dato,editar])


    const consulta = () => {
        formData.append("NUMOPERACION", "4");
        formData.append("IDMUNICIPIO", user.MUNICIPIO[0].id);
        obtenerLista(formData);
    }
    // "6bcf4613-3f7f-11ed-af5a-040300000000"
    const obtenerLista = (data: any) => {
        CatalogosServices.municipioInformacion(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Lista Obtenida!",
                });

                if(res.RESPONSE.length!==0)
                {
                    setDato(res.RESPONSE)
                    setNuevoRegistro(false)
                    
                    
                }else{
                    setNuevoRegistro(true)
                }
            } else { 
                setNuevoRegistro(true)
                // AlertS.fire({
                //     title: "Error!",
                //     text: res.STRMESSAGE,
                //     icon: "error",
                // });
               

            }
        });
    };

    function enCambioFile(event: any) {
        setUploadFile(URL.createObjectURL(event.target.files[0]));
        setNombreArchivo(event.target.value.split("\\")[2]);
        let file = event.target!.files[0]!;
        // setTipoArchivo((event.target.value.split(".")[1]))
        setNewImage(file);
    }

    const handleTotal = (v: string) => {
        if ((validator.isNumeric(v) || v === "")) {
            setTelefono(v)
        }
    };

    const onClickGuardar = () => {

        if (municipio === "" || tesorero === "" || responsable === "" || domicilio === "" || telefono === "" || horario === "" || web === "" || nombreArchivo === "") {

            setVerificaFrom(true)
            AlertS.fire({
                title: "Error!",
                text: "Favor de Completar los Campos y seleccionar una imagen",
                icon: "error",
            });
        } else {
            setOpenDialogConfirmacion(true)
        }
    };

    const onClickActualizar = () => {

        if (municipio === "" || tesorero === "" || responsable === "" || domicilio === "" || telefono === "" || horario === "" || web === "" ) {

            setVerificaFrom(true)
            AlertS.fire({
                title: "Error!",
                text: "Favor de Completar los Campos",
                icon: "error",
            });
            
        } else {
            setOpenDialogConfirmacion(true)
        }
    };

    const guardarRegistro = () => {
        
        if(nuevoRegistro){formData.append("NUMOPERACION", "1")} else {formData.append("NUMOPERACION", "2")}
        formData.append("CHID",dato.id)
        formData.append("CHUSER", user.id);
        formData.append("IDMUNICIPIO", user.MUNICIPIO[0].id);
        formData.append("MUNICIPIO", municipio);
        formData.append("TESORERO", tesorero);
        formData.append("RESPONSABLE", responsable);
        formData.append("DOMICILIO", domicilio);
        formData.append("TELEFONO", telefono)
        formData.append("HORARIO", horario);
        formData.append("WEB", web);
        if(nombreArchivo!==""){formData.append("ESCUDO", newImage, nombreArchivo);}else{formData.append("ESCUDO", "");}
        //console.log(nuevoRegistro);
        
        agregar(formData);
    }
    
    const agregar = (data: any) => {
        CatalogosServices.municipioInformacion(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Registro Agregado!",
                });

                setActualizaaDatos(!actualizarDatos);
                limpiar();

            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });

        setEditar(false);
        
    };

    const limpiar = () => {
        setMunicipio("")
        setTesorero("")
        setResponable("")
        setDomicilio("")
        setTelefono("")
        setHorario("")
        setWeb("")
        setUploadFile("")
        setVerificaFrom(false)
    }

    return (
        //Box padre
        <Box sx={{ bgcolor:"#EEEEEE", display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Box  boxShadow={3}  sx={{  bgcolor:"white", display: "flex", width: "100%", height: "90%", justifyContent: "center", alignItems: "center" }}>
                {/* Box delimitador con border */}
                <Box sx={{ display: "flex", width: "80%", height: "90%", justifyContent: "center", alignItems: "center" }}>
                    {/* Box de contenido */}

                    {editar ?
                        <Box sx={{  display: "flex", width: "90%", height: "98%", backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                            {/* Box de imagen */}
                            <Box sx={{bgcolor:"#EEEEEE", width: "25%",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

                                <input
                                    id="imagencargada"
                                    accept="image/*"
                                    onChange={(v) => { enCambioFile(v) }}
                                    type="file"
                                    style={{ zIndex: 2, opacity: 0, cursor: "pointer", position: "absolute" }}
                                />
                                {uploadFile === "" ?
                                    <AddPhotoAlternateIcon sx={{ width: "60%", height: "60%" }} /> :
                                    <img src={uploadFile} style={{ objectFit: "fill", width: "100%", borderRadius: "0"}} />
                                }
                            </Box>

                            <Box sx={{ paddingTop:"5%",  display: "flex", alignItems: "center", width: "98%", flexDirection: "column", justifyContent: "space-evenly", height: "60%" }}>

                                <TextField
                                    required
                                    label="municipio"
                                    value={municipio}
                                    type="text"
                                    size= "small"
                                    sx={{ width: "70%", paddingBottom:".3%"}}
                                    variant="outlined"
                                    onChange={(v) => setMunicipio(v.target.value)}
                                    error={municipio === "" && verificaForm}
                                    helperText={(municipio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                />
                                <TextField
                                    required
                                    label="tesorero"
                                    value={tesorero}
                                    type="text"
                                    size= "small"
                                    sx={{ width: "70%", paddingBottom:".3%"}}
                                    variant="outlined"
                                    onChange={(v) => setTesorero(v.target.value)}
                                    error={tesorero === "" && verificaForm}
                                    helperText={(tesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                />

                                <TextField
                                    required
                                    label="responsable"
                                    value={responsable}
                                    type="text"
                                    size= "small"
                                    sx={{ width: "70%",paddingBottom:".3%" }}
                                    variant="outlined"
                                    onChange={(v) => setResponable(v.target.value)}
                                    error={responsable === "" && verificaForm}
                                    helperText={(responsable === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                />
                                <TextField
                                    required
                                    label="domicilio"
                                    value={domicilio}
                                    type="text"
                                    size= "small"
                                    sx={{ width: "70%", paddingBottom:".3%"}}
                                    variant="outlined"
                                    onChange={(v) => setDomicilio(v.target.value)}
                                    error={domicilio === "" && verificaForm}
                                    helperText={(domicilio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                />

                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
                                    <TextField
                                        required
                                        label="telefono"
                                        value={telefono}
                                        inputProps={{maxLength: 12}}
                                        type="text"
                                        size= "small"
                                        sx={{ width: "45%",paddingBottom:".3%"}}
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
                                        size= "small"
                                        sx={{ width: "45%",paddingBottom:".3%"}}
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
                                    size= "small"
                                    sx={{ width: "70%", paddingBottom:".3%"}}
                                    variant="outlined"
                                    onChange={(v) => setWeb(v.target.value)}
                                    error={web === "" && verificaForm}
                                    helperText={(web === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                />
                            </Box>

                            <Box sx={{ paddingTop:"4%", display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                                <Button variant="outlined" onClick={() => { limpiar() }}>Limpiar</Button>
                               { nuevoRegistro?
                                    <Button variant="outlined" onClick={() => { onClickGuardar()}}>Guardar</Button>:
                                    <Button variant="outlined" onClick={() => { onClickActualizar()}}>Guardar Cambios</Button> }
                                <Button variant="outlined" onClick={() => { limpiar(); setEditar(false); }}>Cancelar</Button>
                            </Box>

                        </Box>
                        :
                        <Box  sx={{ display: "flex", width: "90%", height: "100%", backgroundColor: "white", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            {/* Box de imagen */}

                            <Box  sx={{width: "20vh", height: "20vh", border: "2px solid  #CCCCCC", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                {nuevoRegistro?<AddPhotoAlternateIcon sx={{ width: "60%", height: "60%" }} /> :<img src={dato.Escudo} style={{ objectFit: "scale-down", width: "100%", height: "100%" }} />}
                            </Box>
                            <Box sx={{ height: "3%", }}></Box>

                            <Box boxShadow={3} sx={{paddingTop:"2%", bgcolor: "rgb(252,252,252)", paddingBottom:"2%", display: "flex", alignItems: "center", width: "90%", flexDirection: "column", justifyContent: "center", height: "auto" }}>
                                <Box sx={{ display: "flex", paddingBottom:"1%", justifyContent: "space-between", width: "100%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif", fontWeight: 'bold', fontSize: "1.3rem", color:"#808080", width: "35%", display: "flex", justifyContent: "flex-end", mr: "2rem" }}
                                    > Municipio: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Municipio === "" ? "Sin información" : dato.Municipio} </Typography>
                                </Box>

                                <Box sx={{ display: "flex", paddingBottom:"1%", justifyContent: "space-between", width: "100%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontWeight: 'bold', fontSize: "1.3rem", color:"#808080", width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Tesorero: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Tesorero === "" ? "Sin información" : dato.Tesorero} </Typography>
                                </Box>

                                <Box sx={{ display: "flex",paddingBottom:"1%",  justifyContent: "space-between", width: "100%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontWeight: 'bold', fontSize: "1.3rem", color:"#808080",width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Responsable: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Responsable === "" ? "Sin información" : dato.Responsable} </Typography>
                                </Box>

                                <Box sx={{ display: "flex",paddingBottom:"1%", justifyContent: "space-between", width: "100%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontWeight: 'bold', fontSize: "1.3rem", color:"#808080", width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Domicilio: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Domicilio === "" ? "Sin información" : dato.Domicilio} </Typography>
                                </Box>

                                <Box sx={{ display: "flex", paddingBottom:"1%", justifyContent: "space-between", width: "100%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontWeight: 'bold', fontSize: "1.3rem", color:"#808080",width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Web: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Web === "" ? "Sin información" : dato.Web} </Typography>
                                </Box>


                                <Box sx={{ display: "flex", paddingBottom:"1%", justifyContent: "space-between", width: "90%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",   fontWeight: 'bold', fontSize: "1.3rem", color:"#808080",width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Telefono: </Typography>
                                    <Typography sx={{ fontFamily:  "sans-serif", fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Telefono === "" ? "Sin informacion." : dato.Telefono} </Typography>
                                </Box>

                                <Box sx={{ display: "flex", paddingBottom:"1%", justifyContent: "space-between", width: "90%" }}>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontWeight: 'bold', fontSize: "1.3rem", color:"#808080", width: "35%", display: "flex", justifyContent: "flex-end", mr: "2vw" }}
                                    > Horario: </Typography>
                                    <Typography sx={{ fontFamily: "sans-serif",  fontSize: "1.5rem", width: "65%", display: "flex", justifyContent: "flex-start" }}
                                    > {dato.Horario === "" ? "Sin información." : dato.Horario} </Typography>
                                </Box>

                                <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                                {nuevoRegistro ? <Button variant="outlined" onClick={() => {setEditar(true) }}>Registrar</Button> : <Button variant="outlined" onClick={() => { setEditar(true) }}>Editar</Button>}
                            </Box>
                            </Box>
                        </Box>}

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
                        <Button sx={{}} onClick={() => { setOpenDialogConfirmacion(false) }}>Cancelar</Button>
                        <Button onClick={() => { 

                                setOpenDialogConfirmacion(false); 
                                guardarRegistro(); 

                            }} color="success">Aceptar</Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    )
}
export default AgregarContactoMunicipio;

export interface IDatoMunicipio {
    id:string;
    idMunicipio: string;
    Municipio: string;
    Tesorero: string;
    Responsable: string;
    Domicilio: string;
    Horario: string;
    Telefono: string;
    Web: string;
    Escudo: string;
  }

