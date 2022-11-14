import { Box, Button, ButtonGroup, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import MUIXDataGrid from "../../../MUIXDataGrid";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { MunicipioCambios, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";


const CambiosMun = () => {
    // CAMPOS DE LOS FORMULARIOS
    const [bitacoraAjustes, setBitacoraAjustes] = useState([]);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [vrows, setVrows] = useState({});
    const [solicitud, setSolicitud] = useState<MunicipioCambios>();
    const [labelCatalogo, setLabelCatalogo] = useState<string>();

    const [facturacion, setFacturacion] = useState<string>();
    const [anio, setAnio] = useState<string>();
    const [diario, setDiario] = useState<string>();
    const [mensual, setMensual] = useState<string>();
    const [anual, setAnual] = useState<string>();
    const [totalPob, setTotalPob] = useState<string>();
    const [total, setTotal] = useState<string>();
    const [carenciaProm, setCarenciaProm] = useState<string>();
    const [personas, setPersonas] = useState<string>();
    const [pob, setPob] = useState<string>();
    const [recaudacion, setRecaudacion] = useState<string>();
    const [movimientos, setMovimientos] = useState<string>();
    const [mes, setMes] = useState<string>();
    const [km2, setKm2] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [porcentaje, setPorcentaje] = useState<string>();






    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "Tipo",
            hide: true,
        },
        {
            field: "IdRegistro",
            hide: true,
        },
        {
            field: "Solicitud",
            hide: true,
        },
        {
            field: "Aplicado",
            hide: true,
        },
        {
            field: "acciones",
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100,
            renderCell: (v) => {
                return (
                    <>


                        {
                            ((user.DEPARTAMENTOS[0].NombreCorto == "CPH" && user.PERFILES[0].Referencia == "COOR") ? (
                                <>
                                    <Tooltip title="Atender Solicitud">
                                        <IconButton color="info" onClick={() => handlevalidar(v)}>
                                            <AssignmentTurnedInIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) :
                                ""
                            )
                        }
                    </>
                );
            },
        },
        {
            field: "FechaCreacion",
            headerName: "Fecha Creacion",
            width: 150,
        },
        {
            field: "Solicitante",
            headerName: "Solicitante",
            width: 150
        }



    ];

    const tablas = [
        { tipo: 'MunPobrezaExt', label: 'Municipio Pobreza Extrema' },
        { tipo: 'MunFacturacion', label: 'Municipio Facturación', },
        { tipo: 'MunPobreza', label: 'Municipio Pobreza ', },
        { tipo: 'MunProyec', label: 'Municipio Proyección', },
        { tipo: 'MunRecaudacion', label: 'Municipio Recaudación', },
        { tipo: 'MunRefrendos', label: 'Municipio Refrendos', },
        { tipo: 'MunTerritorio', label: 'Municipio Territorio', },
        { tipo: 'Umas', label: 'UMAS', },
        { tipo: 'MunFideicomiso', label: 'Municipio Fideicomiso', },


    ]


    const handlevalidar = (v: any) => {
        setOpenModal(true);
        setVrows(v.row);
        console.log(v.row);
        setSolicitud(JSON.parse(String(v.row.Solicitud)));



        console.log(v.row.Solicitud);
        setLabelCatalogo(String(tablas.find(({ tipo }) => tipo == v.row.Tipo)?.label));
        console.log(String(tablas.find(({ tipo }) => tipo == v.row.Tipo)?.label));
        console.log(String(solicitud?.CarenciaProm))
        // setFacturacion(v?.row?.Facturacion)
        // setAnio(v?.row?.Anio)
        // setDiario(v?.row?.Facturacion)
        // setMensual(v?.row?.Facturacion)
        // setAnual(v?.row?.Facturacion)
        // setTotalPob(v?.row?.Facturacion)
        // setTotal(v?.row?.Facturacion)
        // setCarenciaProm(v?.row?.Facturacion)
        // setPersonas(v?.row?.Facturacion)
        // setPob(v?.row?.Facturacion)
        // setRecaudacion(v?.row?.Facturacion)
        // setMovimientos(v?.row?.Facturacion)
        // setMes(v?.row?.Facturacion)
        // setKm2(v?.row?.Facturacion)
        // setNombre(v?.row?.Nombre)
        // setPorcentaje(v?.row?.Porcentaje)
    };

    const consulta = () => {
        CatalogosServices.BitacoraAjustes({ NUMOPERACION: 4 }).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                });
                // console.log(res.RESPONSE);
                setBitacoraAjustes(res.RESPONSE);
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    const handleClose = () => {
        setOpenModal(false);
        consulta();
    };



    useEffect(() => {
        consulta();

    }, []);

    return (
        <>

            <Grid container >
                <Grid item sm={12}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Typography
                        sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "3vw", color: "#000000", }}>
                        Solicitud de Cambios
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}
            >
                <Grid item xs={12} sm={10} md={8} lg={6} >
                    <MUIXDataGrid columns={columns} rows={bitacoraAjustes} />
                </Grid>
            </Grid>


            {openModal ?
                (<>
                    <ModalForm title={"Solicitud de Cambios"} handleClose={handleClose}>

                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography>
                                            <h3>{String("Catalogo a Modificar: " + labelCatalogo)}</h3>
                                        </Typography>
                                    </Box>
                                </Grid>

                            </Grid>

                            <Grid container>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <label>
                                        <h4>{String("Valores Originales")}</h4>
                                    </label>

                                </Grid>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <label>
                                        <h4>{String("Cambios Solicitados")}</h4>
                                    </label><br /><br /><br />

                                </Grid>

                            </Grid>


                            <Grid container>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <label>
                                        <h4>{String("Valores Originales")}</h4>
                                    </label>

                                </Grid>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <Box>
                                        {solicitud?.Anio ? <Typography><h5>	{"	Año	: " + solicitud?.Anio}<br />	</h5></Typography> : ""}
                                        {solicitud?.Personas ? <Typography><h5>	{"	Personas	: " + solicitud?.Personas}<br />	</h5></Typography> : ""}
                                        {solicitud?.CarenciaProm ? <Typography><h5>	{"	Carencia Promedio	: " + solicitud?.CarenciaProm}<br />	</h5></Typography> : ""}
                                        {solicitud?.Nombre ? <Typography><h5>	{"	Nombre	: " + solicitud?.Nombre}<br />	</h5></Typography> : ""}
                                        {solicitud?.Porcentaje ? <Typography><h5>	{"	Porcentaje	: " + solicitud?.Porcentaje}<br />	</h5></Typography> : ""}
                                        {solicitud?.ClaveBancaria ? <Typography><h5>	{"	Clave Bancaria	: " + solicitud?.ClaveBancaria}<br />	</h5></Typography> : ""}
                                        {solicitud?.Cuenta ? <Typography><h5>	{"	Cuenta	: " + solicitud?.Cuenta}<br />	</h5></Typography> : ""}
                                        {solicitud?.Importe ? <Typography><h5>	{"	Importe	: " + solicitud?.Importe}<br />	</h5></Typography> : ""}
                                        {solicitud?.Coeficiente ? <Typography><h5>	{"	Coeficiente	: " + solicitud?.Coeficiente}<br />	</h5></Typography> : ""}
                                        {solicitud?.Version ? <Typography><h5>	{"	Version	: " + solicitud?.Version}<br />	</h5></Typography> : ""}
                                        {solicitud?.totalPob ? <Typography><h5>	{"	Poblacion Total	: " + solicitud?.totalPob}<br />	</h5></Typography> : ""}
                                        {solicitud?.Total ? <Typography><h5>	{"	Total	: " + solicitud?.Total}<br />	</h5></Typography> : ""}
                                        {solicitud?.anio ? <Typography><h5>	{"	Año	: " + solicitud?.anio}<br />	</h5></Typography> : ""}
                                        {solicitud?.Pob ? <Typography><h5>	{"	Poblacion Total	: " + solicitud?.Pob}<br />	</h5></Typography> : ""}
                                        {solicitud?.Recaudacion ? <Typography><h5>	{"	Recaudacion	: " + solicitud?.Recaudacion}<br />	</h5></Typography> : ""}
                                        {solicitud?.Km2 ? <Typography><h5>	{"	KM2	: " + solicitud?.Km2}<br />	</h5></Typography> : ""}
                                        {solicitud?.Mes ? <Typography><h5>	{"	Mes	: " + solicitud?.Mes}<br />	</h5></Typography> : ""}
                                        {solicitud?.Movimientos ? <Typography><h5>	{"	Movimientos	: " + solicitud?.Movimientos}<br />	</h5></Typography> : ""}



                                    </Box>

                                </Grid>

                            </Grid>







                        </Box>


                    </ModalForm>
                </>) : ""
            }
        </>


    );
};

export default CambiosMun;


