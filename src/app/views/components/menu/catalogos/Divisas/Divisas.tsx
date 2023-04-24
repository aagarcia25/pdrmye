import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Tooltip, Typography, } from '@mui/material'
import { GridColDef, GridSelectionModel, } from '@mui/x-data-grid'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { AlertS } from "../../../../../helpers/AlertS";
import Slider from "../../../Slider";
import MUIXDataGrid from '../../../MUIXDataGrid'
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import ButtonsAdd from '../Utilerias/ButtonsAdd'
import ModalForm from '../../../componentes/ModalForm'
import NombreCatalogo from '../../../componentes/NombreCatalogo'

export const Divisas = () => {


    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState(1);
    const [data, setData] = useState({});
    const [divisas, setDivisas] = useState([]);
    const [slideropen, setslideropen] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [editar, setEditar] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [nombreMenu, setNombreMenu] = useState("");
    const [nombreCorto, setNombreCorto] = useState<String>("");
    const [nombre, setNombre] = useState<String>("");
    const [valor, setValor] = useState<String>("");
    const [descripcion, setDescripcion] = useState<String>("");
    const [idDivisa, setIdDivisa] = useState<String>("");
    const [divisa, setDivisa] = useState<String>("");



    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);


    // VARIABLES PARA LOS FILTROS
    const [filterAnio, setFilterAnio] = useState("");
    //funciones


    const columns: GridColDef[] = [
        { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
        {
            field: "idmunicipio",
            headerName: "idmunicipio",
            hide: true,
            width: 150,
        },
        {
            field: "acciones", disableExport: true,
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100,
            renderCell: (v) => {
                return (
                    <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

                );
            },
        },
        { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación", width: 200 },
        { field: "Divisa", headerName: "Divisa", description: "Divisa", width: 150 },
        { field: "Nombre", headerName: "Nombre", description: "Nombre", width: 150 },
        { field: "Valor", headerName: "Valor", description: "Valor", width: 150 },
        { field: "Descripcion", headerName: "Descripción", description: "Descripción", width: 150 },



    ];

    const handleAccion = (v: any) => {
        if (v.tipo === 1) {
            setTipoOperacion(2);
            setOpen(true);
            setData(v.data);
            setDescripcion(v?.data?.row?.Descripcion);
            setNombre(v?.data?.row?.Nombre);
            setNombreCorto(v?.data?.row?.NombreCorto);
            setValor(v?.data?.row?.Valor);
            setIdDivisa(v?.data?.row?.id);
            setDivisa(v?.data?.row?.Divisa);

        } else if (v.tipo == 2) {
            handleDelete(v.data);
        }
    }


    const handleClose = () => {
        setOpen(false);
        let data = {
            NUMOPERACION: 4,
        };
        consulta(data);

    }
    const handleOpen = () => {
        setOpen(true);
        setTipoOperacion(1);
        setNombreCorto("");
        setNombre("");
        setValor("");
        setDescripcion("");
        setIdDivisa("");
        setDivisa("");
    };


    const handleNuevo = () => {

        if (!nombreCorto || !nombre || !valor || !descripcion) {
            AlertS.fire({
                title: "Atención",
                text: "Verifique los campos",
                icon: "warning",
            });


        } else {


            Swal.fire({
                icon: "info",
                title: tipoOperacion === 1 ? "Agregar Divisa o Tipo de Cambio?" : "Editar Divisa o Tipo de Cambio?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {

                    let data = {
                        NUMOPERACION: tipoOperacion === 1 ? 1 : 2,
                        CHUSER: user.id,
                        CHID: idDivisa,
                        NOMBRECORTO: nombreCorto,
                        NOMBRE: nombre,
                        VALOR: valor,
                        DESCRIPCION: descripcion,
                        DIVISA: divisa,
                    };

                    CatalogosServices.divisas(data).then((res) => {
                        if (res.SUCCESS) {
                            Toast.fire({
                                icon: "success",
                                title: tipoOperacion === 1 ? "Registro Agregado!" : "Registro Editado!",
                            });

                            handleClose();
                        } else {
                            AlertS.fire({
                                title: "¡Error!",
                                text: res.STRMESSAGE,
                                icon: "error",
                            });
                        }
                    });

                } else if (result.isDenied) {
                    Swal.fire("No se realizaron cambios", "", "info");
                }


            });
        }
    };

    const handleDelete = (v: any) => {
        Swal.fire({
            icon: "info",
            title: "¿Estás seguro de eliminar este registro??",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                //console.log(v);

                let data = {
                    NUMOPERACION: 3,
                    CHID: v.row.id,
                    CHUSER: user.id
                };
                //console.log(data);

                CatalogosServices.divisas(data).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Registro Eliminado!",
                        });

                        handleClose();
                    } else {
                        AlertS.fire({
                            title: "¡Error!",
                            text: res.STRMESSAGE,
                            icon: "error",
                        });
                    }
                });

            } else if (result.isDenied) {
                Swal.fire("No se realizaron cambios", "", "info");
            }


        });
    };

    const handleBorrar = (v: any) => {
        setSelectionModel(v);
    };

    const consulta = (data: any) => {
        CatalogosServices.divisas(data).then((res) => {
            setDivisas(res.RESPONSE);
            //console.log(res.RESPONSE);
        });
    };

    const handleFilterChange = (v: string) => {
        if (v === null) {
            let data = {
                NUMOPERACION: 4,

            };
            setFilterAnio("");
        } else {

            let data = {
                NUMOPERACION: 4,
                ANIO: v,
            };
            setFilterAnio(v);

            if (v != "") {
                consulta(data);
            }
        }
    };



    useEffect(() => {
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "DIVISAS") {
                //console.log(item)
                setNombreMenu(item.Menu);

                if (String(item.Referencia) === "ELIM") {
                    setEliminar(true);
                }
                if (String(item.Referencia) === "EDIT") {
                    setEditar(true);
                }
                if (String(item.Referencia) === "AGREG") {
                    setAgregar(true);
                }
            }
        });

        let data = {
            NUMOPERACION: 4,
            ANIO: "",
        };
        consulta(data);
    }, []);



    return (


        <div style={{ height: 600, width: "100%", padding: "1%" }}>
            <Slider open={slideropen}></Slider>

            <NombreCatalogo controlInterno={"DIVISAS"} />

            <Grid container sx={{ justifyContent: "center" }}  >
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    < MUIXDataGrid columns={columns} rows={divisas} />
                </Grid>
            </Grid>

            {open ?
                <ModalForm title={'Agregar Divisa o Tipo de Cambio'} handleClose={handleClose}>
                    <Grid container sx={{ justifyContent: "center" }} direction="row" columns={{ md: 12 }}>
                        <Box boxShadow={3} sx={{ width: "100%", padding: "2%" }}>

                            <Grid item md={12} direction="row" sx={{ textAlign: "center" }}>

                                <Box display="flex" justifyContent="center" m={0} p={0} sx={{ width: "100%", paddingBottom: "2%" }} >
                                    <Box sx={{ width: "40%" }} >
                                        <TextField
                                            required
                                            margin="dense"
                                            id="Nombre"
                                            label="Nombre Corto"
                                            value={nombreCorto}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={(v) => setNombreCorto(v.target.value)}
                                            error={!nombreCorto ? true : false}
                                            InputLabelProps={{ shrink: true }}
                                        />

                                        <TextField
                                            required
                                            margin="dense"
                                            id="Nombre"
                                            label="Nombre"
                                            value={nombre}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={(v) => setNombre(v.target.value)}
                                            error={!nombre ? true : false}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <TextField
                                            required
                                            margin="dense"
                                            id="Nombre"
                                            label="Valor"
                                            value={valor}
                                            type="number"
                                            fullWidth
                                            variant="standard"
                                            onChange={(v) => setValor(v.target.value)}
                                            error={!valor ? true : false}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <TextField
                                            required
                                            margin="dense"
                                            id="Divisa"
                                            label="Divisa"
                                            value={divisa}
                                            type="number"
                                            fullWidth
                                            variant="standard"
                                            onChange={(v) => setDivisa(v.target.value)}
                                            error={!divisa ? true : false}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <TextField
                                            required
                                            margin="dense"
                                            id="Nombre"
                                            label="Descripcion"
                                            value={descripcion}
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={(v) => setDescripcion(v.target.value)}
                                            error={!descripcion ? true : false}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item md={12} sx={{ textAlign: "center" }}>
                                <Tooltip title="Agregar">
                                    <Button className={tipoOperacion === 1 ? "guardar" : "actualizar"} value="check" onClick={() => handleNuevo()}>
                                        {tipoOperacion === 1 ? "Guardar" : "Actualizar"}
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Box>
                    </Grid>
                </ModalForm> : ""}

        </div>
    )
}
