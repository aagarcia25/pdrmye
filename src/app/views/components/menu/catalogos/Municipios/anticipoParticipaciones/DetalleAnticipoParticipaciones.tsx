import { useEffect, useState } from "react";
import { Box, Dialog, Grid, IconButton, ToggleButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PERMISO, RESPONSE } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import Slider from "../../../../Slider";
import { Titulo } from "../../Utilerias/AgregarCalculoUtil/Titulo";
import BotonesOpciones from "../../../../componentes/BotonesOpciones";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from "sweetalert2";
import { Toast } from "../../../../../../helpers/Toast";
import { Alert } from "../../../../../../helpers/Alert";
import { userInfo } from "os";
import BotonesAPD from "../../../../componentes/BotonesAPD";

export const DetalleAnticipoParticipaciones = (
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
    const [openSlider, setOpenSlider] = useState(true);
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
    const handleAccion = (v : number) => {
        if (v==1){
handleClose()
        }else 
        if (v==2){

            Eliminar();
        }
    };
    const getDetalles = (d: any) => {
        CatalogosServices.getdetalle(d).then((res) => {
            setDetalle(res.RESPONSE);
            console.log(res.RESPONSE)
            setOpenSlider(false);
        });
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
                CatalogosServices.clonarInformacionAP(d).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Borrado Exitoso!",
                        });
                        handleClose()
                        // CatalogosServices.indexAPC(data).then((res) => {
                        //     console.log(res.RESPONSE)

                        // });
                    } else {
                        Alert.fire({
                            title: "Error!",
                            text: "Validar informacion",
                            icon: "error",
                        });
                    }
                });
            }
        });

    };

    useEffect(() => {
if (data.Activo==1){
    setEliminar(true);
}
        getDetalles({ IDPRINCIPAL: idPrincipal })
    }, [idPrincipal]);

    return (
        <div style={{ height: 600, width: "80%" }}>
            <Box>

                <Slider open={openSlider}></Slider>


                <Dialog open={Boolean(open)} fullScreen={true} >

                    <Grid container spacing={2} sx={{ justifyContent: "center", }} >
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                <Titulo name={"Detalle de Anticipo De Participaciones"} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={1}
                        sx={{ display: "flex", justifyContent: "center", }} >

                        <Grid item xs={1} sx={{ alignItems: "center", }} >

                            <label className="subtitulo">{data.Anio}<br /><br /><br /></label>
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={1}
                        sx={{ justifyContent: "center", width: "100%" }} >

                        <Grid item xs={1} >
                            <label className="subtitulo">{data.mesdescripcion} <br /><br /><br /></label>
                        </Grid>
                    </Grid>
                    <Grid container
                        sx={{ justifyContent: "center", width: '100%' }} >

                        <Grid container>
                            <Grid item xs={1} md={1} lg={1}>
                               <BotonesAPD handleAccion={handleAccion} eliminar={eliminar}/>

                            </Grid>

                          

                        </Grid>
                        <MUIXDataGrid columns={columns} rows={detalle} />
                    </Grid>
                </Dialog>
            </Box>
        </div>
    );
};
