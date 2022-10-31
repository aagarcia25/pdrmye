import { useEffect, useState } from "react";
import { Box, Dialog, Grid, InputAdornment, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import Slider from "../Slider";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import BotonesAPD from "../componentes/BotonesAPD";
import PersonIcon from "@mui/icons-material/Person";


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
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [detalle, setDetalle] = useState([]);
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));


    const columns: GridColDef[] = [
        { field: "id", hide: true, },
        { field: "IdMunicipio", hide: true, },
        { field: "idPrincipal", hide: true, },
        { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
        { field: "Nombre", headerName: "Municipio", width: 250 },
        { field: "Descripcion", headerName: "Mes", width: 120 },
        { field: "Anio", headerName: "Año", width: 120 },
        { field: "Total", headerName: "Total", width: 100 },
        {
            field: "acciones",
            headerName: "Acciones",
            description: "Ver detalle de Cálculo",
            sortable: false,
            width: 150,
            renderCell: (v) => {
                return (
                    <Box>
                    </Box>
                );
            },
        },
    ];
    const handleAccion = (v: number) => {
        if (v == 1) {
            handleClose()
        } else
            if (v == 2) {

                Eliminar();
            }
    };

    const Eliminar = () => {
        console.log(data)
        let d = {
            MES: data.Mes,
            ANIO: data.Anio,
            PRINCIPAL: data.id,
            CHUSER: user.id,
            TIPO: 2

        };
        Swal.fire({
            icon: "warning",
            title: "Borrar Detalle De Anticipo De Partcipacion",
            text: "¿Desea Autoriza?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // CatalogosServices.clonarInformacionAP(d).then((res) => {
                //     if (res.SUCCESS) {
                //         Toast.fire({
                //             icon: "success",
                //             title: "Borrado Exitoso!",
                //         });
                //         handleClose()
                //         // CatalogosServices.indexAPC(data).then((res) => {
                //         //     console.log(res.RESPONSE)

                //         // });
                //     } else {
                //         Alert.fire({
                //             title: "Error!",
                //             text: "Validar informacion",
                //             icon: "error",
                //         });
                //     }
                // });
            }
        });

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
                    <Grid container spacing={1} sx={{ justifyContent: "center", width: "100%" }} >
                    </Grid>
                    <Grid container
                        sx={{ justifyContent: "center", width: '100%' }} >

                        <Grid container>
                            <Grid item xs={1} md={1} lg={1}>
                                <BotonesAPD handleAccion={handleAccion} eliminar={eliminar} />
                            </Grid>

                        </Grid>

                        <Grid container spacing={3}  sx={{ justifyContent: "center", width: "100%" }}>
                            <Grid item  xs={12}>
                                <label >Concepto<br /><br /></label>
                                <TextField
                                multiline
                                rows={4}                                  
                                    type="text"
                                    sx={{
                                        width: "30vw",
                                        
                                      }}
                                />
                            </Grid>
                            <Grid item  xs={12}>
                                <label>Total<br /><br /></label>
                                <TextField
                                    type="number"
                                    sx={{
                                        width: "15vw",
                                      }}
                                />
                            </Grid>
                           

                            </Grid>
                        <Grid container spacing={3}  sx={{ justifyContent: "right ", width: "100%" }}>
                        <Grid item  xs={2}>
                        <button className="guardar" onClick={() => handleClose()}>Enviar</button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Dialog>
            </Box>
        </div>
    );
};
