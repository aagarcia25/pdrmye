import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Dialog, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import MUIXDataGrid from "../../../MUIXDataGrid";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { MunicipioCambios, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import ModalForm from "../../../componentes/ModalForm";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import ComentarioModal from "../../../componentes/ComentarioModal";
import { Label } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';


const CambiosMun = () => {
    // CAMPOS DE LOS FORMULARIOS
    const [bitacoraAjustes, setBitacoraAjustes] = useState([]);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openValidacion, setOpenValidacion] = useState<boolean>(false);

    const [vrows, setVrows] = useState({});
    const [solicitud, setSolicitud] = useState<MunicipioCambios>();
    const [origen, setOrigen] = useState<MunicipioCambios>();

    const [labelCatalogo, setLabelCatalogo] = useState<string>();
    const [solicitante, setSolicitante] = useState<string>();

    const [comentario, setComentario] = useState<string>();
    const [idCambio, setIdCambio] = useState<string>();
    const [idSolicitante, setIdSolicitante] = useState<string>();
    const [modoVer, setModoVer] = useState<boolean>(false);
    const [municipio, setMunicipio] = useState<string>();



    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "IdRegistro",
            hide: true,
        },
        {
            field: "Tipo",
            hide: true,
        },
        {
            field: "Solicitud",
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
                            ((user.DEPARTAMENTOS[0].NombreCorto == "CPH" && user.PERFILES[0].Referencia == "COOR") && (v.row.Aplicado == 0 && v.row.deleted == 0) ? (
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
                        <>
                            <Tooltip title="Ver Solicitud">
                                <IconButton color="info" onClick={() => handlever(v)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    </>
                );
            },
        },
        {
            field: "Aplicado",
            headerName: "Estatus",
            description: "Campo de Acciones",
            width: 300,
            renderCell: (v) => {
                return (
                    <>
                        {
                            ((v.row.Aplicado === 0 && v.row.deleted === 0) ? (
                                <> <label> Espera de Autorizacion</label>  </>) : "")

                        }
                        {
                            ((v.row.Aplicado === 0 && v.row.deleted === 1) ? (
                                <> <label> Rechazado</label> </>) : "")

                        }
                        {
                            ((v.row.Aplicado === 1 && v.row.deleted === 0) ? (
                                <> <label> Autorizado</label></>) : "")

                        }
                    </>
                );
            },
        },

        {
            field: "FechaCreacion",
            headerName: "Fecha Creacion",
            width: 180,
        },
        {
            field: "nombreMunicipio",
            hide: true,
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
        { tipo: 'UMAS', label: 'UMAS', },
        { tipo: 'MunFideicomiso', label: 'Municipio Fideicomiso', },


    ]


    const handlevalidar = (v: any) => {
        setOpenModal(true);
        setModoVer(false);
        setVrows(v.row);
        //console.log(v.row)
        setComentario(v?.row?.Comentario);
        setSolicitud(JSON.parse(String(v.row.Solicitud)));
        //console.log(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setSolicitante(v?.row?.Solicitante)
        setIdSolicitante(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setOrigen(JSON.parse(String(v.row.Origen)));
        setLabelCatalogo(String(tablas.find(({ tipo }) => tipo === v.row.Tipo)?.label));
        setIdCambio(v.row.id);
        setMunicipio(v?.row?.nombreMunicipio);

    };

    const handlever = (v: any) => {
        setOpenModal(true);
        setModoVer(true);
        setVrows(v.row);
        //console.log(v.row)
        setComentario(v?.row?.Comentario);
        setSolicitud(JSON.parse(String(v.row.Solicitud)));
        //console.log(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setSolicitante(v?.row?.Solicitante)
        setIdSolicitante(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setOrigen(JSON.parse(String(v.row.Origen)));
        setLabelCatalogo(String(tablas.find(({ tipo }) => tipo === v.row.Tipo)?.label));
        setIdCambio(v.row.id);
        setMunicipio(v?.row?.nombreMunicipio);

    };

    const handleSolicitud = () => {
        setOpenValidacion(true);


    };
    const acciones = (v: any) => {
        //console.log(v);

        if (comentario) {
            Swal.fire({
                icon: v === "autorizar" ? "success" : "warning",
                title: v === "autorizar" ? "Autorizar" : "Rechazar",
                text: v === "autorizar" ? "¿Autorizara el cambio?" : "¿Rechazar el cambio?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {

                    CatalogosServices.BitacoraAjustes({
                        NUMOPERACION: v === "autorizar" ? 2 : 3,
                        CHID: idCambio,
                        CHUSER: user.id,
                        COMENTARIO: comentario
                    }).then((res) => {
                        if (res.SUCCESS) {
                            //console.log(res.RESPONSE)
                            handleClose();
                        } else {

                            AlertS.fire({
                                title: "Error!",
                                text: "Fallo en la peticion",
                                icon: "error",

                            });
                        }
                    });
                }
                if (result.isDenied) {
                }
            });

        } else {

            AlertS.fire({
                title: "Error!",
                text: "Campo Comenatrio Vacio",
                icon: "error",

            });
        }


    };

    const consulta = () => {
        CatalogosServices.BitacoraAjustes({ NUMOPERACION: 4 }).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                });
                // //console.log(res.RESPONSE);
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
        setOpenValidacion(false);
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
                <Grid item xs={12}

                    sx={{ height: 700, width: "100%" }}>
                    <MUIXDataGrid columns={columns} rows={bitacoraAjustes} />
                </Grid>
            </Grid>


            {openModal ?
                (<>
                    <ModalForm title={String(solicitud?.deleted) === "1" ? "Solicitud de Borrado de Campo" : "Solicitud de Cambio de Valores"} handleClose={handleClose}>

                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <Typography>
                                    <h3>{String("Catalogo a Modificar: " + labelCatalogo)}</h3>
                                </Typography>


                            </Grid>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <Typography>
                                    <h3>{String("Solicitante: " + solicitante)}</h3>
                                </Typography>


                            </Grid>


                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <Typography>
                                    <h3>{municipio !=null ? String("Municipio: " + municipio):""}</h3>
                                </Typography>


                            </Grid>

                            <Grid container direction="row" justifyContent="center" alignItems="center" >
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <label>
                                        <h4>{String("Valores Originales")}</h4>
                                    </label>

                                </Grid>

                                {String(solicitud?.deleted) === "1" ? "" :
                                    <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                        <label>
                                            <h4>{String("Cambios Solicitados")}</h4>
                                        </label><br /><br /><br />

                                    </Grid>
                                }

                            </Grid>


                            <Grid container direction="row" justifyContent="center" alignItems="center" >
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Box>


                                                {origen?.Anio ?        <Typography><h5>{"Año: "+               origen?.Anio}          <br/></h5></Typography>:""}
                                                {origen?.Personas ?    <Typography><h5>{"Personas: "+          origen?.Personas}      <br/></h5></Typography>:""}
                                                {origen?.CarenciaProm ?<Typography><h5>{"Carencia Promedio: "+ origen?.CarenciaProm}  <br/></h5></Typography>:""}
                                                {origen?.Nombre ?      <Typography><h5>{"Nombre: "+            origen?.Nombre}        <br/></h5></Typography>:""}
                                                {origen?.Porcentaje ?  <Typography><h5>{"Porcentaje "+         origen?.Porcentaje}    <br/></h5></Typography>:""}
                                                {origen?.ClaveBancaria?<Typography><h5>{"Clave Bancaria: "+    origen?.ClaveBancaria} <br/></h5></Typography>:""}
                                                {origen?.Cuenta ?      <Typography><h5>{"Cuenta: "+            origen?.Cuenta}        <br/></h5></Typography>:""}
                                                {origen?.Importe ?     <Typography><h5>{"Importe: "+           origen?.Importe}       <br/></h5></Typography>:""}
                                                {origen?.Coeficiente ? <Typography><h5>{"Coeficiente: "+       origen?.Coeficiente}   <br/></h5></Typography>:""}
                                                {origen?.Version ?     <Typography><h5>{"Version: "+           origen?.Version}       <br/></h5></Typography>:""}
                                                {origen?.totalPob ?    <Typography><h5>{"Poblacion Total: "+   origen?.totalPob}      <br/></h5></Typography>:""}
                                                {Number(origen?.Facturacion) >= 0 ? <Typography><h5>{"Facturacion: "+       origen?.Facturacion}   <br/></h5></Typography>:""}
                                                {origen?.Total ?       <Typography><h5>{"Total: "+             origen?.Total}         <br/></h5></Typography>:""}
                                                {origen?.anio ?        <Typography><h5>{"Año: "+               origen?.anio}          <br/></h5></Typography>:""}
                                                {origen?.Pob ?         <Typography><h5>{"Poblacion Total: "+   origen?.Pob}           <br/></h5></Typography>:""}
                                                {origen?.Recaudacion ? <Typography><h5>{"Recaudacion: "+       origen?.Recaudacion}   <br/></h5></Typography>:""}
                                                {origen?.Km2 ?         <Typography><h5>{"KM2: "+               origen?.Km2}           <br/></h5></Typography>:""}
                                                {origen?.Mes ?         <Typography><h5>{"Mes: "+               origen?.Mes}           <br/></h5></Typography>:""}
                                                {origen?.Movimientos ? <Typography><h5>{"Movimientos: "+       origen?.Movimientos}   <br/></h5></Typography>:""}
                                                {origen?.Mensual ?     <Typography><h5>{"Mensual: "+           origen?.Mensual}       <br/></h5></Typography>:""}
                                                {origen?.Anual ?       <Typography><h5>{"Anual: "+             origen?.Anual}         <br/></h5></Typography>:""}
                                                {origen?.Diario ?      <Typography><h5>{"Diario: "+            origen?.Diario}        <br/></h5></Typography>:""}
                                            </Box>
                                        </CardContent>
                                    </Card>

                                    

                                </Grid>
                                {String(solicitud?.deleted) === "1" ? "" :
                                    <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>

                                        <Card sx={{ minWidth: 275 }}>
                                            <CardContent>
                                                <Box>
                                                {solicitud?.Anio ?         <Typography><h5>{"Año: " +               solicitud?.Anio}                      <br/></h5></Typography>:""}
                                                {solicitud?.Personas ?     <Typography><h5>{"Personas: " +          solicitud?.Personas}             <br/></h5></Typography>:""}
                                                {solicitud?.CarenciaProm ? <Typography><h5>{"Carencia Promedio: " + solicitud?.CarenciaProm}<br/></h5></Typography>:""}
                                                {solicitud?.Nombre ?       <Typography><h5>{"Nombre: " +            solicitud?.Nombre}                 <br/></h5></Typography>:""}
                                                {solicitud?.Porcentaje ?   <Typography><h5>{"Porcentaje: " +        solicitud?.Porcentaje}         <br/></h5></Typography>:""}
                                                {solicitud?.ClaveBancaria ?<Typography><h5>{"Clave Bancaria: " +    solicitud?.ClaveBancaria}  <br/></h5></Typography>:""}
                                                {solicitud?.Cuenta ?       <Typography><h5>{"Cuenta: " +            solicitud?.Cuenta}                 <br/></h5></Typography>:""}
                                                {solicitud?.Importe ?      <Typography><h5>{"Importe: " +           solicitud?.Importe}               <br/></h5></Typography>:""}
                                                {solicitud?.Coeficiente ?  <Typography><h5>{"Coeficiente: " +       solicitud?.Coeficiente}       <br/></h5></Typography>:""}
                                                {solicitud?.Version ?      <Typography><h5>{"Version: " +           solicitud?.Version}               <br/></h5></Typography>:""}
                                                {solicitud?.totalPob ?     <Typography><h5>{"Poblacion Total: " +   solicitud?.totalPob}      <br/></h5></Typography>:""}
                                                {Number(solicitud?.Facturacion) >= 0 ?  <Typography><h5>{"Facturacion: " +       solicitud?.Facturacion}       <br/></h5></Typography>:""}
                                                {solicitud?.Total ?        <Typography><h5>{"Total: " + solicitud?.Total}                   <br/></h5></Typography>:""}
                                                {solicitud?.anio ?         <Typography><h5>{"Año: " + solicitud?.anio}                      <br/></h5></Typography>:""}
                                                {solicitud?.Pob ?          <Typography><h5>{"Poblacion Total: " + solicitud?.Pob}           <br/></h5></Typography>:""}
                                                {solicitud?.Recaudacion ?  <Typography><h5>{"Recaudacion: " + solicitud?.Recaudacion}       <br/></h5></Typography>:""}
                                                {solicitud?.Km2 ?          <Typography><h5>{"KM2: " + solicitud?.Km2}                       <br/></h5></Typography>:""}
                                                {solicitud?.Mes ?          <Typography><h5>{"Mes: " + solicitud?.Mes}                       <br/></h5></Typography>:""}
                                                {solicitud?.Movimientos ?  <Typography><h5>{"Movimientos: " + solicitud?.Movimientos}       <br/></h5></Typography>:""}
                                                {solicitud?.Mensual ?      <Typography><h5>{"Mensual: " + solicitud?.Mensual}               <br/></h5></Typography>:""}
                                                {solicitud?.Anual ?        <Typography><h5>{"Anual: " + solicitud?.Anual}                   <br/></h5></Typography>:""}
                                                {solicitud?.Diario ?       <Typography><h5>{"Diario: " + solicitud?.Diario}                 <br/></h5></Typography>:""}
                                                </Box>
                                            </CardContent>

                                        </Card>

                                    </Grid>
                                }

                            </Grid>
                            {modoVer === false ?
                                <>
                                    <Grid container spacing={1}
                                        sx={{
                                            mt: "2vh",
                                            width: "100%",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Grid item xs={12} sm={12} md={6} lg={4}>
                                            <TextField
                                                required
                                                spellCheck="true"
                                                rows={8}
                                                multiline
                                                onChange={(v) => setComentario(v.target.value)}
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    maxLength: 300,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br /><br />
                                    <Grid container spacing={3} sx={{ width: "100%", justifyContent: "center", alignItems: "center", direction: "row", }}>

                                        <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Box >
                                                <button className="guardar" onClick={() => acciones("autorizar")}>Autorizar Solicitud</button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Box>
                                                <button className="regresar" onClick={() => acciones("cancelar")}> Cancelar Solicitud</button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                                :

                                comentario ?
                                    <>

                                        <Grid container spacing={1}
                                            sx={{
                                                mt: "2vh",
                                                width: "100%",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "row",

                                            }}
                                        >
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <h3> Comentarios:</h3>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}
                                            sx={{
                                                mt: "2vh",
                                                width: "100%",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "row",

                                            }}
                                        >
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <Typography><h5>	{comentario}<br />	</h5></Typography>
                                            </Grid>
                                        </Grid>
                                    </>
                                    : ""



                            }
                        </Box>
                        {openValidacion ?
                            <>
                                <ComentarioModal accion={0} tipo={""} handleClose={handleClose} handleAccion={acciones} vrows={vrows} />
                            </>
                            : ""

                        }

                    </ModalForm>
                </>) : ""
            }
        </>


    );
};

export default CambiosMun;


