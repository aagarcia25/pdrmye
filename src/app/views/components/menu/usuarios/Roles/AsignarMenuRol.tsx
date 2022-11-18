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
                AlertS.fire({
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
        consulta({ CHID: id  });
    }, []);

    return (
        <div>
            <Slider open={openSlider} ></Slider>

<ModalForm title={" Relacionar Menú a Rol"} handleClose={handleClose}>

<Box >
      
                    <Grid
                        container
                        sx={{
                            left: "50%",
                            width: "100%",
                            height: "80vh",
                            bgcolor: "rgb(255,255,255)",
                            justifyContent:"center"
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

                        <Grid md={12}
                            sx={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",

                            }}
                        >

                            <MUIXDataGridSimple columns={columns} rows={data} />

                        </Grid>

        
                    </Grid>
              
            </Box>
    

</ModalForm>
    </div>
    );
};

export default AsignarMenuRol;