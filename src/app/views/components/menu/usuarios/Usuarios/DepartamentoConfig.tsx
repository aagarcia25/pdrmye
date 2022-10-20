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

const DepartamentoConfig = ({
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
    const [openSlider, setOpenSlider] = useState<boolean>();
    const [descripcion, setDescripcion] = useState<string>();
    const [idDepartamento, setIdDepratamento] = useState<string>();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const consulta = (data: any) => {
        setOpenSlider(true);
        AuthService.getUsuarioDepartamento(data).then((res) => {
            setData(res.RESPONSE);
            setOpenSlider(false);
            console.log(res)
        });

    };


    const handleChange = (v: any) => {

        if (openRel != true) {
            AuthService.UsuarioDepartamento(
                {
                    TIPO: 1,
                    IDDEPARTAMENTO: v?.row?.id,
                    IDUSUARIO: idDepartamento,
                }
            ).then((res) => {
                setData(res.RESPONSE);
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Perfil Asignado!",
                    });
                    consulta({
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
            AuthService.UsuarioDepartamento(
                {
                    TIPO: 2,
                    IDDEPARTAMENTO: v?.row?.id,
                    IDUSUARIO: idDepartamento,
                }
            ).then((res) => {
                setData(res.RESPONSE);
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Perfil Eliminado!",
                    });
                    consulta({
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
                return <Checkbox disabled={data!=null && openRel!=true} onChange={() => handleChange(v)} />;
            },
        },
        { field: "Descripcion", headerName: "Descripcion", width: 300 },
    ];


    const handleAjustesRel = () => {
        setOpenRel(true);
        consulta({ CHID: dt?.row?.id, TIPO: 1, });
    };

    const handleAjustesDis = () => {
        setOpenRel(false);
        consulta({ CHID: dt?.row?.id, TIPO: 2, });
    };

    useEffect(() => {
        handleAjustesRel();
        console.log(dt?.row);
        console.log("id perfil--- " + dt?.row?.id);
        setDescripcion(dt?.row?.Descripcion);
        setIdDepratamento(dt?.row?.id);
    }, []);


    return (
        <div>

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
                            >Departamento Relacionado</Button>
                            <Button
                                onClick={handleAjustesDis}

                            >Departamentos Disponibles Para Relacionar</Button>
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

                                    *Para Eliminar el Departamento Seleccione la Casilla*
                                        <br/>
                                        *Solo se Puede Asignar Un Departamento Por Usuario*
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
                                    *Para Asignar el Departamento Seleccione la Casilla*
                                        <br/>
                                        *Solo se Puede Asignar Un Departamento Por Usuario*
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



export default DepartamentoConfig;