import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { MunicipioCambios, USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ComentarioModal from "../../../componentes/ComentarioModal";
import { TooltipPersonalizado } from "../../../componentes/CustomizedTooltips";
import ModalForm from "../../../componentes/ModalForm";
import NombreCatalogo from "../../../componentes/NombreCatalogo";


const CambiosMun = () => {
    // CAMPOS DE LOS FORMULARIOS
    const [bitacoraAjustes, setBitacoraAjustes] = useState([]);
    const user: USUARIORESPONSE= JSON.parse(String(getUser()));
    const [openModal, setOpenModal] = useState<boolean>(false);
    // const [tablas, setTablas] =useState<SelectValues[]>([]);


    const [openValidacion, setOpenValidacion] = useState<boolean>(false);
    const [vrows, setVrows] = useState({});
    const [solicitud, setSolicitud] = useState<MunicipioCambios>();
    const [origen, setOrigen] = useState<MunicipioCambios>();
    const [labelCatalogo, setLabelCatalogo] = useState<string>();
    const [solicitante, setSolicitante] = useState<string>();
    const [comentario, setComentario] = useState<string>("");
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
            hideable: false
        },
        {
            field: "IdRegistro",
            hide: true,
            hideable: false
        },
        {
            field: "Tipo",
            hide: true, hideable: false
        },
        {
            field: "Solicitud",
            hide: true, hideable: false
        },
        {
            field: "acciones", disableExport: true,
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100,
            renderCell: (v) => {
                return (
                    <>
                      
                        <>
                            <Tooltip title="Ver Solicitud">
                                <IconButton color="inherit" onClick={() => handlever(v)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                          {
                            (
                                (v.row.Aplicado === 0 && v.row.deleted === "0") ? (
                                    <>
                                        <Tooltip title="Atender Solicitud">
                                            <IconButton color="inherit" onClick={() => handlevalidar(v)}>
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
            headerName: "Fecha Creación",
            description: "Fecha Creación",
            width: 180,
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
                            ((v.row.Aplicado === 0 && v.row.deleted === "0") ? (
                                <> <label> Espera de Autorizacion</label>  </>) : "")
                        }
                        {
                            ((v.row.Aplicado === 0 && v.row.deleted === "1") ? (
                                <> <label> Rechazado</label> </>) : "")
                        }
                        {
                            ((v.row.Aplicado === 1 && v.row.deleted === "0") ? (
                                <> <label> Autorizado</label></>) : "")
                        }
                    </>
                );
            },
        },
        {
            field: "Comentario",
            headerName: "Comentario",
            description: "Comentario",
            width: 400,
            renderCell: (v) => {
                return (
                    <>
                        {
                            ((v.row.Comentario === null) ? (
                                <> <label> Sin Comentarios</label>  </>) : <label> {v.row.Comentario}</label>)
                        }
                    </>
                );
            },
        },
        {
            field: "nombreMunicipio",
            hide: true, hideable: false
        }



    ];

    const tablas = [
        { value: 'MunPobrezaExt', label: 'Municipio Pobreza Extrema' },
        { value: 'MunFacturacion', label: 'Municipio Facturación', },
        { value: 'MunPobreza', label: 'Municipio Pobreza ', },
        { value: 'MunProyec', label: 'Municipio Proyección', },
        { value: 'MunRecaudacion', label: 'Municipio Recaudación', },
        { value: 'MunRefrendos', label: 'Municipio Refrendos', },
        { value: 'MunTerritorio', label: 'Municipio Territorio', },
        { value: 'UMAS', label: 'UMAS', },
        { value: 'MunPoblacion', label: 'Municipio Población', },

    ]


    const handlevalidar = (v: any) => {
        setOpenModal(true);
        setModoVer(false);
        setVrows(v.row);
        // setComentario(v?.row?.Comentario);
        setSolicitud(JSON.parse(String(v.row.Solicitud)));
        setSolicitante(v?.row?.Solicitante)
        setIdSolicitante(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setOrigen(JSON.parse(String(v.row.Origen)));
        setLabelCatalogo(String(tablas.find(({ value }) => value === v.row.Tipo)?.label));
        setIdCambio(v.row.id);
        setMunicipio(v?.row?.nombreMunicipio);

    };

    const handlever = (v: any) => {

        setOpenModal(true);
        setModoVer(true);
        setVrows(v.row);
        setComentario(v?.row?.Comentario);
        setSolicitud(JSON.parse(String(v.row.Solicitud)));
        setSolicitante(v?.row?.Solicitante)
        setIdSolicitante(JSON.parse(String(v.row.Solicitud)).ModificadoPor);
        setOrigen(JSON.parse(String(v.row.Origen)));
        setLabelCatalogo(String(tablas.find(({ value }) => value === v.row.Tipo)?.label));
        setIdCambio(v.row.id);
        setMunicipio(v?.row?.nombreMunicipio);

    };

    const handleComentario = () => {
        setOpenValidacion(true);


    };
    const acciones = (v: any) => {

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
                        CHUSER: user.Id,
                        COMENTARIO: comentario
                    }).then((res) => {
                        if (res.SUCCESS) {
                            AlertS.fire({
                                title: v === "autorizar" ? "¡Cambio Autorizado!" : "¡Cambio Rechazado!",
                                icon: "info",
                
                            });
                            handleClose();
                        }
                        else {
                            handleClose();

                            //     AlertS.fire({
                            //         title: "¡¡Error!",
                            //         text: "Fallo en la peticion",
                            //         icon: "error",

                            //     });
                        }
                    });
                }
                if (result.isDenied) {
                }
            });

        } else {

            AlertS.fire({
                title: "¡Error!",
                text: "Campo Comentario Vacio",
                icon: "error",

            });
        }


    };


    const consulta = () => {
        CatalogosServices.BitacoraAjustes({ NUMOPERACION: 4 }).then((res) => {
            if (res.SUCCESS) {
             
                setBitacoraAjustes(res.RESPONSE);
            } else {
                AlertS.fire({
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });




    };

    const handleClose = () => {
        setOpenModal(false);
        setComentario("");
        setOpenValidacion(false);
        consulta();
    };



    useEffect(() => {
        consulta();
    }, []);

    return (
        <>

            <NombreCatalogo controlInterno={"SOLCAMBIOS"} />

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
                    <ModalForm
                        title={String(solicitud?.deleted) === "1" ? "Solicitud de Borrado de Campo" : "Solicitud de Cambio de Valores"}
                        handleClose={handleClose}>

                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <Grid container direction="column" justifyContent="center" alignItems="center" >
                                <Typography className="h5-sol-cambios" variant="h5">
                                    {String("Catálogo  a Modificar: " + labelCatalogo)}
                                </Typography>

                                <Typography className="h5-sol-cambios" variant="h5">
                                    {String("Solicitante: " + solicitante)}
                                </Typography>

                                <Typography className="h5-sol-cambios" variant="h5">
                                    {municipio != null ? String("Municipio: " + municipio) : ""}
                                </Typography>


                            </Grid>

                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}  >

                                <Grid item xs={12} sm={6} md={4} sx={{ alignItems: "center", justifyContent: "center", }}>
                                    <Grid container item sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                        <Typography className="Titulo-SolCambios" variant="h5">
                                            Valores Originales
                                        </Typography>

                                    </Grid>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Box>


                                                {origen?.Anio ? <Typography variant="h6">{"Año: " + origen?.Anio}       <br />                  </Typography> : ""}
                                                {origen?.Personas ? <Typography variant="h6">{"Personas: " + origen?.Personas}      <br />         </Typography> : ""}
                                                {origen?.CarenciaProm ? <Typography variant="h6">{"Carencia Promedio: " + origen?.CarenciaProm}  <br /></Typography> : ""}
                                                {origen?.Nombre ? <Typography variant="h6">{"Nombre: " + origen?.Nombre}        <br />           </Typography> : ""}
                                                {origen?.Porcentaje ? <Typography variant="h6">{"Porcentaje " + origen?.Porcentaje}    <br />        </Typography> : ""}
                                                {origen?.ClaveBancaria ? <Typography variant="h6">{"Clave Bancaria: " + origen?.ClaveBancaria} <br />   </Typography> : ""}
                                                {origen?.Cuenta ? <Typography variant="h6">{"Cuenta: " + origen?.Cuenta}        <br />           </Typography> : ""}
                                                {origen?.Importe ? <Typography variant="h6">{"Importe: " + origen?.Importe}       <br />          </Typography> : ""}
                                                {origen?.Coeficiente ? <Typography variant="h6">{"Coeficiente: " + origen?.Coeficiente}   <br />      </Typography> : ""}
                                                {origen?.Version ? <Typography variant="h6">{"Version: " + origen?.Version}       <br />          </Typography> : ""}
                                                {origen?.totalPob ? <Typography variant="h6">{"Población Total: " + origen?.totalPob}      <br />  </Typography> : ""}
                                                {Number(origen?.Facturacion) >= 0 ? <Typography variant="h6">{"Facturación: " + origen?.Facturacion}   <br />      </Typography> : ""}
                                                {origen?.Total ? <Typography variant="h6">{"Total: " + origen?.Total}         <br />            </Typography> : ""}
                                                {origen?.anio ? <Typography variant="h6">{"Año: " + origen?.anio}          <br />              </Typography> : ""}
                                                {origen?.Pob ? <Typography variant="h6">{"Población Total: " + origen?.Pob}           <br />  </Typography> : ""}
                                                {origen?.Recaudacion ? <Typography variant="h6">{"Recaudación: " + origen?.Recaudacion}   <br />      </Typography> : ""}
                                                {origen?.Km2 ? <Typography variant="h6">{"KM2: " + origen?.Km2}           <br />              </Typography> : ""}
                                                {origen?.Mes ? <Typography variant="h6">{"Mes: " + origen?.Mes}           <br />              </Typography> : ""}
                                                {origen?.Movimientos ? <Typography variant="h6">{"Movimientos: " + origen?.Movimientos}   <br />      </Typography> : ""}
                                                {origen?.Mensual ? <Typography variant="h6">{"Mensual: " + origen?.Mensual}       <br />          </Typography> : ""}
                                                {origen?.Anual ? <Typography variant="h6">{"Anual: " + origen?.Anual}         <br />            </Typography> : ""}
                                                {origen?.Diario ? <Typography variant="h6">{"Diario: " + origen?.Diario}        <br />           </Typography> : ""}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {String(solicitud?.deleted) === "1" ? "" :
                                    <>

                                        <Grid item xs={12} sm={6} md={4} sx={{ alignItems: "center", justifyContent: "center", }}>
                                            <Grid container item sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                                <Typography className="Titulo-SolCambios" variant="h5">
                                                    Cambios Solicitados
                                                </Typography>

                                            </Grid>
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Box>
                                                        {solicitud?.Anio ? <Typography variant="h6">{"Año: " + solicitud?.Anio}                      <br /></Typography> : ""}
                                                        {solicitud?.Personas ? <Typography variant="h6">{"Personas: " + solicitud?.Personas}             <br /></Typography> : ""}
                                                        {solicitud?.CarenciaProm ? <Typography variant="h6">{"Carencia Promedio: " + solicitud?.CarenciaProm}<br /></Typography> : ""}
                                                        {solicitud?.Nombre ? <Typography variant="h6">{"Nombre: " + solicitud?.Nombre}                 <br /></Typography> : ""}
                                                        {solicitud?.Porcentaje ? <Typography variant="h6">{"Porcentaje: " + solicitud?.Porcentaje}         <br /></Typography> : ""}
                                                        {solicitud?.ClaveBancaria ? <Typography variant="h6">{"Clave Bancaria: " + solicitud?.ClaveBancaria}  <br /></Typography> : ""}
                                                        {solicitud?.Cuenta ? <Typography variant="h6">{"Cuenta: " + solicitud?.Cuenta}                 <br /></Typography> : ""}
                                                        {solicitud?.Importe ? <Typography variant="h6">{"Importe: " + solicitud?.Importe}               <br /></Typography> : ""}
                                                        {solicitud?.Coeficiente ? <Typography variant="h6">{"Coeficiente: " + solicitud?.Coeficiente}       <br /></Typography> : ""}
                                                        {solicitud?.Version ? <Typography variant="h6">{"Version: " + solicitud?.Version}               <br /></Typography> : ""}
                                                        {solicitud?.totalPob ? <Typography variant="h6">{"Poblacion Total: " + solicitud?.totalPob}      <br /></Typography> : ""}
                                                        {Number(solicitud?.Facturacion) >= 0 ? <Typography variant="h6">{"Facturacion: " + solicitud?.Facturacion}       <br /></Typography> : ""}
                                                        {solicitud?.Total ? <Typography variant="h6">{"Total: " + solicitud?.Total}                   <br /></Typography> : ""}
                                                        {solicitud?.anio ? <Typography variant="h6">{"Año: " + solicitud?.anio}                      <br /></Typography> : ""}
                                                        {solicitud?.Pob ? <Typography variant="h6">{"Poblacion Total: " + solicitud?.Pob}           <br /></Typography> : ""}
                                                        {solicitud?.Recaudacion ? <Typography variant="h6">{"Recaudacion: " + solicitud?.Recaudacion}       <br /></Typography> : ""}
                                                        {solicitud?.Km2 ? <Typography variant="h6">{"KM2: " + solicitud?.Km2}                       <br /></Typography> : ""}
                                                        {solicitud?.Mes ? <Typography variant="h6">{"Mes: " + solicitud?.Mes}                       <br /></Typography> : ""}
                                                        {solicitud?.Movimientos ? <Typography variant="h6">{"Movimientos: " + solicitud?.Movimientos}       <br /></Typography> : ""}
                                                        {solicitud?.Mensual ? <Typography variant="h6">{"Mensual: " + solicitud?.Mensual}               <br /></Typography> : ""}
                                                        {solicitud?.Anual ? <Typography variant="h6">{"Anual: " + solicitud?.Anual}                   <br /></Typography> : ""}
                                                        {solicitud?.Diario ? <Typography variant="h6">{"Diario: " + solicitud?.Diario}                 <br /></Typography> : ""}
                                                    </Box>
                                                </CardContent>

                                            </Card>

                                        </Grid>
                                    </>
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
                                        <Grid item xs={12} sm={12} md={6} lg={4.5} xl={4}>

                                            <TooltipPersonalizado

                                                title={
                                                    <>
                                                        {!comentario ?
                                                            <React.Fragment>
                                                                <Typography color={comentario ? "inherit" : "error"}>
                                                                    {comentario === "" || comentario === null || comentario?.trim() === "" ? "Campo obligatorio" : ""}  </Typography>
                                                            </React.Fragment> : ""}
                                                    </>
                                                }>

                                                <TextField
                                                    error={!comentario}
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
                                            </TooltipPersonalizado>
                                        </Grid>
                                    </Grid>
                                    <br /><br />
                                    <Grid container spacing={3} sx={{ width: "100%", justifyContent: "center", alignItems: "center", direction: "row", }}>

                                        <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Box >
                                                <Button disabled={String(comentario).length === 0 || comentario === "" || comentario === null || comentario?.trim() === ""} className={"agregar"} onClick={() => acciones("autorizar")}>Autorizar Solicitud</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                            <Box>
                                                <Button disabled={!comentario || comentario === null || comentario?.trim() === ""} className={"cancelar"} onClick={() => acciones("cancelar")}> Cancelar Solicitud</Button>
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
                                            <Grid className="containerShadow" item xs={6} sm={6} md={4} lg={3}>
                                                <Typography variant="h6">	{comentario}<br />	</Typography>
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


