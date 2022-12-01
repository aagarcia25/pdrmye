import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    Grid,
    Button,
    ButtonGroup,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { AlertS } from "../../../../../helpers/AlertS";
import ModalForm from "../../../componentes/ModalForm";
import Slider from "../../../Slider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const FondosTipoView = ({
    handleClose,
    dt,
}: {
    handleClose: Function;
    dt: any;
}) => {

    const [dataADis, setDataADis] = useState([]);
    const [dataRel, setDataARel] = useState([]);
    const [openSlider, setOpenSlider] = useState(true);
    const [descripcion, setDescripcion] = useState<string>();
    const [idFondo, setIdFondo] = useState<string>();


    const consulta = () => {
        setOpenSlider(true)
        AuthService.tipoCalculo({ CHID: dt?.row?.id, NUMOPERACION: 5, }).then((res) => {
            setDataADis(res.RESPONSE);
            setOpenSlider(false);
        });
        AuthService.tipoCalculo({ CHID: dt?.row?.id, NUMOPERACION: 4, }).then((res) => {
            setDataARel(res.RESPONSE);
            setOpenSlider(false);
        });
       

    };

    const columnsRel: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "idrelacion",
            hide: true,
        },

        {
            field: "acciones",
            headerName: "",
            description: "Relacionar",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                return (
                    <Tooltip title={"Eliminar Ajuste"}>
                        <IconButton onClick={() => handleAjustesRel(v)}>
                            < ArrowBackIosIcon color='success' />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        { field: "Descripcion", headerName: "Descripcion", width: 400 },
    ];
    const columnsElim: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "idrelacion",
            hide: true,
        },
        { field: "Descripcion", headerName: "Descripcion", width: 300 },
        {
            field: "acciones",
            headerName: "",
            description: "Relacionar",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                return (

                    <Tooltip title={"Asignar Ajuste"}>
                        <IconButton onClick={() => handleAjustesElim(v)}>
                            <ArrowForwardIosIcon color='error' />
                        </IconButton>
                    </Tooltip>
                );

            },
        }
       
    ];

    const handleAjustesRel = (v: any) => {
        setOpenSlider(true)
        AuthService.tipoCalculo(
            {
                NUMOPERACION: 1,
                IDTIPOCALCULO: v?.row?.id,
                IDFONDO: idFondo,
            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Calculo Asignado!",
                });
                consulta();

            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
                consulta();
            }
        });
    };

    const handleAjustesElim = (v: any) => {
        setOpenSlider(true)
        AuthService.tipoCalculo(
            {
                NUMOPERACION: 3,
                CHID: v?.row?.idrelacion,
            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Calculo Eliminado!",
                });
                consulta();
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
                consulta();
            }
        });
    };

    useEffect(() => {
        consulta();
        setDescripcion(dt?.row?.Descripcion);
        setIdFondo(dt?.row?.id);
    }, []);


    return (
        <div>

            <ModalForm title={"Tipo de Cálculos Relacionados"} handleClose={handleClose}>
                <Slider open={openSlider}></Slider>
                <Grid container
                    sx={{
                        mt: "2vh",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <Grid container sx={{ width: "100%", height: "100%", boxShadow: 50, borderRadius: 3, justifyContent: "center", alignItems: "center", }}>
                        <Box>
                            <br />
                            <label> <h2>{"Fondo: "+descripcion} </h2></label>
                        </Box>
                        <Grid container justifyContent="space-evenly" sx={{ boxShadow: 50, borderRadius: 20, }}>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <Grid container sx={{ left: "50%", width: "100%", height: "70vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
                                    <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                                        <Grid item sm={12} sx={{ height: "100%" }}>
                                            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                                <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }}>
                                                    Calculos Relacionados
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={12} sx={{ height: "90%", }}>
                                                <MUIXDataGridSimple columns={columnsElim} rows={dataRel} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <Grid container sx={{ left: "50%", width: "100%", height: "70vh", bgcolor: "rgb(255,255,255)", justifyContent: "center" }} >
                                    <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                                        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }} >
                                                Calculos Disponibles Para Relacionar
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={12} sx={{ height: "90%", }}>
                                            <MUIXDataGridSimple columns={columnsRel} rows={dataADis} />
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



            </ModalForm>

        </div>

    )
}



export default FondosTipoView;
