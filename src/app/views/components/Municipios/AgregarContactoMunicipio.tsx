import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import validator from 'validator';
import { AlertS } from "../../../helpers/AlertS";
import { CatalogosServices } from "../../../services/catalogosServices";
import { Toast } from "../../../helpers/Toast";
import { getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import Divider from '@mui/material/Divider';


const AgregarContactoMunicipio = () => {

    const user: RESPONSE = JSON.parse(String(getUser()));

    const [uploadFile, setUploadFile] = useState("");
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const [municipio, setMunicipio] = useState("")
    const [tesorero, setTesorero] = useState("")
    const [responsable, setResponable] = useState("")
    const [domicilio, setDomicilio] = useState("")
    const [telMun, setTelMun] = useState("")
    const [rfc, setRfc] = useState("")
    const [mailMun, setMailMun] = useState("")
    const [telTesorero, setTelTesorero] = useState("")
    const [extTelTesorero, setExtTelTesorero] = useState("")
    const [celTesorero, setCelTesorero] = useState("")
    const [mailTesorero, setMailTesorero] = useState("")
    const [enlace, setEnlace] = useState("")
    const [celEnlace, setCelEnlace] = useState("")
    const [mailEnlace, setMailEnlace] = useState("")
    const [horario, setHorario] = useState("")
    const [web, setWeb] = useState("")
    const [verificaForm, setVerificaFrom] = useState(false);
    const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
    const [editar, setEditar] = useState(false)
    const [nuevoRegistro, setNuevoRegistro] = useState(true)
    const [actualizarDatos, setActualizaaDatos] = useState(true)
    const formData = new FormData();
    const [dato, setDato] = useState<IDatoMunicipio>(
        {
            id: "",
            idMunicipio: "",
            Municipio: "",
            NombreArchivo: "",
            Escudo: "",
            Domicilio: "",
            Rfc: "",
            Telefono: "",
            Horario: "",
            CorreoMunicipio: "",
            Web: "",
            Tesorero: "",
            TelefonoTesorero: "",
            CelularTesorero: "",
            CorreoTesorero: "",
            Enlace: "",
            CelularEnlace: "",
            CorreoEnlace: "",
            ExtTelefonoTesorero: ""


        }
    )


    useEffect(() => {
        consulta()
    }, [, actualizarDatos])

    useEffect(() => {

        setUploadFile(dato.Escudo)
        setMunicipio(dato.Municipio)
        setTesorero(dato.Tesorero)
        setResponable(dato.Enlace)
        setDomicilio(dato.Domicilio)
        setTelMun(dato.Telefono)
        setHorario(dato.Horario)
        setWeb(dato.Web)
        setTelMun(dato.Telefono);
        setRfc(dato.Rfc);
        setMailMun(dato.CorreoMunicipio);
        setTelTesorero(dato.TelefonoTesorero);
        setCelTesorero(dato.CelularTesorero);
        setMailTesorero(dato.CorreoTesorero);
        setEnlace(dato.Enlace);
        setCelEnlace(dato.CelularEnlace);
        setMailEnlace(dato.CorreoEnlace);
        setExtTelTesorero(dato.ExtTelefonoTesorero);


    }, [dato, editar])


    const consulta = () => {
        formData.append("NUMOPERACION", "4");
        formData.append("IDMUNICIPIO", user?.MUNICIPIO[0]?.id);
        obtenerLista(formData);
    }
    const obtenerLista = (data: any) => {
        CatalogosServices.municipioInformacion(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Lista Obtenida!",
                });

                if (res.RESPONSE.length !== 0) {
                    setDato(res.RESPONSE)
                    setNuevoRegistro(false)

                } else {
                    setNuevoRegistro(true)
                }
            } else {
                setNuevoRegistro(true)

            }
        });
    };

    function enCambioFile(event: any) {
        setUploadFile(URL.createObjectURL(event.target.files[0]));
        setNombreArchivo(event.target.value.split("\\")[2]);
        let file = event.target!.files[0]!;
        setNewImage(file);
    }

    const handleTotal = (v: string) => {
        if ((validator.isNumeric(v) || v === "")) {
            setTelMun(v)
        }
    };

    const onClickGuardar = () => {

        if (municipio === "" || tesorero === "" || responsable === "" || domicilio === "" || telMun === "" || horario === "" || web === "" || nombreArchivo === ""
        ||rfc=== ""
        ||mailMun=== ""
        ||telTesorero=== ""
        ||celTesorero=== ""
        ||mailTesorero=== ""
        ||enlace=== ""
        ||celEnlace=== ""
        ||mailEnlace=== ""
        ||extTelTesorero=== "") {

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

        if (municipio === "" || tesorero === "" || responsable === "" || domicilio === "" || telMun === "" || horario === "" || web === ""
        ||rfc=== ""
        ||mailMun=== ""
        ||telTesorero=== ""
        ||celTesorero=== ""
        ||mailTesorero=== ""
        ||enlace=== ""
        ||celEnlace=== ""
        ||mailEnlace=== ""
        ||extTelTesorero=== ""
        
        ) {

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

        if (nuevoRegistro) { formData.append("NUMOPERACION", "1") } else { formData.append("NUMOPERACION", "2") }
        formData.append("CHID", dato.id)
        formData.append("CHUSER", user.id);
        formData.append("IDMUNICIPIO", user.MUNICIPIO[0].id);
        formData.append("MUNICIPIO", municipio);
        formData.append("TESORERO", tesorero);
        formData.append("RESPONSABLE", responsable);
        formData.append("DOMICILIO", domicilio);
        formData.append("TELEFONO", telMun)
        formData.append("HORARIO", horario);
        formData.append("WEB", web);
        formData.append("RFC", rfc);
        formData.append("CORREOMUNICIPIO", mailMun);
        formData.append("TELEFONOTESORERO", telTesorero);
        formData.append("CELULARTESORERO", celTesorero);
        formData.append("CORREOTESORERO", mailTesorero);
        formData.append("ENLACE", enlace);
        formData.append("CELULARENLACE", celEnlace);
        formData.append("CORREOENLACE", mailEnlace);
        formData.append("EXTTELEFONOTESORERO", extTelTesorero);
        if (nombreArchivo !== "") { formData.append("ESCUDO", newImage, nombreArchivo); } else { formData.append("ESCUDO", ""); }
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
        setTelMun("")
        setHorario("")
        setUploadFile("")
        setVerificaFrom(false)
        setWeb("")
        setRfc("")
        setMailMun("")
        setTelTesorero("")
        setCelTesorero("")
        setMailTesorero("")
        setEnlace("")
        setCelEnlace("")
        setMailEnlace("")
        setExtTelTesorero("")
    }

    return (
        //Box padre
        <>

            {editar ?

                <>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={12}  >

                            <input
                                id="imagencargada"
                                accept="image/*"
                                onChange={(v) => { enCambioFile(v) }}
                                type="file"
                                style={{ zIndex: 2, opacity: 0, cursor: "pointer", position: "absolute", }}
                            />
                            {uploadFile === "" ?
                                <AddPhotoAlternateIcon sx={{ width: "35%", height: "35%", }} /> :
                                <img src={uploadFile} style={{ objectFit: "scale-down", }} />
                            }
                            
                        </Grid>
                    </Grid>

                    <Grid container direction="column" justifyContent="center" alignItems="center" padding={3}  sx={{ bgcolor:"#CCCCCC" }} >
                        <Box boxShadow={3} sx={{ bgcolor:"white", borderRadius: "20px" }}  > 
                        
                        <Grid container  sx={{  bgcolor:"white", padding: "2%", width: "100%" }}>
                            <Grid container justifyContent="center" alignItems="center" sx={{  paddingTop: "1.5%", }} >
                                <Grid item xs={12} sm={12} md={11} lg={11} >
                                    <TextField
                                        required
                                        multiline
                                        label="municipio"
                                        value={municipio}
                                        type="text"
                                        size="small"
                                        fullWidth
                                        sx={{ paddingBottom: "2%",}}
                                        variant="outlined"
                                        onChange={(v) => setMunicipio(v.target.value)}
                                        error={municipio === "" && verificaForm}
                                        helperText={(municipio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                    />
                                    <TextField
                                        required
                                        multiline
                                        label="domicilio"
                                        value={domicilio}
                                        type="text"
                                        size="small"
                                        fullWidth
                                        sx={{ paddingBottom: "2%" }}
                                        variant="outlined"
                                        onChange={(v) => setDomicilio(v.target.value)}
                                        error={domicilio === "" && verificaForm}
                                        helperText={(domicilio === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                    />
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="center" alignItems="center" >
                                <Grid item xs={12} sm={12} md={11} lg={11} sx={{ paddingBottom:"2%"}}>
                                    <Grid container justifyContent="space-between" alignItems="center"  >
                                        <Grid item xs={12} sm={6} md={4} lg={4} >
                                            <TextField
                                                required
                                                multiline
                                                label="RFC"
                                                value={rfc}
                                                inputProps={{ maxLength: 12 }}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{paddingBottom: "2%" }}
                                                variant="outlined"
                                                onChange={(v) => setRfc(v.target.value)}
                                                error={rfc === "" && verificaForm}
                                                helperText={(rfc === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4}  >
                                            <TextField
                                                required
                                                multiline
                                                // margin="dense"
                                                label="telefono"
                                                value={telMun}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{ paddingBottom: "2%" }}
                                                onChange={(v) => setTelMun(v.target.value)}
                                                error={telMun === "" && verificaForm}
                                                helperText={(telMun === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" >
                                <Grid item xs={12} sm={12} md={11} lg={11} sx={{ paddingBottom:"2%"}} >
                                    <Grid container justifyContent="space-between" alignItems="center" >
                                        <Grid item xs={12} sm={6} md={4} lg={4}  >
                                            <TextField
                                                required
                                                multiline
                                                label="Correo Municipio"
                                                value={mailMun}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{ paddingBottom: "2%" }}
                                                variant="outlined"
                                                onChange={(v) => setMailMun(v.target.value)}
                                                error={mailMun === "" && verificaForm}
                                                helperText={(mailMun === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} >
                                            <TextField
                                                required
                                                multiline
                                                // margin="dense"
                                                label="Pagina Web"
                                                value={web}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{ paddingBottom: "2%" }}
                                                onChange={(v) => setWeb(v.target.value)}
                                                error={web === "" && verificaForm}
                                                helperText={(web === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="left"   alignItems="center" >
                                <Grid item xs={12} sm={.5} md={.5} lg={.5} ></Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4} >

                                    <TextField
                                        required
                                        multiline
                                        // margin="dense"
                                        label="Horario"
                                        value={horario}
                                        type="text"
                                        size="small"
                                        fullWidth
                                        sx={{ paddingBottom: "2%" }}
                                        variant="outlined"
                                        onChange={(v) => setHorario(v.target.value)}
                                        error={horario === "" && verificaForm}
                                        helperText={(horario === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ padding: "2%", width: "100%", bgcolor:"white" }}>
                            <Grid container justifyContent="space-evenly"
                                alignItems="center"  >
                                {/* ////////////// */}
                                <Grid item xs={12} sm={12} md={11} lg={11}  >
                                    <TextField
                                        required
                                        multiline
                                        label="Tesorero"
                                        value={tesorero}
                                        type="text"
                                        size="small"
                                        fullWidth
                                        sx={{ paddingBottom: "2%" }}
                                        variant="outlined"
                                        onChange={(v) => setTesorero(v.target.value)}
                                        error={tesorero === "" && verificaForm}
                                        helperText={(tesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-evenly" alignItems="center" >
                                <Grid item xs={12} sm={12} md={11} lg={11} >
                                    <Grid container justifyContent="space-between" alignItems="center"  >
                                        <Grid item xs={12} sm={6} md={4} lg={4} >
                                            <Grid container justifyContent="space-between" alignItems="center"  >
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <TextField
                                                        required
                                                        multiline
                                                        label="Telefono Tesorero"
                                                        value={telTesorero}
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        sx={{ paddingBottom: "2%" }}
                                                        variant="outlined"
                                                        onChange={(v) => setTelTesorero(v.target.value)}
                                                        error={telTesorero === "" && verificaForm}
                                                        helperText={(telTesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={2} md={2} lg={2}  ></Grid>
                                                <Grid item xs={12} sm={4} md={4} lg={4}  >
                                                    <TextField
                                                        required
                                                        multiline
                                                        label="Ext "
                                                        value={extTelTesorero}
                                                        inputProps={{ maxLength: 5 }}
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        sx={{ paddingBottom: "2%" }}
                                                        variant="outlined"
                                                        onChange={(v) => setExtTelTesorero(v.target.value)}
                                                        error={extTelTesorero === "" && verificaForm}
                                                        helperText={(extTelTesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container justifyContent="space-between" alignItems="center"  xs={12} sm={6} md={4} lg={4} >
                                        <Grid item xs={12} sm={2} md={2} lg={2}  ></Grid>
                                        <Grid item xs={12} sm={10} md={10} lg={10}  >
                                            <TextField
                                                required
                                                // margin="dense"
                                                label="Celular Tesorero"
                                                value={celTesorero}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{ paddingBottom: "2%" }} variant="outlined"
                                                onChange={(v) => setCelTesorero(v.target.value)}
                                                error={celTesorero === "" && verificaForm}
                                                helperText={(celTesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />
                                        </Grid>
                                        </Grid>
                                        <Grid container justifyContent="space-between" alignItems="center"  xs={12} sm={6} md={4} lg={4} >
                                        <Grid item xs={12} sm={2} md={2} lg={2}  ></Grid>
                                        <Grid item xs={12} sm={10} md={10} lg={10}  >
                                            <TextField
                                                required
                                                multiline
                                                // margin="dense"
                                                label="Correro Tesorero"
                                                value={mailTesorero}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{ paddingBottom: "2%" }}
                                                variant="outlined"
                                                onChange={(v) => setMailTesorero(v.target.value)}
                                                error={mailTesorero === "" && verificaForm}
                                                helperText={(mailTesorero === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}
                                            />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center" sx={{ bgcolor:"white", padding: "2%", width: "100%"}}>

                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item xs={12} sm={12} md={11} lg={11}   sx={{ paddingBottom:"2%"}}>
                                    <TextField
                                        required
                                        multiline
                                        label="Enlace"
                                        value={enlace}
                                        type="text"
                                        size="small"
                                        fullWidth
                                        sx={{ paddingBottom: "2%" }}
                                        variant="outlined"
                                        onChange={(v) => setEnlace(v.target.value)}
                                        error={enlace === "" && verificaForm}
                                        helperText={(enlace === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" >
                                <Grid item xs={12} sm={12} md={11} lg={11} >
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item xs={12} sm={6} md={4} lg={4} >

                                            <TextField
                                                required
                                                multiline
                                                label="Celular Enlace"
                                                value={celEnlace}
                                                inputProps={{ maxLength: 12 }}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{  paddingBottom: "2%" }}
                                                variant="outlined"
                                                onChange={(v) => setCelEnlace(v.target.value)}
                                                error={celEnlace === "" && verificaForm}
                                                helperText={(celEnlace === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={4} >
                                            <TextField
                                                required
                                                multiline
                                                // margin="dense"
                                                label="Correo Enlace"
                                                value={mailEnlace}
                                                type="text"
                                                size="small"
                                                fullWidth
                                                sx={{  paddingBottom: "2%" }}
                                                variant="outlined"
                                                onChange={(v) => setMailEnlace(v.target.value)}
                                                error={mailEnlace === "" && verificaForm}
                                                helperText={(mailEnlace === "" && verificaForm) ? "No se pueden enviar campos vacios" : null}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}  >
                                        <Box  display="flex" flexDirection="row-reverse">
                                            <Box display="flex" flexDirection="row" >
                                            <Box paddingRight={2}>
                                            <Button variant="outlined" onClick={() => { limpiar() }}>Limpiar</Button>
                                            </Box>
                                            <Box  paddingRight={2}>
                                            {nuevoRegistro ?
                                                <Button variant="outlined" onClick={() => { onClickGuardar() }}>Guardar</Button> :
                                                <Button variant="outlined" onClick={() => { onClickActualizar() }}>Guardar Cambios</Button>}
                                            </Box>
                                            <Box>
                                            <Button variant="outlined" onClick={() => { limpiar(); setEditar(false); }}>Cancelar</Button>
                                            </Box>
                                            </Box>
                                        </Box>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        </Box>
                    </Grid>
                 
                       
                       
                    
                </>
                :
                <Grid container direction="column" justifyContent="center" alignItems="center"  sx={{ bgcolor:"#CCCCCC", paddingBottom:"5%"}}   >


                    <Grid container direction="column" justifyContent="center" alignItems="center"  >
                        
                        <Grid item xs={12} direction="row" justifyContent="center" alignItems="center" sx={{ width: "9%", height: "9%", padding:"1%"}}>
                        <Box boxShadow={3} padding={1}  sx={{ bgcolor:"white", }} >
                            {nuevoRegistro ? <AddPhotoAlternateIcon sx={{ width: "0%", height: "50%",  }} />
                                :
                                <img src={dato.Escudo} style={{ alignItems: "center", objectFit: "scale-down", width: "100%", height: "100%", borderRadius:"0"}} />}
                        </Box>
                        </Grid>
                        
                    </Grid>
                    
                    <Grid container direction="row" justifyContent="center" alignItems="center" >

                        <Grid item xs={12} md={10}  sx={{ boder: "2px solid  #CCCCCC", borderRadius: "20px", bgcolor:"white", paddingTop:"1%", paddingBottom:"1%"}}>
                        
                            
                            <Grid xs={12} md={12}  container paddingTop={1}>
                                <Grid item xs={12} md={2}  textAlign="right" > <label className="TypographyH6Gray"> Municipio: </label> </Grid>
                                <Grid item xs={12} md={4}  textAlign="left" > <label className="TypographyH6Black"> {dato.Municipio === "" ? "Sin informaci??n" : dato.Municipio}</label> </Grid>
                                <Grid item xs={12} md={2} textAlign="right" > <label className="TypographyH6Gray"> Domicilio: </label> </Grid>
                                <Grid item xs={12} md={4}  textAlign="left" > <label className="TypographyH6Black"> {dato.Domicilio === "" ? "Sin informaci??n" : dato.Domicilio}</label> </Grid>
                            </Grid>
                         
                            <Grid  xs={12} md={12} container paddingTop={1}>

                                <Grid item xs={12} md={2}  textAlign="right" > <label className="TypographyH6Gray"> RFC: </label> </Grid>
                                <Grid item xs={12} md={4}  textAlign="left" > <label className="TypographyH6Black"> {dato.Rfc === null ? "Sin informaci??n" : dato.Rfc}</label> </Grid>
                                <Grid item xs={12} md={2} textAlign="right" > <label className="TypographyH6Gray"> Telefono: </label> </Grid>
                                <Grid item xs={12} md={4}  textAlign="left" > <label className="TypographyH6Black"> {dato.Telefono === "" ? "Sin informaci??n" : dato.Telefono}</label> </Grid>
    
                            </Grid>

                            <Grid xs={12} md={12} container paddingTop={1} >

                                <Grid item xs={12} md={2}  textAlign="right" > <label className="TypographyH6Gray"> Correo Municipio: </label> </Grid>
                                <Grid item xs={12} md={4}  textAlign="left" > <label className="TypographyH6Black"> {dato.CorreoMunicipio === "" ? "Sin informaci??n" : dato.CorreoMunicipio}</label> </Grid>
                                <Grid item xs={12} md={2}  textAlign="right" > <label className="TypographyH6Gray"> Pagina Web: </label>  </Grid>
                                <Grid item xs={12} md={4} textAlign="left" > <label className="TypographyH6Black"> {dato.Web === "" ? "Sin informaci??n" : dato.Web}</label>  </Grid>

                            </Grid>

                            <Divider variant="middle" sx={{ padding:"1.3%" }} />

                            <Grid  xs={12} md={12} container paddingTop={3}>
                                <Grid item xs={12} md={6}textAlign="right" > <label className="TypographyH6Gray"> Tesorero: </label> </Grid>
                                <Grid item xs={12} md={6}textAlign="left" > <label className="TypographyH6Black"> {dato.Tesorero === "" ? "Sin informaci??n" : dato.Tesorero}</label> </Grid>  
                            </Grid>
                            
                            <Grid  xs={12} md={12} container paddingTop={1}>

                                <Grid item xs={12} md={2} textAlign="right" > <label className="TypographyH6Gray"> Telefono Tesorero:  </label>  </Grid>
                                <Grid item xs={12} md={2} textAlign="left" >  <label className="TypographyH6Black"> {dato.TelefonoTesorero === "" ? "Sin informaci??n" : dato.TelefonoTesorero}</label> </Grid>
                                <Grid item xs={12} md={2} textAlign="right" > <label className="TypographyH6Gray"> Ext  Telefono Tesorero:  </label> </Grid>
                                <Grid item xs={12} md={2}textAlign="left" > <label className="TypographyH6Black"> {dato.ExtTelefonoTesorero === "" ? "Sin informaci??n" : dato.ExtTelefonoTesorero}</label> </Grid>
                                <Grid item xs={12} md={2} textAlign="right" > <label className="TypographyH6Gray"> Celular Tesorero: </label> </Grid>
                                <Grid item xs={12} md={2} textAlign="left" > <label className="TypographyH6Black"> {dato.CelularTesorero === "" ? "Sin informaci??n" : dato.CelularTesorero}</label> </Grid>

                            </Grid>

                            <Divider variant="middle" sx={{ padding:"1.3%" }} />

                            <Grid xs={12} md={12} container paddingTop={3}>
                                <Grid item xs={6} textAlign="right" > <label className="TypographyH6Gray"> Enlace: </label> </Grid>
                                <Grid item xs={6} textAlign="left" > <label className="TypographyH6Black"> {dato.Enlace === "" ? "Sin informaci??n" : dato.Enlace}</label>  </Grid>
                            </Grid>

                            <Grid xs={12} md={12} container paddingTop={1}>
                                <Grid item xs={2} textAlign="right" >  <label className="TypographyH6Gray"> Celular Enlace: </label> </Grid>
                                <Grid item xs={2} textAlign="left" > <label className="TypographyH6Black"> {dato.CelularEnlace === "" ? "Sin informaci??n" : dato.CelularEnlace}</label> </Grid>
                                <Grid item xs={2} textAlign="right" >  <label className="TypographyH6Gray"> Correo Enlace:  </label> </Grid>
                                <Grid item xs={2} textAlign="left" > <label className="TypographyH6Black"> {dato.CorreoEnlace === "" ? "Sin informaci??n" : dato.CorreoEnlace}</label> </Grid>
                                <Grid item xs={2} textAlign="right" > <label className="TypographyH6Gray"> Horario:  </label> </Grid>
                                <Grid item xs={2} textAlign="left" > <label className="TypographyH6Black"> {dato.Horario === "" ? "Sin informaci??n" : dato.Horario}</label>  </Grid>
                            </Grid>

                        <Grid xs={12} md={12} container paddingTop={5} >     
                        <Grid xs={12} md={10} > </Grid>    
                        <Grid xs={12} md={2} > 
                        <Box sx={{ display: "flex", width: "50%", justifyContent: "space-evenly" }}>
                        {nuevoRegistro ? <Button variant="outlined" onClick={() => { setEditar(true) }}>Registrar</Button> : <Button variant="outlined" onClick={() => { setEditar(true) }}>Editar</Button>}
                        </Box>
                        </Grid>               
                        </Grid>  
                        
                        </Grid>

                    </Grid>
                
                </Grid>}


                           
            <Dialog
                open={openDialogConfirmacion}
                onClose={() => setOpenDialogConfirmacion(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agregar Contacto de Municipio"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ?? Desea guardar la informaci??n de {municipio} ?
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
                   
        </>
    )
}
export default AgregarContactoMunicipio;

export interface IDatoMunicipio {
    id: string;
    idMunicipio: string;
    Municipio: string;
    NombreArchivo: string;
    Escudo: string;
    Domicilio: string;
    Rfc: string;
    Telefono: string;
    CorreoMunicipio: string;
    Web: string;
    Tesorero: string;
    TelefonoTesorero: string;
    CelularTesorero: string;
    CorreoTesorero: string;
    Enlace: string;
    CelularEnlace: string;
    CorreoEnlace: string;
    Horario: string;
    ExtTelefonoTesorero: string;


}

