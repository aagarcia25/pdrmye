import { useEffect, useState } from "react";
import { Box, Dialog, DialogActions, Grid, InputAdornment, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PERMISO, RESPONSE } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";
import Slider from "../../../../Slider";
import { Titulo } from "../../Utilerias/AgregarCalculoUtil/Titulo";
import Swal from "sweetalert2";
import { Toast } from "../../../../../../helpers/Toast";
import { AlertS } from "../../../../../../helpers/AlertS";
import BotonesAPD from "../../../../componentes/BotonesAPD";
import BotonesAcciones from "../../../../componentes/BotonesAcciones";
import ModalForm from "../../../../componentes/ModalForm";
import validator from "validator";

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
    const [eliminar, setEliminar] = useState<boolean>(true);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(true);
    const [detalle, setDetalle] = useState([]);
    const [mun, setMun] = useState<string>();
    const [total, setTotal] = useState<string>();
    const [mes, setMes] = useState<string>();
    const [idRegistro, setIdRegistro] = useState<string>();
    const [openSlider, setOpenSlider] = useState(true);
    const [openEditar, setOpenEditar] = useState(false);
    const [dataEditar, setDataEditar] = useState({});
    const [claveError, setClaveError] = useState<string>();
    const [claveValid, setClaveValid] = useState<boolean>();
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
            field: "acciones",  disableExport: true,
            headerName: "Acciones",
            description: "Ver Detalle de Cálculo",
            sortable: false,
            width: 150,
            renderCell: (v) => {
                return (

                    <Box>

                        {user.DEPARTAMENTOS[0].NombreCorto == "DAMOP"&& user.PERFILES[0].Referencia=="ANA"?
                        <Grid container >
                            <Grid item xs={12}>
                                <BotonesAcciones handleAccion={handleAccionRegistros} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
                            </Grid>
                        </Grid>
                         :""}
                    </Box>
                );
            },
        },
    ];
    const handleAccionRegistros = (v: any) => {
        setIdRegistro(v.data.row.id)

        if (v.tipo === 1) {
            ///editar
            setOpenEditar(true)
            //console.log(v.data.row)
            setDataEditar(v.data.row)
            setMes(v.data.row.Descripcion)
            setTotal(v.data.row.Total)
            setMun(v.data.row.Nombre)
            setIdRegistro(v.data.row.id)


        } else
            if (v.tipo === 2) {

                //console.log("Eliminar resgitro detallado")
                EliminarRegistro(
                    {
                        NUMOPERACION: 3,
                        CHUSER: user.id,
                        CHID: v.data.row.id,

                    }
                );
            }
    };


    const handleAccionEditarRegistros = () => {
        //console.log(total);
        //console.log(idRegistro);
        //console.log(user.id)

        Swal.fire({
            icon: "info",
            title: "Editar Total De El Municipio Seleccionado?",
            text: "Nuevo Valor: " + total,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                CatalogosServices.getdetalle({ CHID: idRegistro, NUMOPERACION: 2, TOTAL: total, CHUSER: user.id }).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Editado Exitoso!",
                        });

                    } else {
                        AlertS.fire({
                            title: "¡Error!",
                            text: "Validar informacion",
                            icon: "error",
                        });
                    }
                    handleClosedetalle();
                });
            }
        });




    };

    const handleClosedetalle = () => {
        setOpenEditar(false);
        getDetalles({ IDPRINCIPAL: idPrincipal, NUMOPERACION: "1" })
    };
    const handleNuevoTotal = (v: string) => {
        ///// clave
        setTotal(v)
        if (validator.isNumeric(v)) {
            setClaveError('')
            setClaveValid(true);
        } else {
            setClaveError('Ingrese Valores Numericos')
            setClaveValid(false);
        }

    };
    const handleAccion = (v: number) => {
        if (v === 1) {
            handleClose()
        } else
            if (v === 2) {

                Eliminar();
            }
    };
    const getDetalles = (d: any) => {
        CatalogosServices.getdetalle(d).then((res) => {
            setDetalle(res.RESPONSE);
            //console.log(res.RESPONSE)
            setOpenSlider(false);
        });
    };
    const Eliminar = () => {
        //console.log(data)
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
                        // CatalogosServices.indexAPC(data).then((res) => {
                        //     //console.log(res.RESPONSE)

                        // });
                        handleClose();
                    } else {
                        AlertS.fire({
                            title: "¡Error!",
                            text: "Validar informacion",
                            icon: "error",
                        });
                    }
                });
            }
        });

    };
    const EliminarRegistro = (dat: any) => {
        Swal.fire({
            icon: "error",
            title: "Borrar Registro ",
            text: "¿Desea Autoriza?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                CatalogosServices.getdetalle(dat).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Borrado Exitoso!",
                        });
                        // CatalogosServices.indexAPC(data).then((res) => {
                        //     //console.log(res.RESPONSE)

                        // });
                    } else {
                        AlertS.fire({
                            title: "¡Error!",
                            text: "Validar informacion",
                            icon: "error",
                        });
                    }
                    getDetalles({ IDPRINCIPAL: idPrincipal, NUMOPERACION: "1" })
                });
            }
        });

    };

    useEffect(() => {
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "MUNAPC") {
                if (String(item.Referencia) === "AGREG") {
                    setAgregar(true);
                }
                if (String(item.Referencia) === "ELIM") {
                    setEliminar(true);
                }
                if (String(item.Referencia) === "EDIT") {
                    setEditar(true);
                }

            }
        });


        if (data.Activo == 1) {
            setEliminar(true);
        }
        getDetalles({ IDPRINCIPAL: idPrincipal, NUMOPERACION: "1" })
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
                                <BotonesAPD handleAccion={handleAccion} eliminar={eliminar} />

                            </Grid>



                        </Grid>
                        <MUIXDataGrid columns={columns} rows={detalle} />
                    </Grid>


                </Dialog>

            </Box>
            {openEditar ?
                <ModalForm title={"Editar Los Registros Detallado"} handleClose={handleClosedetalle}>

                    <div>
                        <Grid container spacing={2} sx={{ justifyContent: "center", }} >
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                    <Titulo name={"Municipio: " + mun} />

                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                    <Titulo name={"Mes: " + mes} />

                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                    <Titulo name={"Total"} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                    <TextField
                                        sx={{ m: 1, width: '25ch' }}
                                        value={total}
                                        type="text"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        onChange={(v) => handleNuevoTotal(v.target.value)}
                                        error={!claveValid}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>

                                    <label>{claveError}</label>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                {claveValid ?
                                    <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
                                        <DialogActions>
                                            <button className="guardar"
                                                onClick={() => { handleAccionEditarRegistros() }}
                                            >
                                                Guardar
                                            </button>

                                        </DialogActions>
                                    </Box>
                                    : ""}
                            </Grid>


                        </Grid>
                    </div>
                </ModalForm>
                : ""}
        </div>

    );
};
