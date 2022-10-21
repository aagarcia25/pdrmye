import {
    Dialog,
    DialogActions,
    Box,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    Grid,
    Button,
    ButtonGroup,
    styled,
    Paper,
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from '@mui/x-data-grid';

import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import { id } from "date-fns/locale";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";

const PerfilesConfiguracion = ({
    open,
    handleClose,
    tipo,
    dt,
}: {
    open: boolean;
    modo: string;
    tipo: number;
    handleClose: Function;
    dt: any;
}) => {

    const [data, setData] = useState([]);
    const [openRel, setOpenRel] = useState(true);
    const [openSlider, setOpenSlider] = useState<boolean>(true);
    const [result, setRes] = useState<boolean>();
    const [asignado, setAsignado] = useState<boolean>(false);
    const [descripcion, setDescripcion] = useState<string>();
    const [idPerfil, setIdPerfil] = useState<string>();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const consulta = (modo: string, data: any) => {
        setOpenSlider(true);
        AuthService.getUsuarioPerfil(data).then((res) => {
            setData(res.RESPONSE);
            setOpenSlider(false);
            console.log(res.RESPONSE)
            if (modo == "rel") {
                if (res.RESPONSE.length != 0) {
                    setAsignado(true);
                    setRes(false);
                    setOpenSlider(false)
                } else {
                    setRes(false)
                    setAsignado(false)
                    setOpenSlider(false)
                }
            }
            if (modo == "dis") {
                if (asignado) {
                    setRes(true)
                    setOpenSlider(false)
                }
            }



        });

    };


    const handleChange = (v: any) => {

        if (openRel != true) {
            AuthService.UsuarioPerfil(
                {
                    TIPO: 1,
                    IDPERFIL: v?.row?.id,
                    IDUSUARIO: idPerfil,
                }
            ).then((res) => {
                setData(res.RESPONSE);
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Perfil Asignado!",
                    });
                    setRes(true);
                    consulta(
                        "dis",
                        {
                            CHID: dt?.row?.id,
                            TIPO: 2,
                        });
                } else {
                    Alert.fire({
                        title: "Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                }
            });
        }
        else {
            AuthService.UsuarioPerfil(
                {
                    TIPO: 2,
                    IDPERFIL: v?.row?.id,
                    IDUSUARIO: idPerfil,
                }
            ).then((res) => {
                setData(res.RESPONSE);
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Perfil Eliminado!",
                    });
                    if (res.RESPONSE.length != 0) {
                        setAsignado(true);
                        setRes(false);
                        setOpenSlider(false)
                    } else {
                        setRes(false)
                        setAsignado(false)
                        setOpenSlider(false)
                    }
                    consulta("rel", {
                        CHID: dt?.row?.id,
                        TIPO: 1,
                    });
                } else {
                    Alert.fire({
                        title: "Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                }
            });
        }


    };



    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "acciones",
            headerName: "",
            description: "Relacionar Menus",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                console.log("valor de rel -- " + result)
                return <Checkbox disabled={result} onChange={() => handleChange(v)} />;
            },
        },
        { field: "Descripcion", headerName: "Descripcion", width: 300 },
    ];


    const handleAjustesRel = () => {
        setOpenRel(true);
        consulta("rel", { CHID: dt?.row?.id, TIPO: 1, });
    };

    const handleAjustesDis = () => {
        setOpenRel(false);
        consulta("dis", { CHID: dt?.row?.id, TIPO: 2, });
    };

    useEffect(() => {
        consulta("rel", { CHID: dt?.row?.id, TIPO: 1, });
        handleAjustesRel();
        setDescripcion(dt?.row?.Descripcion);
        setIdPerfil(dt?.row?.id);
    }, []);


    return (
        <div>
            <Slider open={openSlider}></Slider>
            <Dialog open={open} >
                <Box
                    sx={{
                        mt: "2vh",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >


                    <Grid container sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>

                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button
                                onClick={handleAjustesRel}
                            >Perfiles Relacionados</Button>
                            <Button
                                onClick={handleAjustesDis}

                            >Perfiles Disponibles Para Relacionar</Button>
                        </ButtonGroup>
                    </Grid>

                    <Grid
                        container
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgb(245,245,245)",
                            boxShadow: 50,
                            borderRadius: 3,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        {openRel ?
                            <Box>

                                <Grid container
                                    sx={{
                                        textAlign: 'center',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <Grid item xs={12}>
                                        <br />
                                        <label className="Titulo">
                                            Perfiles Relacionados
                                        </label>
                                        <br />
                                    </Grid>
                                    <Grid item xs={12}>

                                        *Para Eliminar el Perfil Seleccione la Casilla*
                                        <br />
                                        *Solo se Puede Asignar Un Perfil Por Usuario*
                                    </Grid>
                                </Grid>
                            </Box>
                            :
                            <Box>
                                <Grid container
                                    sx={{
                                        textAlign: 'center',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <Grid item xs={12}>
                                        <br />
                                        <label className="Titulo">
                                            Perfiles Disponibles Para Relacionar
                                        </label>
                                        <br />
                                    </Grid>
                                    <Grid item xs={12}>
                                        *Para Asignar el Perfil Seleccione la Casilla*
                                        <br />
                                        *Solo se Puede Asignar Un Perfil Por Usuario*
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                        <Box>

                            <br />
                            <label>{descripcion} </label>
                        </Box>

                        <Box sx={{ display: "flex" }}>
                            <Grid container sm={12} sx={{ alignItems: "center", justifyContent: "center", }}>

                                <Grid item xs={12} sx={{
                                    width: "100%",
                                    height: 300,
                                }}>
                                    <MUIXDataGridSimple columns={columns} rows={data} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>

                <DialogActions>
                    <button className="cerrar" onClick={() => handleClose()}>Cerrar</button>
                </DialogActions>
            </Dialog>
        </div>

    )
}



export default PerfilesConfiguracion;