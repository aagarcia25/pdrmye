import { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import {
    Box,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import ModalForm from "../../../componentes/ModalForm";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveButton from "../../../componentes/SaveButton";
import Title from "../../../componentes/Title";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import React from "react";
import ButtonsMunBase from "../Utilerias/ButtonsMunBase";

const AjustesCalculos = () => {
    //   VALORES POR DEFAULT
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState<number>(0);
    const [dataAjustes, setDataAjustes] = useState([]);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [nombreMenu, setNombreMenu] = useState("");
    const [vrows, setVrows] = useState({});
    const [ajuste, setAjuste] = useState("");
    const [keys, setKeys] = useState("");
    const [idAjuste, setIdAjuste] = useState("");
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);



    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "acciones",
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 200,
            renderCell: (v) => {
                return (
                    <Box>
                        {/* EDITAR */}
                        {editar ? (
                            <Tooltip title={"Editar Registro"}>
                                <IconButton
                                    color="info"
                                    onClick={() => handleAccion({ tipo: 2, data: v.row })}
                                >
                                    <ModeEditOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                        {/* ELIMINAR */}
                        {eliminar ? (
                            <Tooltip title={"Eliminar Registro"}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleAccion({ tipo: 3, data: v.row })}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                    </Box>
                );
            },
        },
        { field: "FechaCreacion", headerName: "Fecha de Creación", width: 200 },
        { field: "CreadoPor", headerName: "Creado Por", width: 400 },
        { field: "Descripcion", headerName: "Descripcion", width: 350 },
        { field: "keys", headerName: "Keys", width: 100 },
    ];

    const handlesave = () => {

        if (tipoOperacion === 1) {

            if (ajuste === "" || keys === "") {
                AlertS.fire({
                    title: "Revise los Campos!",
                    icon: "error",
                });
            } else {
                let data = {
                    NUMOPERACION: tipoOperacion,
                    DESCRIPCION: ajuste,
                    CHUSER: user.id,
                    CHID: idAjuste,
                    KEYS: keys,
                };
                CatalogosServices.AjustesIndex(data).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Registro Agregado!",
                        });
                        consulta();
                    } else {
                        AlertS.fire({
                            title: "Error!",
                            text: res.STRMESSAGE,
                            icon: "error",
                        });
                    }
                });
            }
        }
        if (tipoOperacion === 2) {
            handleEditar();
        }
    };


    const handleAccion = (v: any) => {
        if (v.tipo === 2) {
            setTipoOperacion(2);
            setVrows(v.data);
            setAjuste(v?.data?.Descripcion);
            setKeys(v?.data?.keys);
            setIdAjuste(v?.data?.id);
            setOpen(true);

        } else if (v.tipo === 3) {
            Swal.fire({
                icon: "info",
                title: "Estas seguro de eliminar este registro?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    let data = {
                        NUMOPERACION: 3,
                        CHID: v.data.id,
                        CHUSER: user.id,
                    };

                    CatalogosServices.AjustesIndex(data).then((res) => {
                        if (res.SUCCESS) {
                            Toast.fire({
                                icon: "success",
                                title: "Registro Eliminado!",
                            });
                            consulta();
                        } else {
                            AlertS.fire({
                                title: "Error!",
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
    const handleBorrar = (v: any) => {
        setSelectionModel(v);
    };



    const handleClose = () => {
        consulta();
        setVrows([]);
        setAjuste("");
        setKeys("");
        setOpen(false);
    };
    const handleEditar = () => {

        if (ajuste === "" || keys === "") {
            AlertS.fire({
                title: "Revise los Campos!",
                icon: "error",
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Estas seguro de Editar este Registro?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Confirmar",
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    let data = {
                        CHUSER: user.id,
                        CHID: idAjuste,
                        NUMOPERACION: tipoOperacion,
                        DESCRIPCION: ajuste,
                        KEYS: keys,
                    };

                    CatalogosServices.AjustesIndex(data).then((res) => {
                        if (res.SUCCESS) {
                            Toast.fire({
                                icon: "success",
                                title: "Registro Editado!",
                            });
                            consulta();
                        } else {
                            AlertS.fire({
                                title: "Error!",
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
    const handleOpen = (accion: any) => {

        if (accion === 1) {
            setTipoOperacion(1);
            setAjuste("");
            setVrows([]);
            setKeys("");
            setOpen(true);
        }
        if (accion === 2) {
            if (selectionModel.length !== 0) {
                Swal.fire({
                    icon: "question",
                    title: selectionModel.length + " Registros Se Eliminaran!!",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Confirmar",
                    denyButtonText: `Cancelar`,
                }).then((result) => {
                    if (result.isConfirmed) {

                        let data = {
                            NUMOPERACION: 6,
                            OBJS: selectionModel,
                            CHUSER: user.id
                        };
                        //console.log(data);

                        CatalogosServices.AjustesIndex(data).then((res) => {
                            if (res.SUCCESS) {
                                Toast.fire({
                                    icon: "success",
                                    title: "Borrado!",
                                });

                                consulta();

                            } else {
                                AlertS.fire({
                                    title: "Error!",
                                    text: res.STRMESSAGE,
                                    icon: "error",
                                });
                            }
                        });

                    } else if (result.isDenied) {
                        Swal.fire("No se realizaron cambios", "", "info");
                    }
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Seleccione Registros Para Borrar",
                    confirmButtonText: "Aceptar",
                });
            }

        }

    };

    const consulta = () => {
        let data = {
            NUMOPERACION: 4,
        };
        CatalogosServices.AjustesIndex(data).then((res) => {
            if (res.SUCCESS) {
                setDataAjustes(res.RESPONSE);
                setOpen(false);
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };


    useEffect(() => {
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "AJUSTECALC") {
                setNombreMenu(item.Menu);
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
        consulta();
    }, []);

    return (
        <div style={{ height: 600, width: "100%" }}>
            <Title titulo={nombreMenu} tooltip={"Cátalogo para Agregar Ajustes a los Cálculos"}></Title>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
                <ButtonsMunBase
                    handleOpen={handleOpen}
                    agregar={agregar} eliminar={eliminar} />

            </Grid>
            <MUIXDataGridMun columns={columns} rows={dataAjustes} modulo={nombreMenu} handleBorrar={handleBorrar} borrar={eliminar} />

            {open ?
                <ModalForm
                    title={tipoOperacion === 1 ? "Agregar Registro" : "Modificar Registro"}
                    handleClose={handleClose}
                >
                    <Grid
                        container
                        sx={{
                            mt: "2vh",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Typography>
                                Descripción de Ajustes de Cálculo:
                            </Typography>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                                required
                                margin="dense"
                                label="Ajuste"
                                value={ajuste}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setAjuste(v.target.value)}
                                error={ajuste === "" ? true : false}
                            />
                        </Grid>

                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Typography>
                                Valor de  Keys Para Ajustes de Cálculo:
                            </Typography>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                                required
                                margin="dense"
                                label="Keys"
                                value={keys}
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setKeys(v.target.value)}
                                error={keys === "" ? true : false}
                            />
                        </Grid>

                        <SaveButton
                            vrow={vrows}
                            handleAccion={handlesave}
                            tipoOperacion={tipoOperacion}
                        ></SaveButton>
                    </Grid>
                </ModalForm>
                :
                ""
            }
        </div>
    );
};

export default AjustesCalculos;
