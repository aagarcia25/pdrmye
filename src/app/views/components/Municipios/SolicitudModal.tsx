import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CatalogosServices } from '../../../services/catalogosServices';
import { Toast } from '../../../helpers/Toast';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import validator from 'validator';
import { AlertS } from '../../../helpers/AlertS';
import ModalForm from '../componentes/ModalForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';

const steps = ['Campos Obligatorios', 'Carga de Archivo ', 'Finalizar Solicitud'];


export const SolicitudModal = (
    {
        data,
        handleClose,
        modo,
    }
        :
        {
            modo: String;
            data: any;
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


        if (concepto?.length != 0 && total?.valueOf != null && totalValid === true && sizeFile != true) {
            if (activeStep === steps.length - 1) {

            }

            else { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
        }
        else {
            AlertS.fire({
                title: "Atención",
                text: sizeFile ? "Tamaño de archivo Exedido -Limitado a 3Mb-" : "Verificar los campos",
                icon: "info",
            });

        }
        if (activeStep === steps.length - 1) {

            let d = {
                CHID: data.id,
                NUMOPERACION: modo === "editar" ? 9 : 1,
                CHUSER: user.id,
                CONCEPTO: concepto,
                TOTAL: total,
                ESTATUS: modo === "editar" ? "MUN_ACT" : "MUN_INICIO",
                ANIO: hoy.getFullYear(),
                MES: (hoy.getMonth() + 1),
                COMENTARIO: modo === "editar" ? "EDICION DE INFORMACION ANTES DE ENVIAR" : "INICIO DE OPERACION"
                //idMunicipio 
            };

            if (DocSubido && sizeFile === false) {
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
                                //console.log("response: " + res.RESPONSE[0])
                                //console.log("data id:  " + data.id)
                                if (DocSubido) {
                                    const formData = new FormData();
                                    formData.append("CHID", data.id);
                                    formData.append("NUMOPERACION", modo === "editar" ? "2" : "1");
                                    formData.append("MUNICIPIOS", newDoc);
                                    formData.append("IDSOLICITUD", modo === "editar" ? String(data.id) : res.RESPONSE);
                                    formData.append("COMENTARIO", modo === "editar" ? "Edicion de archivo" : "carga de archivo");

                                    CatalogosServices.subirArchivo(formData).then((res) => {
                                        if (res.SUCCESS) {
                                            //console.log(res.RESPONSE)
                                            Toast.fire({
                                                icon: "success",
                                                title: "Carga Exitosa!",
                                            }
                                            );
                                            handleClose();

                                        } else {
                                            AlertS.fire({
                                                title: "¡Error!",
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
                                    title: "¡Error!",
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
                                //console.log(res.RESPONSE)
                                Toast.fire({
                                    icon: "success",
                                    title: "Carga Exitosa!",
                                }
                                );
                                handleClose();
                            } else {
                                AlertS.fire({
                                    title: "¡Error!",
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
        //console.log(data)
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
            <ModalForm title={'Solicitud de Anticipo de Participaciones'} handleClose={handleClose}>
                {/* <Slider open={openSlider}></Slider> */}


                <DialogTitle textAlign="center">  </DialogTitle>
                {modoSol === "ver" ?
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Grid item xs={.5} >
                                <Tooltip title={"Vizualizar Detalles"}>
                                    <IconButton onClick={() => setModoSol("verDetalles")}>
                                        <ArrowBackIosNewIcon sx={{ width: "100%", height: "100%" }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>


                        <Grid item xs={7} sm={8} md={8} lg={8}>
                            <iframe id="inlineFrameExample"
                                title="Inline Frame Example"
                                width="100%"
                                height="700"
                                src={urlDoc}
                            />
                        </Grid>
                    </Grid>
                    : ""}
                {modoSol === "nuevo" || modoSol == "editar" ?

                    <DialogContent>
                        <Box boxShadow={3}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={7} sm={8} md={8} lg={8}
                            >
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

                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, }}>
                                            <Button color="warning" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 2, padding: 2 }}>
                                                Atrás
                                            </Button>

                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button color="success" onClick={handleNext} sx={{ padding: 2 }}>
                                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}
                            </Grid>
                        </Grid>

                        {(activeStep + 1) === 1 ?
                            <Grid container
                                sx={{ justifyContent: "center", width: '100%'}} >

                                <Grid item xs={8}>
                                    <Grid container xs={12}>
                                        <Grid item xs={8}>
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
                                        <Grid container >
                                            <Grid item xs={6}>
                                                <Typography variant='body1' margin={1}> IMPORTE </Typography>
                                                <TextField
                                                    variant="standard"
                                                    type="text"
                                                    value={total}
                                                    onChange={(v) => handleTotal(v.target.value)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                    sx={{
                                                        width: "40%",
                                                    }}
                                                    error={!totalValid}
                                                />
                                                <Typography variant='body2' padding={2}> {totalError} </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                            : ""}

                        {(activeStep + 1) === 3 ?
                            <Container maxWidth="sm">
                                <Box sx={{ width: '100%', paddingTop: "2" }}>
                                    <Grid container xs={12} spacing={1} sx={{ justifyContent: "center" }}>
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
                        {(activeStep + 1) === 2 ?
                            <Container maxWidth="sm" >
                                <Box sx={{ bgcolor: 'rgb(255, 255, 255)', }}>
                                    { //////////empiezan debajo del titulo
                                        //// imagen carga y previsualizacion
                                    }
                                    {DocSubido ?
                                        <Grid container justifyContent="space-between" alignItems="center" paddingBottom={1}>
                                            <Grid item xs={8} sm={8} md={6} lg={6} justifyContent="center" alignItems="center">
                                            <Typography>
                                                    {nameNewDoc}
                                             </Typography>
                                            </Grid>
                                            <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} justifyContent="rigth" alignItems="rigth">
                                                <Tooltip title={"Limpiar campo"}>
                                                    <IconButton aria-label="Borrar Documento" component="label" size="large" onClick={() => Clean()}>
                                                        <DeleteOutlineIcon sx={{ width: "100%", height: "100%" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>

                                        : ""}
                                    <Grid container direction="row" justifyContent="center" alignItems="center" paddingBottom={3}>

                                        <Grid container sx={{ border: "3px dashed  grey" }} justifyContent="center" alignItems="center">
                                            {nameNewDoc === "" ?
                                                <Tooltip title={"Cargar Archivo"}>
                                                    <IconButton component="label">
                                                        <input
                                                            hidden
                                                            id="imagencargada"
                                                            accept="application/pdf"
                                                            onChange={(event) => {
                                                                handleNewFile(event)
                                                            }}
                                                            type="file"
                                                        />
                                                        <CloudUploadIcon sx={{ width: "60%", height: "60%" }} />
                                                    </IconButton>
                                                </Tooltip>

                                                :
                                                <Tooltip title={"Cargar Archivo"}>

                                                    <IconButton component="label">
                                                        <input
                                                            hidden
                                                            id="imagencargada"
                                                            accept="application/pdf"
                                                            onChange={(event) => {
                                                                handleNewFile(event)
                                                            }}
                                                            type="file"
                                                        />
                                                        <PictureAsPdfOutlinedIcon sx={{ width: "60%", height: "60%" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                            : ""}
                            </Box>
                    </DialogContent>
                    : ""}
                {modoSol === "verDetalles" ?
                    <DialogContent >
                        <Box boxShadow={3}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={4} sx={{paddingBottom:"2%" }}>

                                <Typography color="grey" paddingBottom={1} sx={{ textAlign:"center" }}>
                                <label className='subtitulo'>Solicitante:</label>
                                </Typography>

                                <Typography  paddingBottom={2} sx={{  textAlign:"center" }}>
                                <label className='contenido'>{data.Solicitante}</label>
                                </Typography>
                                
                                <Typography  color="grey" paddingBottom={1} sx={{  textAlign:"center" }}>
                                <label className='subtitulo'>Concepto:</label>
                                </Typography>

                                <Typography paddingBottom={2} sx={{textAlign:"center" }}>
                                <label className='contenido'>{data.Concepto}</label>
                                </Typography>

                                <Typography color="grey" paddingBottom={1} sx={{  textAlign:"center" }}>
                                <label className='subtitulo'>Total:</label>
                               </Typography>

                                <Typography  paddingBottom={2} sx={{textAlign:"center" }}>
                                <label className='contenido'>{data.Total}</label>
                                </Typography>
                                
                                {data.NombreArchivo && data.RutaArchivo ?
                                    <>
                                        <Typography color="grey" paddingBottom={1} sx={{  textAlign:"center" }}>
                                        <label className='subtitulo'>Archivo:</label>
                                        </Typography>
                                        <Typography  paddingBottom={2} sx={{textAlign:"center" }}>
                                        <label className='contenido'>{data.NombreArchivo}</label>
                                        </Typography>

                                        <Grid item>
                                            <Box display="flex" justifyContent="center">
                                            <Box maxWidth={80}>
                                            <Tooltip title={"Vizualizar Documento"}>
                                                <IconButton onClick={() => setModoSol("ver")}>
                                                    <DescriptionIcon sx={{ width: "100%", height: "100%" }} />
                                                </IconButton>
                                            </Tooltip>
                                            </Box>
                                            </Box>
                                        </Grid>
                                    </>
                                    : ""}
                            </Grid>
                        </Grid>
                        </Box>
                    </DialogContent>
                    : ""}

            </ModalForm>

        </div>
    );
};
