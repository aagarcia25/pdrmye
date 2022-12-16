import {
    Box,
    Grid,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GridColDef } from '@mui/x-data-grid';

import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { AlertS } from "../../../../../helpers/AlertS";
import ModalForm from "../../../componentes/ModalForm";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from "../../../Slider";

const FondosView = ({
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
        AuthService.FondosAjustes({ CHID: dt?.row?.id, TIPO: 1, }).then((res) => {
            setDataARel(res.RESPONSE);
            setOpenSlider(false)
        });

        AuthService.FondosAjustes({ CHID: dt?.row?.id, TIPO: 2, }).then((res) => {
            setDataADis(res.RESPONSE);
            setOpenSlider(false)

        });

    }



    const columnsRel: GridColDef[] = [
        {
            field: "id",
            hide: true,
        },
        {
            headerName: "Acciones",
            field: "acciones", disableExport: true,
            description: "Acciones",
            sortable: false,
            width: 80,
            renderCell: (v) => {
                return (

                    <Tooltip title={"Presionar Para Asignar: " + v.row.Descripcion}>
                        <IconButton onClick={() => handleAjustesRel(v)}>
                            <ArrowBackIosIcon color='success' />
                        </IconButton>
                    </Tooltip>
                );


            },
        },
        { field: "Descripcion", headerName: "Descripción", description: "Descripción", width: 400 },
    ];
    const columnsElim: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "Descripcion", headerName: "Descripcion", description: "Descripción", width: 300
        },
        {
            field: "acciones", disableExport: true,
            description: "Relacionar Menus",
            headerName: "",
            sortable: false,
            width: 10,

            renderCell: (v) => {
                return (
                    <Tooltip title={"Presionar Para Quitar El: " + v.row.Descripcion}>
                        <IconButton onClick={() => handleAjustesElim(v)}>
                            <ArrowForwardIosIcon color='error' />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ];


    const handleAjustesRel = (v: any) => {
        setOpenSlider(true)

        AuthService.FondosRelAjuste(
            {
                TIPO: 1,
                IDAJUSTE: v?.row?.id,
                IDFONDO: idFondo,
            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Ajuste Asignado!",
                });
                consulta();
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    const handleAjustesElim = (v: any) => {
        setOpenSlider(true)
        AuthService.FondosRelAjuste(
            {
                TIPO: 2,
                IDAJUSTE: v?.row?.id,
                IDFONDO: idFondo,
            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Ajuste Eliminado!",
                });
                consulta();

            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    useEffect(() => {
        setDescripcion(dt?.row?.Descripcion);
        setIdFondo(dt?.row?.id);
        consulta();


    }, []);


    return (
        <div>
            <Slider open={openSlider} />
            <ModalForm title={"       Relacion de Ajustes"} handleClose={handleClose}>
                <Grid container sx={{ display: "flex", width: "100%", height: "100%", boxShadow: 50, borderRadius: 3, justifyContent: "center", alignItems: "center", }}  >
                    <Box>
                        <br />
                        <label> <h2>{"Fondo: " + descripcion} </h2></label>
                    </Box>

                </Grid>
                <Grid container justifyContent="space-evenly" sx={{ boxShadow: 50, borderRadius: 20, }}>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <Grid container sx={{ left: "50%", width: "100%", height: "70vh", bgcolor: "rgb(255,255,255)", boxShadow: 50, borderRadius: 3, justifyContent: "center" }} >
                            <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                                <Grid item sm={12} sx={{ height: "100%" }}>
                                    <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                        <Typography sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "1.5vw", color: "#808080", }}>
                                            Ajustes Relacionados
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
                                        Ajustes Disponibles Para Relacionar
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} sx={{ height: "90%", }}>
                                    <MUIXDataGridSimple columns={columnsRel} rows={dataADis} />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

            </ModalForm>

        </div>

    )
}



export default FondosView;
