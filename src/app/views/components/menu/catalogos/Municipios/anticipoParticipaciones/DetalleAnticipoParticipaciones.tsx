import { useEffect, useState } from "react";
import { Box, Dialog, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PERMISO } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import Slider from "../../../../Slider";
import { Titulo } from "../../Utilerias/AgregarCalculoUtil/Titulo";
import BotonesOpciones from "../../../../componentes/BotonesOpciones";


export const DetalleAnticipoParticipaciones = (
    {
        idPrincipal,
        data,
        open,
        handleClose
    }
        :
        {
            idPrincipal: string;
            data: any;
            open: boolean;
            handleClose:Function;
        }
) => {
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
    const [APC, setAPC] = useState([]);
    const [openSlider, setOpenSlider] = useState(false);


    const handleDetalle = (v: any) => {
    };

    const columns: GridColDef[] = [
        { field: "id", hide: true, },
        { field: "Descripcion", headerName: "Estatus", width: 120 },
        { field: "mesdescripcion", headerName: "Mes", width: 120 },
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

    useEffect(() => {
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "MUNAPC") {
                console.log(item)
                if (String(item.Referencia) == "AGREG") {
                    setAgregar(true);
                }
                if (String(item.Referencia) == "ELIM") {
                    setEliminar(true);
                }
                if (String(item.Referencia) == "EDIT") {
                    setEditar(true);
                }
                if (String(item.Referencia) == "TRAZA") {
                    setVerTrazabilidad(true);
                }

            }
        });
        console.log(data)
        console.log(idPrincipal)
        let dat = {
            IDPRINCIPAL: idPrincipal
        };
        setOpenSlider(true);
        CatalogosServices.getdetalle(dat).then((res) => {
            setAPC(res.RESPONSE);
            console.log(res.RESPONSE)
            setOpenSlider(false);
        });
    }, []);
    return (
        <div style={{ height: 600, width: "80%" }}>
            <Box>

                <Slider open={openSlider}></Slider>


                <Dialog open={Boolean(open)} fullScreen={true} >

                    <Grid container spacing={2} sx={{ justifyContent: "center", }} >
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                <Titulo name={"Detalle de Participaciones"} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={1}
                        sx={{ display: "flex", justifyContent: "center", }} >

                        <Grid item xs={1} sx={{ alignItems: "center", }} >

                            {/* <label className="subtitulo">{anio}<br /><br /><br /></label> */}
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={1}
                        sx={{ justifyContent: "center", width: "100%" }} >

                        <Grid item xs={1} >

                            {/* <label className="subtitulo">{mes} <br /><br /><br /></label> */}
                        </Grid>
                    </Grid>
                    <Grid
                        container spacing={1}
                        sx={{ justifyContent: "center", width: '100%' }} >

                        <Grid item xs={7} md={8} lg={8} sx={{ justifyContent: "center", width: '100%' }}>
                            <BotonesOpciones
                  handleAccion={handleClose}
                  autorizar={false}
                  cancelar={false}
                  verTrazabilidad={verTrazabilidad}
                  enviar={false}
                  presupuesto={true} 
                  estatus={""}   
                  perfil={""}
                  area={""}  
                  />
  
                            <MUIXDataGrid columns={columns} rows={data} />

                        </Grid>
                    </Grid>

                </Dialog>
            </Box>
        </div>
    );
};
