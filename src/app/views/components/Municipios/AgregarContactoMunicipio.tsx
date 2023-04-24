import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AlertS } from "../../../helpers/AlertS";
import { CatalogosServices } from "../../../services/catalogosServices";
import { Toast } from "../../../helpers/Toast";
import { getToken, getUser } from "../../../services/localStorage";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import Divider from '@mui/material/Divider';
import Swal from "sweetalert2";
import { ValidaSesion } from "../../../services/UserServices";
import { VisaulizarImagen } from "../componentes/VisaulizarImagen";
import { TextFieldFormatoMoneda } from "../componentes/TextFieldFormatoMoneda";


const AgregarContactoMunicipio = () => {

    const user: RESPONSE = JSON.parse(String(getUser()));
    const [primerInicio, setPrimerInicio] = useState(true);

    const [uploadFile, setUploadFile] = useState("");
    const [escudo, setEscudo] = useState("");

    const [nombreArchivo, setNombreArchivo] = useState("");
    const [newImage, setNewImage] = useState(Object);
    const [id, setId] = useState("")

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
    const [openDialogConfirmacion, setOpenDialogConfirmacion] = useState(false);
    const [editar, setEditar] = useState(false)
    const [nuevoRegistro, setNuevoRegistro] = useState(true)
    const [actualizarDatos, setActualizaaDatos] = useState(true)
    const formData = new FormData();


    const consulta = () => {
        formData.append("NUMOPERACION", "4");
        formData.append("IDMUNICIPIO", user?.MUNICIPIO[0]?.id);

        CatalogosServices.municipioInformacion(formData).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Lista Obtenida!",
                });

                if (res.RESPONSE.length !== 0) {
                    console.log(res.RESPONSE);
                    if (primerInicio) {
                        setValores(res.RESPONSE);
                    }
                    setNuevoRegistro(false);

                } else {
                    setNuevoRegistro(true)
                }
            } else {

            }
        });
    }

    function enCambioFile(event: any) {
        if (event.target.files[0].type.split("/")[0] === "image") {
            setUploadFile(URL.createObjectURL(event.target.files[0]));
            setNombreArchivo(event.target.value.split("\\")[2]);
            let file = event.target!.files[0]!;
            setNewImage(file);
        } else {

            Swal.fire("¡No es una imagen!", "", "warning");
        }

    }

    const onClick = () => {

        setOpenDialogConfirmacion(true)
    };



    const guardarRegistro = () => {
        var TOKEN = String(getToken());
        formData.append("NUMOPERACION", nuevoRegistro ? "1" : "2");
        formData.append("CHID", id)
        formData.append("CHUSER", user.id);
        formData.append("IDMUNICIPIO", user.MUNICIPIO[0].id);
        formData.append("MUNICIPIO", municipio);
        formData.append("TESORERO", tesorero);
        formData.append("RESPONSABLE", responsable);
        formData.append("DOMICILIO", domicilio);
        formData.append("TELEFONO", String(telMun))
        formData.append("HORARIO", horario);
        formData.append("WEB", web);
        formData.append("RFC", rfc);
        formData.append("CORREOMUNICIPIO", mailMun);
        formData.append("TELEFONOTESORERO", String(telTesorero));
        formData.append("CELULARTESORERO", String(celTesorero));
        formData.append("CORREOTESORERO", mailTesorero);
        formData.append("ENLACE", enlace);
        formData.append("CELULARENLACE", String(celEnlace));
        formData.append("CORREOENLACE", mailEnlace);
        formData.append("EXTTELEFONOTESORERO", String(extTelTesorero));
        formData.append("TIPO", "/FOTOPERFIL/");

        if (nombreArchivo !== "") {
            formData.append("ESCUDO", newImage, nombreArchivo);
        }
        else {
            formData.append("ESCUDO", "");
        }
        formData.append("TOKEN", TOKEN);
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
                setPrimerInicio(false);
                // consulta();
                setEscudo(res.RESPONSE);
                // limpiar();
                setEditar(false);


            } else {
                AlertS.fire({
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
        setEditar(false);

    };

    const setValores = (data: IDatoMunicipio) => {
        setId(data.id);
        setEscudo(data.Escudo)
        setMunicipio(data.Municipio)
        setTesorero(data.Tesorero)
        setResponable(data.Enlace)
        setDomicilio(data.Domicilio)
        setTelMun(data.Telefono)
        setHorario(data.Horario)
        setWeb(data.Web)
        setTelMun(data.Telefono);
        setRfc(data.Rfc);
        setMailMun(data.CorreoMunicipio);
        setTelTesorero(data.TelefonoTesorero);
        setCelTesorero(data.CelularTesorero);
        setMailTesorero(data.CorreoTesorero);
        setEnlace(data.Enlace);
        setCelEnlace(data.CelularEnlace);
        setMailEnlace(data.CorreoEnlace);
        setExtTelTesorero(data.ExtTelefonoTesorero);

    }
    const handleChange = (value: number) => {
        // console.log(value)
        // setTelMun(value);

    };

    const limpiar = () => {
        setEscudo("")
        setMunicipio("")
        setTesorero("")
        setResponable("")
        setDomicilio("")
        setTelMun("")
        setHorario("")
        setUploadFile("")
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


    useEffect(() => {
        ValidaSesion();
        consulta()


    }, [editar])

    return (
        //Box padre
        <>
            {editar ?
                <>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid sx={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="CargaDeArchivosCuenta">
                                <input
                                    id="imagencargada"
                                    accept="image/*"
                                    onChange={(v) => { enCambioFile(v) }}
                                    type="file"
                                    style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }}
                                />
                                {!escudo ?
                                    <AddPhotoAlternateIcon sx={{ width: "300px", height: "300px", }} /> :
                                    <>
                                        {uploadFile ?
                                            <img src={uploadFile} style={{ objectFit: "scale-down", width: "100%", height: "100%" }} />
                                            :
                                            <VisaulizarImagen ubicacion={"FOTOPERFIL"} name={escudo} />
                                        }
                                    </>
                                }
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container direction="column" justifyContent="center" alignItems="center" padding={3} >
                        <div className="div-agregarcontactomunicipio">

                            <Grid container sx={{ padding: "2%", width: "100%" }}>
                                <Grid container justifyContent="center" alignItems="center" sx={{ paddingTop: "1.5%", }} >
                                    <Grid item xs={12} sm={12} md={11} lg={11} >
                                        <TextField
                                            disabled
                                            required
                                            multiline
                                            label="municipio"
                                            value={municipio}
                                            type="text"
                                            size="small"
                                            fullWidth
                                            sx={{ paddingBottom: "2%", }}
                                            variant="outlined"
                                            onChange={(v) => setMunicipio(v.target.value)}
                                            error={municipio === ""}
                                        // helperText={(municipio === "" ) ? "No se pueden enviar campos vacios" : null}

                                        />
                                        <TextField
                                            required
                                            multiline
                                            label="Domicilio"
                                            value={domicilio}
                                            type="text"
                                            size="small"
                                            fullWidth
                                            sx={{ paddingBottom: "2%" }}
                                            variant="outlined"
                                            onChange={(v) => setDomicilio(v.target.value)}
                                            error={domicilio === ""}
                                            helperText={(domicilio === "") ? "No se pueden enviar campos vacios" : null}

                                        />
                                    </Grid>
                                </Grid>

                                <Grid container justifyContent="center" alignItems="center" >
                                    <Grid item xs={12} sm={12} md={11} lg={11} sx={{ paddingBottom: "2%" }}>
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
                                                    sx={{ paddingBottom: "2%" }}
                                                    variant="outlined"
                                                    onChange={(v) => setRfc(v.target.value)}
                                                    error={rfc === ""}
                                                    helperText={(rfc === "") ? "No se pueden enviar campos vacios" : null}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} lg={4}  >
                                                <TextFieldFormatoMoneda
                                                    valor={Number(telMun)}
                                                    handleSetValor={handleChange}
                                                    disable={editar}
                                                    error={String(Number(telMun)) === "NaN"} modo={"telefono"}
                                                />

                                                <TextField
                                                    required
                                                    multiline
                                                    // margin="dense"
                                                    label="telefono"
                                                    inputProps={{ maxLength: 10 }}
                                                    value={telMun}
                                                    type=""
                                                    size="small"
                                                    fullWidth
                                                    sx={{ paddingBottom: "2%" }}
                                                    onChange={(v) => setTelMun((v.target.value))}
                                                    error={String(Number(telMun)) === "NaN"}
                                                    helperText={(telMun === "") ? "No se pueden enviar campos vacios" : null}

                                                />

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center" alignItems="center" >
                                    <Grid item xs={12} sm={12} md={11} lg={11} sx={{ paddingBottom: "2%" }} >
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
                                                    error={mailMun === ""}
                                                    helperText={(mailMun === "") ? "No se pueden enviar campos vacios" : null}

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
                                                    error={web === ""}
                                                    helperText={(web === "") ? "No se pueden enviar campos vacios" : null}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="left" alignItems="center" >
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
                                            error={horario === ""}
                                            helperText={(horario === "") ? "No se pueden enviar campos vacios" : null}

                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ padding: "2%", width: "100%" }}>
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
                                            error={tesorero === ""}
                                            helperText={(tesorero === "") ? "No se pueden enviar campos vacios" : null}

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
                                                            inputProps={{ maxLength: 10 }}
                                                            sx={{ paddingBottom: "2%" }}
                                                            variant="outlined"
                                                            onChange={(v) => setTelTesorero((v.target.value))}
                                                            error={String(Number(telTesorero)) === "NaN"}
                                                            helperText={telTesorero === "" ? "No se pueden enviar campos vacios" : null}

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
                                                            onChange={(v) => setExtTelTesorero((v.target.value))}
                                                            error={String(Number(extTelTesorero)) === "NaN"}
                                                            helperText={(extTelTesorero === "") ? "No se pueden enviar campos vacios" : null}

                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container justifyContent="space-between" alignItems="center" xs={12} sm={6} md={4} lg={4} >
                                                <Grid item xs={12} sm={2} md={2} lg={2}  ></Grid>
                                                <Grid item xs={12} sm={10} md={10} lg={10}  >
                                                    <TextField
                                                        required
                                                        // margin="dense"
                                                        label="Celular Tesorero"
                                                        value={celTesorero}
                                                        type="text"
                                                        inputProps={{ maxLength: 10 }}

                                                        size="small"
                                                        fullWidth
                                                        sx={{ paddingBottom: "2%" }} variant="outlined"
                                                        onChange={(v) => setCelTesorero((v.target.value))}
                                                        error={String(Number(celTesorero)) === "NaN"}
                                                        helperText={(celTesorero === "") ? "No se pueden enviar campos vacios" : null}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container justifyContent="space-between" alignItems="center" xs={12} sm={6} md={4} lg={4} >
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
                                                        error={mailTesorero === ""}
                                                        helperText={(mailTesorero === "") ? "No se pueden enviar campos vacios" : null}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" sx={{ padding: "2%", width: "100%" }}>

                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid item xs={12} sm={12} md={11} lg={11} sx={{ paddingBottom: "2%" }}>
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
                                            error={enlace === ""}
                                            helperText={(enlace === "") ? "No se pueden enviar campos vacios" : null}

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
                                                    type="text"
                                                    size="small"
                                                    fullWidth
                                                    inputProps={{ maxLength: 10 }}
                                                    sx={{ paddingBottom: "2%" }}
                                                    variant="outlined"
                                                    onChange={(v) => setCelEnlace((v.target.value))}
                                                    error={String(Number(celEnlace)) === "NaN"}
                                                    helperText={(celEnlace === "") ? "No se pueden enviar campos vacios" : null}

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
                                                    sx={{ paddingBottom: "2%" }}
                                                    variant="outlined"
                                                    onChange={(v) => setMailEnlace(v.target.value)}
                                                    error={mailEnlace === ""}
                                                    helperText={(mailEnlace === "") ? "No se pueden enviar campos vacios" : null}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}  >
                                                <Box display="flex" flexDirection="row-reverse">
                                                    <Box display="flex" flexDirection="row" >
                                                        <Box paddingRight={2}>
                                                            <Button variant="outlined" onClick={() => { limpiar() }}>Limpiar</Button>
                                                        </Box>
                                                        <Box paddingRight={2}>
                                                            <Button
                                                                disabled={
                                                                    municipio === ""
                                                                    || domicilio === ""
                                                                    || telMun === ""
                                                                    || telTesorero === ""
                                                                    || extTelTesorero === ""
                                                                    || celTesorero === ""
                                                                    || celEnlace === ""
                                                                    || String(Number(telMun)) === "NaN"
                                                                    || String(Number(telTesorero)) === "NaN"
                                                                    || mailMun === ""
                                                                    || web === ""
                                                                    || horario === ""
                                                                    || tesorero === ""
                                                                    || String(Number(telTesorero)) === "NaN"
                                                                    || String(Number(extTelTesorero)) === "NaN"
                                                                    || String(Number(celTesorero)) === "NaN"
                                                                    || mailTesorero === ""
                                                                    || enlace === ""
                                                                    || String(Number(celEnlace)) === "NaN"
                                                                    || mailEnlace === ""
                                                                }
                                                                variant="outlined"
                                                                onClick={() => { onClick() }}>
                                                                {nuevoRegistro ?
                                                                    "Guardar" :
                                                                    "Guardar Cambios"}
                                                            </Button>
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

                        </div>
                    </Grid>




                </>
                :
                <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ paddingBottom: "5%" }}   >

                    <Grid container direction="column" justifyContent="center" alignItems="center"  >

                        <Grid sx={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box boxShadow={3} padding={1} sx={{ bgcolor: "white", }} >
                                {escudo ?
                                    <VisaulizarImagen ubicacion={"FOTOPERFIL"} name={escudo} />

                                    :
                                    <>
                                        <AddPhotoAlternateIcon sx={{ width: "0%", height: "50%", }} />
                                        {/* <img src={dato.Escudo} style={{ alignItems: "center", objectFit: "scale-down", width: "50%", height: "50%", borderRadius: "0" }} /> */}
                                        {/* <img style={{ objectFit: "scale-down", width: "100%", height: "100%", borderRadius: '50%', }}
                                        src={"data:"+imgTipo+";base64," + imgData}
                                      /> */}
                                    </>



                                }
                            </Box>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" >

                        <Grid container item xs={12} md={11.5} lg={10.5} sx={{ boder: "6px solid", borderRadius: "20px", bgcolor: "white", paddingTop: "1%", paddingBottom: "1%" }}>
                            <div className="div-agregarcontactomunicipio">
                                <Grid item xs={12} md={12} container paddingTop={1}>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Municipio: </label> </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {municipio === "" ? "Sin información" : municipio}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Domicilio: </label> </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {domicilio === "" ? "Sin información" : domicilio}</label> </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} container paddingTop={1}>

                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> RFC: </label> </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {rfc === null || rfc === "" || rfc === "\"\"" ? "Sin información" : rfc}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Telefono: </label> </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {telMun === "" ? "Sin información" : telMun}</label> </Grid>

                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Correo Municipio: </label> </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {mailMun === "" || mailMun === null ? "Sin información" : mailMun}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Pagina Web: </label>  </Grid>
                                    <Grid item xs={6} md={4} textAlign="left" > <label className="TypographyH6Black"> {web === "" ? "Sin información" : web}</label>  </Grid>

                                </Grid>

                                <Divider variant="middle" sx={{ padding: "1.3%" }} />

                                <Grid item xs={12} md={12} container paddingTop={3}>
                                    <Grid item xs={6} md={6} textAlign="right" > <label className="TypographyH6Gray"> Tesorero: </label> </Grid>
                                    <Grid item xs={6} md={6} textAlign="left" > <label className="TypographyH6Black"> {tesorero === "" ? "Sin información" : tesorero}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Tel. Tesorero:  </label>  </Grid>
                                    <Grid item xs={6} md={2} textAlign="left" >  <label className="TypographyH6Black"> {telTesorero === "" ? "Sin información" : telTesorero}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Ext Tel. Tesorero:  </label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="left" > <label className="TypographyH6Black"> {extTelTesorero === "" ? "Sin información" : extTelTesorero}</label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="right" > <label className="TypographyH6Gray"> Celular Tesorero: </label> </Grid>
                                    <Grid item xs={6} md={2} textAlign="left" > <label className="TypographyH6Black"> {celTesorero === "" ? "Sin información" : celTesorero}</label> </Grid>

                                </Grid>

                                <Divider variant="middle" sx={{ padding: "1.3%" }} />

                                <Grid item xs={12} md={12} container paddingTop={3}>
                                    <Grid item xs={6} textAlign="right" > <label className="TypographyH6Gray"> Enlace: </label> </Grid>
                                    <Grid item xs={6} textAlign="left" > <label className="TypographyH6Black"> {enlace === "" ? "Sin información" : enlace}</label>  </Grid>

                                    <Grid item xs={6} textAlign="right" >  <label className="TypographyH6Gray"> Celular Enlace: </label> </Grid>
                                    <Grid item xs={6} textAlign="left" > <label className="TypographyH6Black"> {celEnlace === "" ? "Sin información" : celEnlace}</label> </Grid>
                                    <Grid item xs={6} textAlign="right" >  <label className="TypographyH6Gray"> Correo Enlace:  </label> </Grid>
                                    <Grid item xs={6} textAlign="left" > <label className="TypographyH6Black"> {mailEnlace === "" ? "Sin información" : mailEnlace}</label> </Grid>
                                    <Grid item xs={6} textAlign="right" > <label className="TypographyH6Gray"> Horario:  </label> </Grid>
                                    <Grid item xs={6} textAlign="left" > <label className="TypographyH6Black"> {horario === "" ? "Sin información" : horario}</label>  </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} container  >
                                    <Grid container item xs={12} md={11.8} paddingBottom={1}   justifyContent="flex-end" >
                                        <Button variant="outlined" onClick={() => { setEditar(true) }}>{nuevoRegistro ? "Registrar" : "Editar"}</Button>
                                    </Grid>
                                </Grid>
                            </div>
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


