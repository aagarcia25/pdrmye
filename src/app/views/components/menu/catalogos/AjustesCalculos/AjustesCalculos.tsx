import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
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

const AjustesCalculos = () => {
    //   VALORES POR DEFAULT
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [dataTipoFondo, setDataTipoFondo] = useState([]);
    const [slideropen, setslideropen] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [nombreMenu, setNombreMenu] = useState("");
    const [vrows, setVrows] = useState({});
    const [ajusteCalculo, setAjusteCalculo] = useState("");
    const [keys, setKeys] = useState("");


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
                                    onClick={() => handleAccion({ tipo: 2, data: v })}
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
                                    onClick={() => handleAccion({ tipo: 3, data: v })}
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

    const handlesave = (v: any) => {

        let data = {
            NUMOPERACION: tipoOperacion,
            DESCRIPCION: ajusteCalculo,
            CHUSER: user.id,
            CHID: v.id,
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

    };

    const handleAccion = (v: any) => {
        if (v.tipo === 2) {
            setTipoOperacion(2);
            setVrows(v.data);
            setAjusteCalculo(v?.data?.row?.Descripcion);
            setKeys(v?.data?.row?.keys);
            setOpen(true);
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
                        CHUSER: user.id,
                        CHID: v?.data?.row?.id,
                        NUMOPERACION: v.tipo,
                        DESCRIPCION: ajusteCalculo,
                        KEYS: keys,
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

    const handleClose = () => {
        consulta();
        setVrows({});
        setOpen(false);
    };

    const handleOpen = () => {
        setTipoOperacion(1);
        setOpen(true);
        setAjusteCalculo("");
        setVrows({});
    };

    const consulta = () => {
        let data = {
            NUMOPERACION: 4,
        };

        CatalogosServices.AjustesIndex(data).then((res) => {
            if (res.SUCCESS) {

                setDataTipoFondo(res.RESPONSE);
                handleClose();
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
            <Slider open={slideropen}></Slider>
            <Title titulo={nombreMenu} tooltip={"Cátalogo para Agregar Ajustes a los Cálculos"}></Title>
            <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
            <MUIXDataGrid columns={columns} rows={dataTipoFondo} />

            {open ? (
                <ModalForm
                    title={
                        tipoOperacion === 1 ? "Agregar Registro" : "Modificar Registro"
                    }
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
                                label="Descripción"
                                value={ajusteCalculo}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setAjusteCalculo(v.target.value)}
                                error={ajusteCalculo === "" ? true : false}
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
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(v) => setKeys(v.target.value)}
                                error={keys === "" ? true : false}
                            />
                        </Grid>

                        <SaveButton
                            vrow={vrows}
                            handleAccion={() => handlesave}
                            tipoOperacion={tipoOperacion}
                        ></SaveButton>
                    </Grid>
                </ModalForm>
            ) : (
                ""
            )}
        </div>
    );
};

export default AjustesCalculos;
