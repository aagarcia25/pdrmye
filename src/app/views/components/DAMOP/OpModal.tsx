import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, ToggleButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CatalogosServices } from '../../../services/catalogosServices';
import { Toast } from '../../../helpers/Toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import validator from 'validator';
import { border, borderColor } from '@mui/system';
import { AlertS } from '../../../helpers/AlertS';
import ModalForm from '../componentes/ModalForm';
import MUIXDataGrid from '../MUIXDataGrid';
import { GridColDef } from '@mui/x-data-grid';


const steps = ['Campos Obligatorios', 'Carga de Archivo ', 'Finalizar Solicitud'];


export const OpModal = (
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
    const Cl = () => {


    };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "Tipo",
            hide: true,
        },
        {
            field: "IdRegistro",
            hide: true,
        },
        {
            field: "Solicitud",
            hide: true,
        },


        {
            field: "FechaCreacion",
            headerName: "Fecha Creacion",
            width: 180,
        },
        {
            field: "Solicitante",
            headerName: "Solicitante",
            width: 350
        }



    ];

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
            <ModalForm title={'Detalles de solicitudes de Pago'} handleClose={handleClose}>
                <Box>

                    {modoSol == "verDetalles" ?
                        <DialogContent dividers={true}>

                            <Grid container>
                                <Grid item xs={12} >
                                    <label className='subtitulo'>No Proveedor:</label>
                                    <label className='contenido'>{data.Solicitante}</label>
                                    <br />
                                    <label className='subtitulo'>No Proyecto:</label>
                                    <label className='contenido'>{data.Concepto}</label>
                                    <br />
                                    <label className='subtitulo'>Fecha:</label>
                                    <br />
                                    <br />
                                    <label className='subtitulo'>Total:</label>
                                    <br />
                                    <label className='contenido'>{data.Total}</label>
                                </Grid>


                                <Grid item xs={12}>

                                    <MUIXDataGrid columns={columns} rows={{}} />
                                </Grid>

                            </Grid>
                        </DialogContent>
                        :

                        ""}


                </Box>

            </ModalForm>

        </div>
    );
};