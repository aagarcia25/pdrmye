import React, { useEffect, useState } from "react";

import { Modal, Typography, Button, Checkbox, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import ModalForm from "../../../componentes/ModalForm";

const AsignarMenuRol = ({
    id,
    open,
    handleClose,
}: {
    id: string;
    open: boolean;
    handleClose: Function;
}) => {
    const [dataAsignarMenuRol, setDataAsignarMenuRol] = useState([]);

    const [openSliderAsignarMenuRol, setOpenSliderAsignarMenuRol] = useState(false);

    const handleChangeAsignarMenuRol = (v: any) => {
        let dataAsignarMenuRol = {
            TIPO: 1,
            IDROL: id,
            IDMENU: v.id
        }
        AuthService.rolespermisorelacionar(dataAsignarMenuRol).then((res) => {
            setDataAsignarMenuRol(res.RESPONSE);
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Menu Relacionado!",
                });
                consulta({ CHID: id });
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });





    };

    const columnsAsignarMenuRol: GridColDef[] = [
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
                return <Checkbox onChange={() => handleChangeAsignarMenuRol(v)} />;
            },
        },

        { field: "MENU", headerName: "Menu", width: 400 },

    ];

    const consulta = (data: any) => {
        setOpenSliderAsignarMenuRol(true);
        AuthService.menusinrelacionararol(data).then((res) => {
            setDataAsignarMenuRol(res.RESPONSE);
            setOpenSliderAsignarMenuRol(false);
        });

    };

    useEffect(() => {
        consulta({ CHID: id });
    }, [dataAsignarMenuRol]);

    return (
        <div>
            <Slider open={openSliderAsignarMenuRol} ></Slider>

            <ModalForm title={" Relacionar Menú a Rol"} handleClose={handleClose}>
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} lg={6}>

                        <Box sx={{ boxShadow: 3 }} >
                            <Grid
                                container
                                sx={{
                                    left: "50%",
                                    width: "100%",
                                    height: "80vh",
                                    bgcolor: "rgb(255,255,255)",
                                    justifyContent: "center"
                                }}
                            >
                                <Box sx={{ boxShadow: 3, width: "100%", height: "100%", padding: "1%" }}>
                                    <Grid md={12}
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%"
                                        }}
                                    >
                                        <Grid sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Typography
                                                sx={{
                                                    textAlign: "left",
                                                    fontFamily: "sans-serif",
                                                    fontSize: "1.5vw",
                                                    color: "#808080",
                                                }}
                                            >
                                                Para Relacionar el Menú solo Marca la Casilla
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            sx={{ height: "90%", margin: "1%" }} >
                                            <MUIXDataGridSimple columns={columnsAsignarMenuRol} rows={dataAsignarMenuRol} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </ModalForm>
        </div>
    );
};

export default AsignarMenuRol;