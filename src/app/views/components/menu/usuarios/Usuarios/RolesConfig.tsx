import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { AuthService } from '../../../../../services/AuthService';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';



const RolesConfig = ({
    id,
    open,
    handleClose,
}: {
    id: string,
    open: boolean;
    handleClose: Function,
}) => {

    const [modo, setModo] = useState<string>();
    const [data, setData] = useState([]);
    const [res, setRes] = useState<boolean>(false);

    const consulta = (modo: string, data: any) => {
        if (modo == "disponible") {
            AuthService.rolessinrelacionar(data).then((res) => {
                setData(res.RESPONSE);
                setModo("disponible");
                console.log(res.RESPONSE);
            });
        }
        if (modo == "relacionado") {
            AuthService.usuarioRol(data).then((res) => {
                setData(res.RESPONSE);
                res.RESPONSE[0] == null ? setRes(false) : setRes(true);
                console.log(res.RESPONSE);
                setModo("relacionado");
            });
        }
    };

    const handleRolRel = () => {
        setModo("relacionado");
        consulta("relacionado", { CHID: id, TIPO: 1, });
    };
    const handleRolDis = () => {
        setModo("disponible");
        consulta("disponible", { CHID: id, TIPO: 2, });
    };
    const handleChange = (v: any) => {
        let data = {
            TIPO: modo == "disponible" ? 1 : 2,
            IDROL: v.row.id,
            IDUSUARIO: id
        }
        AuthService.RelacionarUsuarioRol(data).then((res) => {
            setData(res.RESPONSE);
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: (modo == "disponible") ? "Permiso Relacionado!" : "Permiso Eliminado",
                });
                consulta(modo == "disponible" ? "disponible" : "relacionado", { CHID: id });
            } else {
                Alert.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });

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
            description: "Relacionar Rol",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                return <Checkbox disabled={res && modo == "disponible"} onChange={() => handleChange(v)} />;
            },
        },
        { field: "Nombre", headerName: "Nombre", width: 200 },
    ];

    useEffect(() => {
        consulta("relacionado", { CHID: id });
    }, [id]);

    return (
        <div>
            <Modal open={open}>
                <Box>
                    <Grid container sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    </Grid>
                    <Grid
                        container
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "30vw",
                            height: "60vh",
                            bgcolor: "rgb(255,255,255)",
                            boxShadow: 50,
                            p: 2,
                            borderRadius: 3,
                        }}
                    >
                        <Grid sm={12} sx={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center", }}>

                            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                <Button
                                    onClick={handleRolRel}
                                >Rol Relacionado</Button>
                                <Button
                                    onClick={handleRolDis}

                                >Roles Disponibles Para Relacionar</Button>
                            </ButtonGroup>

                        </Grid>

                        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Typography
                                sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "1.5vw", color: "#808080", }}>
                                {modo == "disponible" ?
                                    "Para Relacionar el Rol al usuario solo marque la Casilla"
                                    :
                                    "Para Eliminar el Rol de el usuario solo marque la Casilla"
                                }
                            </Typography>

                        </Grid>
                        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Typography
                                sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "1vw", color: "#808080", }}>
                                <p></p> "Solo Se Puede Asignar Un Rol"
                            </Typography>
                        </Grid>

                        <Grid sm={12}
                            sx={{
                                mt: "2vh",
                                width: "30%",
                                height: "60%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",

                            }}
                        >
                            <MUIXDataGridSimple columns={columns} rows={data} />

                        </Grid>

                        <Grid sm={12}
                            sx={{

                                display: "flex",
                                alignItems: "right",
                                justifyContent: "right",
                                mt: "2vh",

                            }}
                        >
                            <Button
                                sx={{ color: "#000", fontFamily: "MontserratMedium" }}
                                onClick={() => handleClose()}
                            >
                                Salir
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    )
}
export default RolesConfig