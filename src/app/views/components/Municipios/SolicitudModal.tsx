import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import BotonesAPD from "../componentes/BotonesAPD";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AlertS } from '../../../helpers/AlertS';
import { CatalogosServices } from '../../../services/catalogosServices';
import { Toast } from '../../../helpers/Toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import validator from 'validator';
import { border, borderColor } from '@mui/system';


const steps = ['Campos Obligatorios', 'Carga de Archivo ', 'Finalizar Solicitud'];


export const SolicitudModal = (
    {
        data,
        open,
        handleClose,
        modo,
    }
        :
        {
            modo: String;
            data: any;
            open: boolean;
            handleClose: Function;
        }
) => {
    const [modoSol, setModoSol] = useState<string>();
    const [newDoc, setNewDoc] = useState(Object);
    const [DocSubido, setDocSubido] = useState<boolean>(false);
    const [urlDoc, setUrlDoc] = useState("");
    const [sizeFile, setSizeFile] = useState<boolean>();
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [nameNewDoc, setNameNewDoc] = useState<string>();
    const [concepto, setConcepto] = useState<string>();
    const [totalError, setTotalError] = useState<string>();
    const [totalValid, setTotalValid] = useState<boolean>();
    const [total, setTotal] = useState<string>();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    var hoy = new Date()


    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {


        if (concepto?.length != 0 && total?.valueOf != null && totalValid == true && sizeFile != true) {
            if (activeStep === steps.length - 1) {

            }

            else { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
        }
        else {
            AlertS.fire({
                title: "Atencion",
                text: sizeFile ? "Tamaño de archivo Exedido -Limitado a 3Mb-" : "Verificar los campos",
                icon: "info",
            });

        }
        if (activeStep === steps.length - 1) {

            let d = {
                CHID: data.id,
                NUMOPERACION: modo == "editar" ? 9 : 1,
                CHUSER: user.id,
                CONCEPTO: concepto,
                TOTAL: total,
                ESTATUS: modo == "editar" ? "MUN_ACT" : "MUN_INICIO",
                ANIO: hoy.getFullYear(),
                MES: (hoy.getMonth() + 1),
                COMENTARIO: modo == "editar" ? "EDICION DE INFORMACION ANTES DE ENVIAR" : "INICIO DE OPERACION"
                //idMunicipio 
            };

            if (DocSubido && sizeFile == false) {
                Swal.fire({
                    icon: "info",
                    title: "Solicitar",
                    text: "Guardar?",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        CatalogosServices.SolicitudesInfo(d).then((res) => {
                            if (res.SUCCESS) {
                                console.log("response: " + res.RESPONSE[0])
                                console.log("data id:  " + data.id)
                                if (DocSubido) {
                                    const formData = new FormData();
                                    formData.append("CHID", data.id);
                                    formData.append("NUMOPERACION", modo == "editar" ? "2" : "1");
                                    formData.append("MUNICIPIOS", newDoc);
                                    formData.append("IDSOLICITUD", modo == "editar" ? String(data.id) : res.RESPONSE);
                                    formData.append("COMENTARIO", modo == "editar" ? "Edicion de archivo" : "carga de archivo");

                                    CatalogosServices.subirArchivo(formData).then((res) => {
                                        if (res.SUCCESS) {
                                            console.log(res.RESPONSE)
                                            Toast.fire({
                                                icon: "success",
                                                title: "Carga Exitosa!",
                                            }
                                            );
                                            handleClose();

                                        } else {
                                            AlertS.fire({
                                                title: "Error!",
                                                text: "Fallo en la carga",
                                                icon: "error",
                                            });
                                        }
                                    });
                                } else {
                                    Toast.fire({
                                        icon: "success",
                                        title: "Carga Exitosa!",
                                    }
                                    );
                                    handleClose();
                                }

                            } else {
                                AlertS.fire({
                                    title: "Error!",
                                    text: "Fallo en la peticion",
                                    icon: "error",
                                });
                            }
                        });
                    }
                    if (result.isDenied) {
                        handleReset();
                    }
                });
            } else {

                Swal.fire({
                    icon: "info",
                    title: "Solicitar",
                    text: "¿Guardar sin Documento?",
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        CatalogosServices.SolicitudesInfo(d).then((res) => {
                            if (res.SUCCESS) {
                                console.log(res.RESPONSE)
                                Toast.fire({
                                    icon: "success",
                                    title: "Carga Exitosa!",
                                }
                                );
                                handleClose();


                            } else {
                                AlertS.fire({
                                    title: "Error!",
                                    text: "Fallo en la peticion",
                                    icon: "error",
                                });
                            }
                        });
                    }
                    if (result.isDenied) {
                        handleReset();
                    }
                });



            }

        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleTotal = (v: string) => {
        ///// clave
        setTotal(v)
        if (validator.isNumeric(v)) {
            setTotalError('')
            setTotalValid(true);
        } else {
            setTotalError('Ingrese Valores Numericos')
            setTotalValid(false);
        }

    };

    const handleReset = () => {
        setActiveStep(0);
    };
    /////////////////////
    const handleNewFile = (event: any) => {

        let file = event.target!.files[0]!;
        var sizeByte = Number(file.size);
        setSizeFile(Number(sizeByte) / 1024 >= 3072 ? true : false)

        setNewDoc(file);
        setNameNewDoc(event.target!.files[0]!.name);
        //if(String(event.target!.files[0]!.name).slice)
        setDocSubido(true);
    };


    const Clean = () => {
        setNewDoc(null);
        setDocSubido(false);
        setNameNewDoc("");

    };

    useEffect(() => {
        setModoSol(String(modo))
        console.log(data)
        setUrlDoc(data.RutaArchivo)
        if (modo == "editar") {
            setTotal(data?.row?.Total)
            setConcepto(data?.row?.Concepto)
        }
        setNewDoc(null);
        setDocSubido(false);
        setNameNewDoc("");

    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>

            <Box>
                <Slider open={openSlider}></Slider>
                <Dialog open={Boolean(open)} fullWidth={true}
                //fullScreen={modo=="ver"?true:false}
                >
                    <DialogTitle textAlign="center"> Solicitud de Anticipo de Participaciones </DialogTitle>
                    {modoSol == "ver" ?
                        <Grid container>
                            <Grid item>
                                <Tooltip title={"Vizualizar Detalles"}>
                                    <IconButton onClick={() => setModoSol("verDetalles")}>
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item >
                                <iframe id="inlineFrameExample"
                                    title="Inline Frame Example"
                                    width="600"
                                    height="500"
                                    src={urlDoc}
                                />
                            </Grid>
                        </Grid>
                        : ""}
                    {modoSol == "nuevo" || modoSol == "editar" ?

                        <DialogContent dividers={true}>

                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: {
                                            optional?: React.ReactNode;
                                        } = {};
                                        if (isStepOptional(index)) {
                                            labelProps.optional = (
                                                <Typography variant="caption">Opcional</Typography>
                                            );
                                        }
                                        if (isStepSkipped(index)) {
                                            stepProps.completed = false;
                                        }
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                {activeStep === steps.length ? (
                                    ""
                                ) : (
                                    <React.Fragment>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button color="warning" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 2, padding:2 }}>
                                               Atrás 
                                            </Button>

                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button color="success" onClick={handleNext} sx={{ padding:2 }}>
                                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}
                            </Box>
                            <Grid container spacing={1} sx={{ justifyContent: "center", width: "100%" }} >
                            </Grid>

                            {(activeStep + 1) == 1 ?
                                <Grid container
                                    sx={{ justifyContent: "center", width: '100%' }} >


                                    <Grid container spacing={3} xs={12} sx={{ justifyContent: "center"}}>
                                        <Grid item xs={12}>
                                            <Typography variant='body1' margin={1}> CONCEPTO </Typography>
                                            <TextField 
                                                multiline
                                                value={concepto}
                                                rows={4}
                                                type="text"
                                                onChange={(v) => setConcepto(v.target.value)}
                                                sx={{
                                                    width: "100%"
                                                
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Typography variant='body1' margin={1}> TOTAL </Typography>
                                            <TextField
                                                type="text"
                                                value={total}
                                                onChange={(v) => handleTotal(v.target.value)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                sx={{
                                                    width: "40%",
                                                }}
                                                error= {!totalValid}
                                            />
                                            <Typography variant='body2'padding={2}> {totalError} </Typography>
                                        </Grid>
                                    </Grid>


                                </Grid>
                                : ""}

                            {(activeStep + 1) == 3 ?
                                <Container maxWidth="sm">
                                    <Box sx={{ width: '100%', paddingTop:"2" }}>
                                        <Grid container xs={12} spacing={1} sx={{ justifyContent: "center"}}>
                                            <Grid item xs={12}>
                                            <Typography variant='body1' margin={1}> CONCEPTO </Typography>
                                                <TextField
                                                    multiline
                                                    disabled
                                                    value={concepto}
                                                    rows={4}
                                                    type="text"
                                                    sx={{
                                                        width: "100%",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                            <Typography variant='body1' margin={1}> TOTAL </Typography>
                                                <TextField
                                                    disabled
                                                    type="number"
                                                    value={total}
                                                    sx={{
                                                        width: "40%",
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            p: 1,
                                            m: 1,
                                            bgcolor: 'background.paper',
                                            borderRadius: 1,
                                        }}>
                                            {DocSubido ?
                                                <Box>
                                                    <label >
                                                        {nameNewDoc}
                                                    </label>

                                                </Box>
                                                : ""}
                                        </Box>
                                    </Box>
                                </Container>
                                : ""}
                            {(activeStep + 1) == 2 ?
                                <Container maxWidth="sm" >
                                    <Box sx={{ bgcolor: 'rgb(255, 255, 255)', width: '100%', height: 300 }}>
                                        { //////////empiezan debajo del titulo
                                            //// imagen carga y previsualizacion
                                        }
                                        <Box sx={{ width: '100%', }}>
                                            {/* <Box sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                p: 1,
                                                m: 1,
                                                bgcolor: 'background.paper',
                                                borderRadius: 1,
                                            }}> */}
                                            <Box sx={{ width: "100%", height: "40%", border: "5px dashed  black", display: "flex", justifyContent: "center", alignItems: "center", mt: "2vh"}}>
                                                <input 
                                                    id="imagencargada"
                                                    accept="application/pdf"
                                                    onChange={(event) => {
                                                        handleNewFile(event)
                                                    }}
                                                    type="file"
                                                    style={{ zIndex: 2, opacity: 0, width: "90%", height: "40%", position: "absolute", cursor: "pointer", }} /
                                                >
                                                {nameNewDoc === "" ? <CloudUploadIcon sx={{ width: "50%", height: "80%" }} /> : <PictureAsPdfOutlinedIcon sx={{ width: "50%", height: "80%" }} />}

                                            </Box>

                                            {DocSubido ?
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                                                    <label >
                                                        {nameNewDoc}
                                                    </label>
                                                    <Box>
                                                        <IconButton aria-label="upload picture" component="label" size="large" onClick={() => Clean()}>

                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                : ""}

                                        </Box>
                                    </Box>
                                </Container>
                                : ""}
                        </DialogContent>
                        : ""}
                    {modoSol == "verDetalles" ?
                        <DialogContent dividers={true}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <label className='subtitulo'>Solicitante:</label>
                                    <br />
                                    <label className='contenido'>{data.Solicitante}</label>
                                    <br />
                                    <br />
                                    <br />
                                    <label className='subtitulo'>Concepto:</label>
                                    <br />
                                    <label className='contenido'>{data.Concepto}</label>
                                    <br />
                                    <br />
                                    <br />
                                    <label className='subtitulo'>Total:</label>
                                    <br />
                                    <label className='contenido'>{data.Total}</label>
                                    {data.NombreArchivo && data.RutaArchivo ?
                                        <>
                                            <br />
                                            <br />
                                            <label className='subtitulo'>Archivo:</label>
                                            <br />
                                            <label className='contenido'>{data.NombreArchivo}</label>
                                            <br />
                                            <Tooltip title={"Vizualizar Documento"}>
                                                <IconButton onClick={() => setModoSol("ver")}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                        :
                                        ""

                                    }



                                </Grid>

                            </Grid>
                        </DialogContent>
                        :

                        ""}

                    <Grid container xs={12} spacing={3} marginTop={1} marginBottom={1} sx={{ justifyContent: "right ", width: "100%" }}>
                        <Grid item xs={2} paddingBottom={1}>
                            <button className="cerrar" onClick={() => handleClose()}> {modo == "ver" || modo == "verDetalles" ? "Cerrar" : "Cancelar"}</button>
                        </Grid>
                    </Grid>




                </Dialog>
            </Box>
        </div>
    );
};
