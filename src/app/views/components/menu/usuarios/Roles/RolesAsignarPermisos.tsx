import React, { useEffect, useState } from "react";

import { Modal, Typography, Button, Checkbox, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";

const RolesAsignaPermisos = ({
    id,
    open,
    handleClose,
}: {
    id: string;
    open: boolean;
    handleClose: Function;
}) => {
    const [data, setData] = useState([]);

    const [openSlider, setOpenSlider] = useState(false);

    const handleChange = (v: any) => {
        let data = {
            TIPO: 1,
            IDROL: id,
            IDMENU: v.id
        }
        AuthService.rolespermisorelacionar(data).then((res) => {
            setData(res.RESPONSE);
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Menu Relacionado!",
                });
                consulta({ CHID: id });
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
            description: messages.dataTableColum.id,
        },
        {
            field: "acciones",
            headerName: "",
            description: "Relacionar Roles",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                return <Checkbox onChange={() => handleChange(v)} />;
            },
        },

        { field: "MENU", headerName: "Menu", width: 400 },

    ];

    const consulta = (data: any) => {
        setOpenSlider(true);
        AuthService.menusinrelacionararol(data).then((res) => {
            setData(res.RESPONSE);
            setOpenSlider(false);
        });

    };

    useEffect(() => {
        consulta({ CHID: id });
    }, []);

    return (
        <div>
            <Slider open={openSlider} ></Slider>
            <Box >
                <Modal open={open}>
                    <Grid
                        container
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50vw",
                            height: "60vh",
                            bgcolor: "rgb(255,255,255)",
                            boxShadow: 50,
                            p: 2,
                            borderRadius: 3,
                        }}
                    >
                        <Grid md={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontFamily: "MontserratBold",
                                    fontSize: "2vw",
                                    color: "#454545",
                                }}
                            >
                                Relacionar Menú a Rol
                            </Typography>
                        </Grid>

                        <Grid md={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                            <Typography
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "MontserratMedium",
                                    fontSize: "1.5vw",
                                    color: "#808080",
                                }}
                            >
                                Para Relacionar el Menú solo Marca la Casilla
                            </Typography>

                        </Grid>

                        <Grid md={12}
                            sx={{
                                mt: "2vh",
                                width: "100%",
                                height: "60%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",

                            }}
                        >

                            <MUIXDataGridSimple columns={columns} rows={data} />

                        </Grid>

                        <Grid md={12}
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
                </Modal>
            </Box>
        </div>
    );
};

export default RolesAsignaPermisos;