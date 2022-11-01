import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
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
import { Alert } from '../../../helpers/Alert';
import { CatalogosServices } from '../../../services/catalogosServices';
import { Toast } from '../../../helpers/Toast';



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
    const [newDoc, setNewDoc] = useState(Object);
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [DocSubido, setDocSubido] = useState<boolean>(false);
    const [slideropen, setslideropen] = useState(true)
    const [urlDoc, setUrlDoc] = useState("");
    const [sizeFile, setSizeFile] = useState<boolean>();
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [nameNewDoc, setNameNewDoc] = useState<string>();
    const [concepto, setConcepto] = useState<string>();
    const [total, setTotal] = useState<Number>();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {


        if (concepto?.length != 0 && total?.valueOf != null && total != 0&& sizeFile!=true) {

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            Alert.fire({
                title: "Atencion",
                text: sizeFile?"Tamaño de archivo Exedido Maximo 3Mb":"Verificar los campos",
                icon: "info",
            });

        }
        if (activeStep === steps.length - 1)  {

            let d = {
                NUMOPERACION: 1,
                CHUSER: user.id,
                CONCEPTO: concepto,
                TOTAL: total,
                IDESTATUS: "30ec276f-2b14-11ed-afdb-040300000000",
            };

            if (DocSubido && sizeFile==false) {
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
                                console.log(res.RESPONSE)
                                if (DocSubido) {
                                    const formData = new FormData();

                                    formData.append("MUNICIPIOS", newDoc);
                                    formData.append("IDSOLICITUD", res.RESPONSE);

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
                                            Alert.fire({
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
                                Alert.fire({
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
                                Alert.fire({
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

    const handleReset = () => {
        setActiveStep(0);
    };

    /////////////////////


    const handleNewFile = (event: any) => {

        let file = event.target!.files[0]!;
        var sizeByte = Number(file.size);
        setSizeFile(Number(sizeByte) / 1024>=3072?true:false)

        setNewDoc(file);
        setNameNewDoc(event.target!.files[0]!.name);
        setDocSubido(true);
        console.log(event.target!.files[0]!);
        console.log(sizeFile)
    };

    const Clean = () => {
        setNewDoc(null);
        setNameNewDoc('');
        setDocSubido(false);

    };

    useEffect(() => {

        console.log(data)
        setUrlDoc(data.RutaArchivo)
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>

            <Box>
                <Slider open={openSlider}></Slider>
                <Dialog open={Boolean(open)} fullWidth={true}
                //fullScreen={modo=="ver"?true:false}
                >

                    <DialogTitle>Solicitud de Anticipo de Participaciones</DialogTitle>
                    {modo == "ver" ?
                        <Grid container>
                            <Grid item>
                                <iframe id="inlineFrameExample"
                                    title="Inline Frame Example"
                                    width="600"
                                    height="500"
                                    src={urlDoc}
                                />

                            </Grid>

                        </Grid>




                        :
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
                                            <Button color="warning" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                                Atras
                                            </Button>

                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button color="success" onClick={handleNext} >
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


                                    <Grid container spacing={3} sx={{ justifyContent: "center", width: "100%" }}>
                                        <Grid item xs={12}>
                                            <label >Concepto<br /><br /></label>
                                            <TextField
                                                multiline
                                                value={concepto}
                                                rows={4}
                                                type="text"
                                                onChange={(v) => setConcepto(v.target.value)}
                                                sx={{
                                                    width: "20vw",

                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label>Total<br /><br /></label>
                                            <TextField
                                                type="number"
                                                value={total}
                                                onChange={(v) => setTotal(Number(v.target.value))}
                                                sx={{
                                                    width: "20vw",
                                                }}
                                            />
                                        </Grid>


                                    </Grid>


                                </Grid>
                                : ""}

                            {(activeStep + 1) == 3 ?
                                <Container maxWidth="sm" >


                                    <Box sx={{ width: '100%', }}>
                                        <Grid container spacing={1} sx={{ justifyContent: "center", width: "100%" }}>
                                            <Grid item xs={12}>
                                                <label >Concepto<br /><br /></label>
                                                <TextField
                                                    multiline
                                                    disabled
                                                    value={concepto}
                                                    rows={4}
                                                    type="text"
                                                    sx={{
                                                        width: "20vw",

                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <label>Total<br /><br /></label>
                                                <TextField
                                                    disabled
                                                    type="number"
                                                    value={total}
                                                    sx={{
                                                        width: "20vw",
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

                                        {
                                            //////////empiezan debajo del titulo

                                            //// imagen carga y previsualizacion
                                        }
                                        <Box sx={{ width: '100%', }}>

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
                                                <Box>
                                                    <IconButton aria-label="upload picture" component="label" size="large" >
                                                        <input
                                                            required
                                                            type="file"
                                                            hidden
                                                            accept="application/pdf"
                                                            onChange={(event) => {
                                                                handleNewFile(event)
                                                            }} />
                                                        <UploadFileIcon />
                                                    </IconButton>
                                                </Box>


                                                {DocSubido ?
                                                    <Box>
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
                                    </Box>
                                </Container>
                                : ""}
                        </DialogContent>
                    }

                    <Grid container spacing={3} sx={{ justifyContent: "right ", width: "100%" }}>
                        <Grid item xs={2}>
                            <button className="cerrar" onClick={() => handleClose()}> {modo == "ver" ? "Cerrar" : "Cancelar"}</button>
                        </Grid>
                    </Grid>




                </Dialog>
            </Box>
        </div>
    );
};
