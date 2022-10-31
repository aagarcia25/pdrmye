import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, Dialog, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
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
        idPrincipal,
    }
        :
        {
            idPrincipal: String;
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

    const [detalle, setDetalle] = useState([]);
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [nameNewDoc, setNameNewDoc] = useState(null);
    const [concepto, setConcepto] = useState<string>();
    const [total, setTotal] = useState<Number>();




    /////////////////////

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (concepto?.length != 0 && total?.valueOf != null) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
        else {
            Alert.fire({
                title: "Atencion",
                text: "Verificar los campos",
                icon: "info",
            });

        }
if(activeStep === steps.length - 1 ){


    CatalogosServices.avisos(formData).then((res) => {

        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          }    
          );
          setslideropen(false);
          handleClose("save");
        } else {
          Alert.fire({
            title: "Error!",
            text: "Campos Requeridos Vacios",
            icon: "error",
          });
          handleClose("cerrar");
          setslideropen(false);
        }
  
      });

}


    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    /////////////////////


    const handleNewFile = (event: any) => {

        let file = event.target!.files[0]!;
        console.log(event.target!.files[0]!);
        setNewDoc(file);
        setNameNewDoc(event.target!.files[0]!.name);
        setDocSubido(true);

    };

    const Clean = () => {
        setNewDoc(null);
        setNameNewDoc(null);
        setDocSubido(false);

    };
    useEffect(() => {
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>

            <Box>
                <Slider open={openSlider}></Slider>
                <Dialog open={Boolean(open)}  >

                    <Grid container spacing={2} sx={{ justifyContent: "center", }} >
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Titulo name={"Solicitud de Anticipo"} />
                            </Box>
                        </Grid>
                    </Grid>

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
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>

                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Atras
                                    </Button>

                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} >
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
                                            width: "30vw",

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
                                            width: "15vw",
                                        }}
                                    />
                                </Grid>


                            </Grid>


                        </Grid>
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
                    <Grid container spacing={3} sx={{ justifyContent: "right ", width: "100%" }}>
                        <Grid item xs={2}>
                            <button className="cerrar" onClick={() => handleClose()}>Cerrar</button>
                        </Grid>
                    </Grid>




                </Dialog>
            </Box>
        </div>
    );
};
